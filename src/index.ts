import puppeteer from 'puppeteer';
import { app } from './app';

import { AppDataSource } from './data-source';

const port = 3333;

// AppDataSource.initialize().then(() => {
//   app.listen(port, () => console.log(`Server on port:${port}`));
// });

const url = 'https://opcoes.net.br/opcoes/bovespa';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('select[name="IdAcao"]');

  await page.click('select[name="IdAcao"]');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Enter');
  await page.waitForSelector(
    'button[class="dt-button buttons-excel buttons-html5"]',
  );
  await page.click('button[class="dt-button buttons-excel buttons-html5"]');

  setTimeout(() => {
    browser.close();
  }, 2000);
})();

app.listen(port, () => console.log(`Server on port:${port}`));
