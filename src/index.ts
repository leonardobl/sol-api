import dotenv from 'dotenv';
dotenv.config();
import puppeteer from 'puppeteer-extra';
import randomUseragent from 'random-useragent';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import { ActionController } from './actions';
import { env } from './env';

const url = 'https://www3.honda.com.br/corp/ihs/portal/#/login';
const actions = new ActionController();

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

  // await page.type(input1, '1014412', { delay: 40 });
  // await page.type(input2, 'ANTONIO10', { delay: 50 });
  // await page.type(input3, 'Mo,2222222', { delay: 80 });
  // await page.type(input2, 'BENILSON', { delay: 50 });
  // await page.type(input3, 'Mo,4444444', { delay: 80 });

  try {
    await actions.login({
      numeroLoja: '1014412',
      login: 'BENILSON',
      password: 'Mo,4444444',
      page,
    });
  } catch (error) {
    console.log(error);
  }

  await page.waitForSelector('a.a-empresaHonda');
  const btnConsorcio = await page.$$eval('a.a-empresaHonda', btns =>
    btns.find(btn => btn.innerText.includes('CONSÓRCIO').click()),
  );

  // console.log(btnConsorcio);

  // btnConsorcio.click();

  // await page.waitForSelector('.a-empresaHonda');
  // await page.click('.a-empresaHonda');
})();
