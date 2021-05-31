const puppeteer = require('puppeteer');

async function scrapeRecipeTypes() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.her-bivore.com/recipes.html");
    const info = []

    for (let x = 1; x <= 3; x++) {
        const [el] = await page.$x('//*[@id="block_1974"]/div/div/div[2]/div/div[' + x + ']/div/div[2]/div/div[1]/h4/span');
        const text = await el.getProperty('textContent');
        const title = await text.jsonValue();

        const [el2] = await page.$x('//*[@id="block_1974"]/div/div/div[2]/div/div['+x+']/div/div[2]/div/div[2]/div/a/img');
        const src = await el2.getProperty('src');
        const imageURL = await src.jsonValue();

        const [el3] = await page.$x('//*[@id="block_1974"]/div/div/div[2]/div/div['+x+']/div/div[2]/div/div[2]/div/a');
        const url = await el3.getProperty('href');
        const url2 = await url.jsonValue();
        const key = url2.split(".com/")[1].split(".html")[0]

        info.push({ title, imageURL, key })
    }
    browser.close();
    return info
}

async function scrapeRecipeLists(type) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.her-bivore.com/" + type + ".html");
    await page.waitForSelector('.site-main')
    const info = []

    let titles = await page.$$eval('.heading.font--heading.b-margin-b-25--xs.heading--beta.heading--allow-newlines', title => {
        // Extract the links from the data
        title = title.map(el => el.querySelector('a > span').textContent)
        return title;
    });

    let urls = await page.$$eval('.heading.font--heading.b-margin-b-25--xs.heading--beta.heading--allow-newlines', links => {
        // Extract the links from the data
        links = links.map(el => el.querySelector('a').href)
        return links;
    });

    let images = await page.$$eval('.img-responsive.img-centered.cb-editable-img.lazyload', links => {
        // Extract the links from the data
        links = links.map(el => el.src)
        return links;
    });

    for(let x=0; x < titles.length; x++){
        let title = titles[x]
        let url = urls[x]
        let image = images[x]

        info.push({title, url, image})
    }

    browser.close();
    return info
}

module.exports = {
    scrapeRecipeTypes,
    scrapeRecipeLists
}
