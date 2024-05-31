const puppeteer = require("puppeteer");

// screenshot youtube
// (async () => {
//     // Launch the browser and open a new blank page
//     const browser = await puppeteer.launch({
//         executablePath: "/usr/bin/chromium-browser",
//         headless: false,
//     });
//     const page = await browser.newPage();
//     await page.goto("https://www.youtube.com/");
//     await page.setViewport({ width: 1080, height: 1024 });
//     await page.screenshot({ path: "ytb.png" });
//     await browser.close();
// })();

// request
// (async () => {
//     const browser = await puppeteer.launch({
//         executablePath: "/usr/bin/chromium-browser",
//         headless: false,
//     });
//     const page = await browser.newPage();

//     page.on("request", (request) => {
//         console.log("Request URL:", request.url());
//         console.log("Request Method:", request.method());
//         console.log("Request Headers:", request.headers());
//     });

//     await page.goto("https://example.com");
//     await browser.close();
// })();

// response
// (async () => {
//     const browser = await puppeteer.launch({
//         executablePath: "/usr/bin/chromium-browser",
//         headless: false,
//     });
//     const page = await browser.newPage();

//     page.on("response", async (response) => {
//         console.log("Response URL:", response.url());
//         console.log("Response Status:", response.status());
//         console.log("Response Headers:", response.headers());

//         if (response.ok()) {
//             const json = await response.json();
//             console.log("Response JSON:", json);
//         }
//     });
//     await page.goto("https://jsonplaceholder.typicode.com/posts/1");
//     await browser.close();
// })();

// (async () => {
//     const browser = await puppeteer.launch({
//         executablePath: "/usr/bin/chromium-browser",
//         headless: false,
//     });
//     const page = await browser.newPage();
//     await page.goto("https://youtube.com", {
//         waitUntil: "networkidle0",
//         timeout: "300000",
//     });
//     await page.waitForSelector("input#search");
//     await page.type("input#search", "Son Tung MTP");
//     await page.click("#search-icon-legacy");
//     const [response] = await Promise.all([
//         page.waitForNavigation(), // The promise resolves after navigation has finished
//         page.screenshot({ path: "ytb.png" }),
//         browser.close()
//     ]);
// })();

// (async () => {
//     const browser = await puppeteer.launch({
//         executablePath: "/usr/bin/chromium-browser",
//         headless: false,
//     });

//     // Tạo một ngữ cảnh duyệt web ẩn danh
//     const context = await browser.createBrowserContext();
//     const page = await context.newPage();
//     await page.goto("https://example.com");

//     // Đóng ngữ cảnh duyệt web ẩn danh
//     await context.close();

//     // Đóng trình duyệt
//     await browser.close();
// })();

// (async () => {
//     const browser = await puppeteer.launch({
//         executablePath: "/usr/bin/chromium-browser",
//         headless: false,
//     });

//     // Tạo hai ngữ cảnh duyệt web
//     const context1 = await browser.createBrowserContext();
//     const context2 = await browser.createBrowserContext();

//     // Tạo hai trang trong các ngữ cảnh khác nhau
//     const page1 = await context1.newPage();
//     const page2 = await context2.newPage();

//     // Đăng nhập vào hai tài khoản khác nhau trên cùng một trang web
//     await page1.goto("https://example.com/login");
//     await page2.goto("https://example.com/login");

//     // Đóng ngữ cảnh duyệt web sau khi hoàn thành
//     await context1.close();
//     await context2.close();

//     // Đóng trình duyệt
//     await browser.close();
// })();

// (async () => {
//     const browser = await puppeteer.launch({
//         executablePath: "/usr/bin/chromium-browser",
//         headless: false,
//     });
//     const page = await browser.newPage();

//     await page.goto("https://example.com");

//     await page.setCookie({
//         name: "myCookie",
//         value: "myValue",
//         domain: "example.com",
//         path: "/",
//         expires: Date.now() / 1000 + 3600, // Cookie hết hạn sau 1 giờ
//         httpOnly: true,
//         secure: true,
//         sameSite: "Strict",
//     });

//     // Kiểm tra cookies đã được thiết lập
//     const cookies = await page.cookies();
//     console.log(cookies);

//     await browser.close();
// })();

// // [
// //     {
// //       name: 'myCookie',
// //       value: 'myValue',
// //       domain: 'example.com',
// //       path: '/',
// //       expires: 1716888373.288,
// //       size: 15,
// //       httpOnly: true,
// //       secure: true,
// //       session: false,
// //       sameSite: 'Strict',
// //       priority: 'Medium',
// //       sameParty: false,
// //       sourceScheme: 'Secure'
// //     }
// // ]

// (async () => {
//     const browser = await puppeteer.launch({
//         executablePath: "/usr/bin/chromium-browser",
//         headless: false,
//     });
//     const page = await browser.newPage();

//     await page.goto("https://example.com");

//     // Thiết lập cookie
//     await page.setCookie({
//         name: "myCookie",
//         value: "myValue",
//         domain: "example.com",
//     });

//     // Kiểm tra cookies trước khi xóa
//     console.log("Cookies before deletion:", await page.cookies());

//     // Xóa cookie
//     await page.deleteCookie({ name: "myCookie", domain: "example.com" });

//     // Kiểm tra cookies sau khi xóa
//     console.log("Cookies after deletion:", await page.cookies());

//     await browser.close();
// })();

// Cookies before deletion: [
//     {
//       name: 'myCookie',
//       value: 'myValue',
//       domain: 'example.com',
//       path: '/',
//       expires: -1,
//       size: 15,
//       httpOnly: false,
//       secure: true,
//       session: true,
//       priority: 'Medium',
//       sameParty: false,
//       sourceScheme: 'Secure'
//     }
// ]
// Cookies after deletion: []

// (async () => {
//     const browser = await puppeteer.launch({
//         executablePath: "/usr/bin/chromium-browser",
//         headless: false,
//     });
//     const page = await browser.newPage();
//     await page.goto("https://example.com");

//     // Lấy `ElementHandle` cho phần tử với selector '#myElement'
//     const elementHandle = await page.$("h1");

//     const text = await elementHandle.evaluate((node) => node.textContent);
//     console.log(text);

//     await browser.close();
// })();

// Example Domain

// (async () => {
//     const browser = await puppeteer.launch({
//         executablePath: "/usr/bin/chromium-browser",
//         headless: false,
//     });
//     const page = await browser.newPage();
//     await page.goto("https://example.com");

//     // Lấy `ElementHandle` cho phần tử với selector 'h1'
//     const elementHandle = await page.$("h1");

//     if (elementHandle) {
//         // Lấy nội dung văn bản của phần tử
//         const text = await elementHandle.evaluate((node) => node.innerText);
//         console.log("Text content:", text);

//         // Chụp ảnh màn hình của phần tử
//         await elementHandle.screenshot({ path: "element.png" });

//         // Lấy thuộc tính `id` của phần tử (nếu có)
//         const idProperty = await elementHandle.getProperty("id");
//         const idValue = await idProperty.jsonValue();
//         console.log("ID:", idValue);

//         // Nhấp vào phần tử (nếu có thể nhấp)
//         try {
//             await elementHandle.click();
//             console.log("Element clicked");
//         } catch (e) {
//             console.log("Failed to click element:", e);
//         }
//     } else {
//         console.log("Element not found");
//     }

//     await browser.close();
// })();

// Text content: Example Domain
// ID:
// Element clicked

// (async () => {
//     const browser = await puppeteer.launch({
//         executablePath: "/usr/bin/chromium-browser",
//         headless: false,
//     });
//     const page = await browser.newPage();
//     await page.goto("https://brainbaking.com/post/2024/05/i-miss-bsd-linux/", {
//         waitUntil: "networkidle2",
//     });
//     // Saves the PDF to hn.pdf.
//     await page.pdf({
//         path: "brainbaking.pdf",
//     });

//     await browser.close();
// })();
