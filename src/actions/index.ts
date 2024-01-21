import { Page } from 'puppeteer';
import { sleep } from '../utils/sleep';

export class ActionController {
  async login({
    numeroLoja,
    login,
    password,
    page,
  }: {
    numeroLoja: string;
    login: string;
    password: string;
    page: Page;
  }) {
    const input1 = '#codEmpresa';
    const input2 = '#codUsuario';
    const input3 = '#senha';
    const input4 = '#submitLogin';
    const btnNext = 'button.btn-default.btn.button-token';

    await page.type(input1, numeroLoja, { delay: 40 });
    await page.type(input2, login, { delay: 50 });
    await page.type(input3, password, { delay: 80 });

    await page.waitForSelector(input4);
    await page.click(input4, { delay: 50 });

    sleep(1000);

    await page.solveRecaptchas();

    sleep(1000);

    await page.waitForSelector(btnNext);
    await page.click(btnNext, { delay: 50 });
  }
}
