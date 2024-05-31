const express = require('express');
const puppeteer = require('puppeteer');
const db = require('./db');
const app = express();

app.use(express.json());

app.post('/api/second', async (req, res) => {
    const { taskId, page = 1, pageSize = 10 } = req.body;

    if (!taskId) {
        return res.json({ status: false, message: 'taskId is required' });
    }

    try {
        const [urls] = await db.execute('SELECT * FROM tasks WHERE task_id = ? LIMIT ? OFFSET ?', [taskId, pageSize, (page - 1) * pageSize]);

        const browser = await puppeteer.launch();
        const detailedData = [];

        for (const urlObj of urls) {
            const { url } = urlObj;
            const [existingData] = await db.execute('SELECT * FROM url_data WHERE task_id = ? AND url = ?', [taskId, url]);

            if (existingData.length === 0) {
                const page = await browser.newPage();
                await page.goto(url);

                const title = await page.title();
                const description = await page.$eval('meta[name="description"]', el => el.content);
                const text = await page.evaluate(() => document.body.innerText);
                const html = await page.content();
                const subUrls = await page.evaluate(() => Array.from(document.querySelectorAll('a')).map(a => a.href));

                await db.execute('INSERT INTO url_data (task_id, url, title, description, text, html, sub_urls) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [taskId, url, title, description, text, html, JSON.stringify(subUrls)]);

                detailedData.push({ taskId, url, title, description, text, html, subUrls, date: new Date() });
            } else {
                detailedData.push(existingData[0]);
            }
        }

        await browser.close();

        const [totalCountResult] = await db.execute('SELECT COUNT(*) as count FROM tasks WHERE task_id = ?', [taskId]);
        const totalCount = totalCountResult[0].count;

        res.json({
            status: true,
            data: {
                list: detailedData,
                totalCount,
                pageSize
            }
        });
    } catch (error) {
        console.error(error);
        res.json({ status: false, message: 'An error occurred.' });
    }
});

app.listen(3001, () => {
    console.log('Server started on port 3001');
});
