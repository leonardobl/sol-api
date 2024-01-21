import dotenv from 'dotenv';
dotenv.config();
import puppeteer from 'puppeteer-extra';
import randomUseragent from 'random-useragent';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';

import { env } from './env';

const url = 'https://www3.honda.com.br/corp/ihs/portal/#/login';

function sleep(time: number) {
  setTimeout(() => {}, time);
}

(async () => {
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: env.TWOCAPTCHA_API_KEY,
      },
      visualFeedback: true,
    }),
  );

  const browser = await puppeteer.launch({
    headless: false,
    // executablePath: '/opt/google/chrome/chrome',
    ignoreHTTPSErrors: true,
    defaultViewport: null,
  });

  const page = await browser.newPage();
  await page.setUserAgent(randomUseragent.getRandom());

  await page.goto(url, { waitUntil: 'networkidle0' });

  const input1 = '#codEmpresa';
  const input2 = '#codUsuario';
  const input3 = '#senha';
  const input4 = '#submitLogin';
  const btnNext = 'button.btn-default.btn.button-token';

  await page.type(input1, '1014412', { delay: 40 });
  // await page.type(input2, 'ANTONIO10', { delay: 50 });
  // await page.type(input3, 'Mo,2222222', { delay: 80 });
  await page.type(input2, 'BENILSON', { delay: 50 });
  await page.type(input3, 'Mo,4444444', { delay: 80 });

  await page.waitForSelector(input4);
  await page.click(input4, { delay: 50 });

  sleep(1000);

  await page.solveRecaptchas();

  sleep(1000);

  await page.waitForSelector(btnNext);
  await page.click(btnNext, { delay: 50 });

  await page.$$eval('.a-empresaHonda', item => {
    console.log(item);
  });
  // await page.waitForSelector('.a-empresaHonda').value
  await page.click('.a-empresaHonda');
})();
