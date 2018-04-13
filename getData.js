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

  const act = await page.evaluate(
    day => ({
      title: Array.from(
        document
          .querySelectorAll('[id*="AttivitaBimbo"]')
          [day].querySelectorAll(".title")
      ).map(e => e.innerText),
      text: Array.from(
        document
          .querySelectorAll('[id*="AttivitaBimbo"]')
          [day].querySelectorAll(".text")
      ).map(e => e.innerText)
    }),
    day
  );
  await browser.close();
  return act.title.map((e, i) => ({
    title: e,
    text: act.text[i]
  }));
};

module.exports = {
  TODAY,
  YESTERDAY,
  DAY_BEFORE_YESTERDAY,
  getData
};
