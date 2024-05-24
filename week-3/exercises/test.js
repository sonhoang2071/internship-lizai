async function test(url) {
    try {
        const data = await fetch(url);
        return data;
    } catch (error) {
        return error;
    }
}
test("1").then((e) => {
    console.log(e);
});
