const puppeteer = require("puppeteer");
const ScrapeFactory = require('./scrape.factory');

class CrawlLibrary {

    async getBrowser(){
        return await puppeteer.launch({
            executablePath: "/usr/bin/chromium-browser",
            headless: false,
            defaultViewport: {
                width: 1280,
                height: 1080,
            }
        });
    }

    async crawl(searchUrl, keyword) {
        const browser = await this.getBrowser();
        let page = await browser.newPage();
        try {
            if(await this.search(page, searchUrl, keyword)) {

                await page.waitForTimeout(5000);

                const pages = await browser.pages();
                if (pages.length > 1) {
                    page  = pages[pages.length - 1];
                    await page.bringToFront();
                }

                const searchLinks = await this.findSearchLink(page);
                if(searchLinks.length > 0) {
                    console.log("has search link");
                    const payload = this.getPaginateParam(searchLinks);
                    return await this.getResultBySearchLink(payload, page);

                }

                const nextBtnSelector =  await this.findNextBtn(page);
                if(nextBtnSelector) {
                    console.log("next btn");
                    return await this.getResultByNextBtn(nextBtnSelector, page);
                }

                const moreBtnSelector = await this.findMoreBtn(page);
                if(moreBtnSelector) {
                    console.log("more btn");
                    return await this.getResultByMoreBtn(moreBtnSelector, page);
                }

                console.log("cant crawl");
                return null;
            }

        } catch (e) {
            console.error(e);
        } finally {
            await browser.close();
        }
    }

    async scrape(page) {
        try {
            const title = await ScrapeFactory.get(page, "title");

            // lấy description
            const description = await ScrapeFactory.get(page, "description");

            // lấy html
            const html = await ScrapeFactory.get(page, "html");

            // lấy text
            const text = await ScrapeFactory.get(page, "text");

            const hrefs = await ScrapeFactory.get(page, "href");

            const srcs = await ScrapeFactory.get(page, "src");

            const childUrls = [...hrefs, ...srcs];

            return {title, description, html, text, childUrls};
        } catch (e) {
            return null;
        }
    }

    async search( page,searchUrl, keyword) {

        let checked = false;

        try {

            await this.goTo(page, searchUrl, "networkidle2");

            const searchInput = await this.findSearchInput(page);

            if (searchInput) {
                checked = await this.handleSubmit(searchInput, keyword, page);
                if(checked) {
                    await this.waitNavigation(page);

                    await page.screenshot({
                        path: 'search.png',
                    });
                    console.log("Submit succeed");
                } else {
                    console.log("Submit failed");
                }
            } else {
                console.log("Dont have search input");
            }
            return checked;

        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async goTo(page, url, waitUntil) {
        try {
            await page.goto(url, {waitUntil: waitUntil});
            return true;
        } catch (e) {
            return false;
        }
    }

    async waitNavigation(page){
        try {
            await page.waitForNavigation({waitUntil: 'load'});
            return true;
        } catch (e) {
            return false;
        }
    }

    async clickBtn(page, BtnSelector){
        try {
            await page.click('xpath=' + BtnSelector);
            return true;
        } catch (e) {
            return false;
        }
    }

    async findSearchInput(page) {
        const selectors =  'input[type="search"], ' +
            'input[name="q"], ' +
            'input[name="s"], ' +
            'input[type="text"], ' +
            'input[type="input"], ' +
            'input[placeholder*="search"], ' +
            'input[placeholder*="Search"], ' +
            'input[aria-label*="search"], ' +
            'input[aria-label*="Search"], ' +
            'input[id*="search"], ' +
            'input[id*="Search"], ' +
            'input[class*="search"], ' +
            'input[class*="Search"], ' +
            'textarea';

        const searchInputs = await page.$$(selectors);

        if(searchInputs?.length) {
            for(let input of searchInputs) {
                if( !await this.hasReadOnlyAttribute(input) &&
                    !await this.hasHiddenAttribute(input) &&
                    await this.hasSearchCharacter(input) &&
                    await this.hasValidType(input)) {
                    return input;
                }
            }
        }
        if(searchInputs.length === 1) {
            return searchInputs[0];
        }


        return null;
    }

    async hasReadOnlyAttribute(element) {
        return await element.evaluate(el => el.hasAttribute('readonly'));
    }

    async hasHiddenAttribute(element) {
        return await element.evaluate(el => {
            let currentEl = el;

            while (currentEl) {
                const attributes = Array.from(currentEl.attributes);
                if (attributes.some(attr => attr.value === 'hidden' ||
                    attr.name === 'aria-hidden' && attr.value === 'true' )) {
                    return true;
                }
                currentEl = currentEl.parentElement;
            }

            return false;
        });
    }

    async hasSearchCharacter(element) {
        return await element.evaluate(el => {
            const attributes = Array.from(el.attributes);

            return attributes.some(attr => (attr.value.toLowerCase().includes('search') ||
                attr.value.toLowerCase().includes('keyword') ||
                attr.value.toLowerCase().includes('query') ||
                attr.value.toLowerCase().includes('tìm kiếm') ||
                attr.value.toLowerCase().includes('enter')
            ));
        });
    }

    async hasValidType(element) {
        return await element.evaluate(el => {
            const attributes = Array.from(el.attributes);
            if(el.hasAttribute('type')) {
                return attributes.some(attr =>((attr.name === 'type' && ['text', 'search'].includes( attr.value.toLowerCase())) && !attr.value.toLowerCase().includes('location')));
            } else {
                return true;
            }
        });
    }

    async hasSubmitForm(searchInput) {
        return await searchInput.evaluate(el => {
            function validActionForm(action) {
                return action !== null && action !== "#" && action !== "./" && action !== "/" && action !== "/en";
            }

            let currentEl = el;

            while (currentEl) {
                if (currentEl.tagName.toLowerCase() === 'form' && currentEl.getAttribute('action') && validActionForm(currentEl.getAttribute('action'))) {
                    return true;
                }

                currentEl = currentEl.parentElement;
            }

            return false;
        });
    }

    async appearElement(element) {
        return await element.evaluate(el => {
            let currentEl = el;

            while (currentEl) {
                const style = window.getComputedStyle(currentEl);

                if (style.display === 'none') {
                    currentEl.style.display = 'block';
                    return true;
                }

                currentEl = currentEl.parentElement;
            }

            return false;
        });
    }

    async handleSubmit(searchInput, keyword) {
        if( await this.hasSubmitForm(searchInput)) {
            await searchInput.evaluate((el, keyword) => {
                el.value = keyword;
                el.form.submit();
            }, keyword);

            return true;
        } else {
            await this.appearElement(searchInput);

            await searchInput.type(keyword, { delay: 100 });

            await searchInput.press('Enter');

            return true;
        }
    }

    async findSearchLink(page) {
        const currentUrl = page.url();
        const links = await page.evaluate(el => {
            return Array.from(document.body.querySelectorAll(('a[href'))).map(elem => elem.href);
        });
        return links.filter(link => {
            const objLink = new URL(link);
            return this.checkSearchParam(objLink);
        });
    }

    async findNextBtn(page) {
        const elements = await page.$$('a, button');
        if(elements) {
            let nextBtn;
            for (const element of elements) {
                const checked = await element.evaluate(el => {
                    for(const attr of el.attributes) {
                        if(attr.value.toString().toLowerCase().includes("disable") || attr.value.toString().toLowerCase().includes("hidden") || attr.name.toString().toLowerCase().includes("hidden")) {
                            return false;
                        }
                        if(attr.value.toString().toLowerCase().includes("next")) {
                            return true;
                        }
                        if((attr.value.toString().toLowerCase().includes("pag")) && el.innerText.toString().toLowerCase().includes("next")) {
                            nextBtn = el;
                            return true;
                        }
                    }
                    return false;
                });
                if(checked) {
                    nextBtn = element;
                    break;
                }
            }
            if(nextBtn) {
                return await this.getXPath(nextBtn, page);
            }
        }
        return null;

    }

    async findMoreBtn(page) {

        const aElements = await page.$$('a');
        const btnElements = await page.$$('button');

        const elements = [...btnElements, ...aElements];

        let moreBtn;
        for (const element of elements) {
            const checked = await element.evaluate(el => {
                for(const attr of el.attributes) {
                    if(attr.value.toString().toLowerCase().includes("disable") || attr.value.toString().toLowerCase().includes("hidden")) {
                        return false;
                    }
                    if(attr.value.toString().toLowerCase().includes("more")) {
                        return true;
                    }
                }
                if(el.innerText.toString().toLowerCase().includes("more")) {
                    return true;
                }
            });
            if(checked) {
                moreBtn = element;
                break;
            }
        }

        if(moreBtn) {
            return await this.getXPath(moreBtn, page);
        }
        return null;
    }

    async getResultBySearchLink(payload, page) {
        let {paginateKey, paginateStart, paginateValue, paginateUrl} = payload;
        const flag = paginateStart;

        await this.paginate(paginateKey, paginateStart.toString(), paginateUrl, page);
        const urlFirstPage = await this.getUrls(page);
        const setFirst = new Set(urlFirstPage);
        let result = [];
        let urlAfter = null;
        let setAfter = null;

        while(true) {
            paginateStart = paginateStart + paginateValue;
            await this.paginate(paginateKey, (paginateStart).toString(), paginateUrl, page);
            const afterPaginate = await this.getUrls(page);
            const set2 = new Set(afterPaginate);
            if(flag === paginateStart - paginateValue) {
                const uniqueToArray1 = Array.from(setFirst).filter(x => !set2.has(x));
                const uniqueToArray2 = Array.from(set2).filter(x => !setFirst.has(x));
                result.push(...uniqueToArray1, ...uniqueToArray2);
            } else {
                const uniqueToArray2 = Array.from(set2).filter(x => !setAfter.has(x));
                if(this.cleanResultUrl(uniqueToArray2).length > 0) {
                    result.push(...uniqueToArray2);
                } else {
                    break;
                }
            }
            urlAfter = afterPaginate;
            setAfter = set2;

        }
        console.log(this.cleanResultUrl(result).length);
        return this.cleanResultUrl(result);

    }

    async getResultByNextBtn(nextBtnSelector, page) {
        let hasNavigation = true;
        const urlFirstPage = await this.getUrls(page);
        const setFirst = new Set(urlFirstPage);
        let result = [];
        let urlAfter = null;
        let setAfter = null;
        let flag= 1;
        while(nextBtnSelector) {
            if(await this.clickBtn(page, nextBtnSelector)) {
                if(hasNavigation) {
                    hasNavigation = await this.waitNavigation(page);
                } else {
                    await page.waitForTimeout(3000);
                }
                const afterPaginate = await this.getUrls(page);
                const set2 = new Set(afterPaginate);
                if(flag === 1) {
                    const uniqueToArray1 = Array.from(setFirst).filter(x => !set2.has(x));
                    const uniqueToArray2 = Array.from(set2).filter(x => !setFirst.has(x));
                    result.push(...uniqueToArray1, ...uniqueToArray2);
                } else {
                    const uniqueToArray2 = Array.from(set2).filter(x => !setAfter.has(x));
                    if(this.cleanResultUrl(uniqueToArray2).length > 0) {
                        result.push(...uniqueToArray2);
                    } else {
                        break;
                    }
                }
                urlAfter = afterPaginate;
                setAfter = set2;
                nextBtnSelector =  await this.findNextBtn(page);
                flag++;
            }
            else {
                break;
            }
        }
        console.log(this.cleanResultUrl(result).length);
        return this.cleanResultUrl(result);
    }

    async getResultByMoreBtn(moreBtnSelector, page) {
        let result = [];
        let urlAfter = await this.getUrls(page);
        let setAfter = new Set(urlAfter);
        while(moreBtnSelector) {
            if(await this.clickBtn(page, moreBtnSelector)) {
                await page.waitForTimeout(3000);
                moreBtnSelector =  await this.findMoreBtn(page);
            }
            else {
                break;
            }
        }

        let urlBefore = await this.getUrls(page);
        let setBefore = new Set(urlBefore);
        const uniqueToArray1 = Array.from(setAfter).filter(x => !setBefore.has(x));
        const uniqueToArray2 = Array.from(setBefore).filter(x => !setAfter.has(x));
        result.push(...uniqueToArray1, ...uniqueToArray2);
        console.log(this.cleanResultUrl(result).length);
        return this.cleanResultUrl(result);
    }

    async paginate(paginateKey, paginateValue, paginateUrl, page){
        let url = new URL(paginateUrl);
        url.searchParams.set(paginateKey, paginateValue);
        await this.goTo(page, url.href, "load");
    }

    async getUrls(page) {
        return await page.evaluate( (el) => {
            return Array.from(document.body.querySelectorAll('a[href]')).map(e => e.href);
        });
    }

    async getXPath(el) {
        return await el.evaluate(element => {
            if (element.id !== '') {
                return `//*[@id="${element.id}"]`;
            }
            const parts = [];
            while (element && element.nodeType === Node.ELEMENT_NODE) {
                let siblingIndex = 0;
                let sibling = element.previousSibling;
                while (sibling) {
                    if (sibling.nodeType === Node.ELEMENT_NODE && sibling.nodeName === element.nodeName) {
                        siblingIndex++;
                    }
                    sibling = sibling.previousSibling;
                }
                const part = element.nodeName.toLowerCase() + (siblingIndex ? `[${siblingIndex + 1}]` : '');
                parts.unshift(part);
                element = element.parentNode;
            }
            return parts.length ? '/' + parts.join('/') : null;
        });
    }

    checkSearchParam(url) {
        for (const param of url.searchParams.keys()) {
            if((param.includes('page') || param.includes('start') || param.includes('offset')) && !isNaN(Number(url.searchParams.get(param)))) {
                return true;
            }
        }
        return false;
    }

    getPaginateParam(searchLinks) {
        let paginateKey = null;
        let paginateValue = 1;
        let paginateStart = 1;
        let paginateUrl = searchLinks[0];
        let tmp = new Set();
        searchLinks.forEach(link => {
            const objLink = new URL(link);
            if(paginateKey === null) {
                for (const param of objLink.searchParams.keys()) {
                    if((param.includes('page') || param.includes('start') || param.includes('offset'))) {
                        paginateKey = param;
                        tmp.add(Number(objLink.searchParams.get(param)));
                    }
                }
            } else {
                tmp.add(Number(objLink.searchParams.get(paginateKey)));
            }
        });
        tmp = Array.from(tmp);
        tmp.sort((a, b) => a - b);
        console.log(tmp)
        if(tmp[0] - paginateStart === 0 || tmp[0] === 10 || tmp[1] - tmp[0] === tmp[1]) {
            paginateStart = 0;
        }
        if(tmp[1] - tmp[0] === tmp[1]) {
            paginateValue = tmp[1];
        } else {
            paginateValue = tmp[0] - paginateStart;
        }
        return {paginateKey, paginateStart, paginateValue, paginateUrl};
    }

    cleanResultUrl(urls) {
        return urls.filter(url => {
            const objLink = new URL(url);
            return !this.checkSearchParam(objLink);
        });
    }
}

module.exports =  new CrawlLibrary();