// import puppeteer from 'puppeteer';
// import { anonymizeProxy, closeAnonymizedProxy } from 'proxy-chain';

// // import { app } from './app';

// import { AppDataSource } from './data-source';

// const port = 3333;

// // AppDataSource.initialize().then(() => {
// //   app.listen(port, () => console.log(`Server on port:${port}`));
// // });

// // const url = 'https://vendadigital.consorciohonda.com.br/';
// const url = 'http://www.meuip.com/';

// (async () => {
//   const oldProxyUrl =
//     'http://scraperapi:d25d5b039bf11c816292c4bbc4bcb9cf@proxy-server.scraperapi.com:8001';
//   const newProxyUrl = await anonymizeProxy(oldProxyUrl);

//   console.log(newProxyUrl);

//   const browser = await puppeteer.launch({
//     ignoreHTTPSErrors: true,
//     defaultViewport: null,
//     args: [`--proxy-server=${newProxyUrl}`],
//   });

//   const page = await browser.newPage();

//   console.log('Abrindo a pagina via proxy');
//   await page.setDefaultNavigationTimeout(0);

//   await page.goto(url);
//   await page.screenshot({ path: 'teste.png' });

//   await browser.close();
//   await closeAnonymizedProxy(String(newProxyUrl), true);

//   console.timeEnd('#Sucesso');
// })();

// // app.listen(port, () => console.log(`Server on port:${port}`));

import puppeteer from 'puppeteer-extra';
import randomUseragent from 'random-useragent';
import RecaptchaPlugin from 'puppeteer-extra-plugin-recaptcha';
import { Cluster } from 'puppeteer-cluster';

// const url = 'https://vendadigital.consorciohonda.com.br/';
const url = 'https://www3.honda.com.br/corp/ihs/portal/#/login';

function sleep(time: number) {
  setTimeout(() => {}, time);
}

(async () => {
  puppeteer.use(
    RecaptchaPlugin({
      provider: {
        id: '2captcha',
        token: process.env.TWOCAPTCHA_API_KEY,
      },
      visualFeedback: true,
    }),
  );

  // Puppeteer usage as normal (headless is "false" just for this demo)
  const browser = await puppeteer.launch({
    // headless: false,
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
  await page.type(input2, 'ADRIANO2', { delay: 50 });
  await page.type(input3, 'Mo,1111111', { delay: 80 });

  await page.waitForSelector(input4);
  await page.click(input4, { delay: 50 });

  // Even this `Puppeteer.Page` extension is recognized and fully type safe 🎉

  sleep(1000);

  await page.solveRecaptchas();

  sleep(1000);

  // await Promise.all([
  //   await page.waitForNavigation(),
  //   await page.click('button.btn-default.btn.button-token'),
  // ]);

  await page.waitForSelector(btnNext);
  await page.click(btnNext, { delay: 50 });

  // await page.screenshot({ path: 'response.png', fullPage: true });
  // await browser.close();

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 1,
    puppeteerOptions: {
      ignoreHTTPSErrors: true,
      defaultViewport: null,
    },
  });

  await cluster.task(async ({ page, data: url }) => {});
})();
