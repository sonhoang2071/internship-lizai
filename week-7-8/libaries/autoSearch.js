const puppeteer = require("puppeteer");


class AutoSearch {
    async search( searchUrl, keyword) {
        const browser = await puppeteer.launch({
            executablePath: "/usr/bin/chromium-browser",
            headless: false,
            defaultViewport: {
                width: 1280,
                height: 1080,
            }
        });
        const page = await browser.newPage();

        let checked = false;

        try {
            await page.goto(searchUrl, {waitUntil: 'domcontentloaded'});


            const searchInput = await this.findSearchInput(page);


            if (searchInput) {
                checked = await this.handleSubmit(searchInput, keyword, page);
                if(checked) {
                    await page.waitForNavigation({waitUntil: 'domcontentloaded'});

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
        } finally {
            await browser.close();
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
}



module.exports =  new AutoSearch();