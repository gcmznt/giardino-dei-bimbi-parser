const puppeteer = require("puppeteer");

const url = "http://www.ilgiardinodeibimbi.it/index.asp";
const TODAY = 0;
const YESTERDAY = 1;
const DAY_BEFORE_YESTERDAY = 2;

const getData = async (day = TODAY) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.focus('[name="userName"]');
  await page.keyboard.type("zinetti");
  await page.focus('[name="userPwd"]');
  await page.keyboard.type("caterina17");
  await page.keyboard.press("Enter");

  await page.waitForNavigation({ waitUntil: "load" });

  const act = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[id*="AttivitaBimbo"]')).map(d => ({
      title: Array.from(d.querySelectorAll(".title")).map(e => e.innerText),
      text: Array.from(d.querySelectorAll(".text")).map(e => e.innerText)
    }))
  );
  await browser.close();
  return act.map(a =>
    a.title.map((e, i) => ({
      title: e,
      text: a.text[i]
    }))
  );
};

module.exports = {
  TODAY,
  YESTERDAY,
  DAY_BEFORE_YESTERDAY,
  getData
};
