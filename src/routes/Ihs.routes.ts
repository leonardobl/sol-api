import { Router } from 'express';
import { EquipamentoController } from '../controllers/EquipamentoController';
import axios from 'axios';
import cheerio from 'cheerio';

export const IhsRoutes = Router();

const eqController = new EquipamentoController();

IhsRoutes.get('/ihs', async (req, res) => {
  // return await eqController.list(req, res);

  const url = 'https://www.gov.br/receitafederal/pt-br/assuntos/noticias';
  const { data } = await axios.get(url);

  const $ = cheerio.load(data);
  const titlesRaw = $(
    '[class="noticias listagem-noticias-com-foto"] > li > [class="conteudo"] > h2 > a',
  );
  const datesRaw = $(
    '[class="noticias listagem-noticias-com-foto"] li > [class="conteudo"] > [class="descricao"] > [class="data"]',
  );

  const subTitlesRaw = $(
    '[class="noticias listagem-noticias-com-foto"] li > [class="conteudo"] > [class="descricao"]',
  );

  const titles: string[] = [];
  const links: string[] = [];
  const dates: string[] = [];
  const subTitles: string[] = [];

  $(titlesRaw).each((idx, el) => titles.push($(el).text()));
  $(titlesRaw).each((idx, el) => links.push($(el).attr('href') as string));
  $(datesRaw).each((idx, el) => dates.push($(el).text().trim()));
  $(subTitlesRaw).each((idx, el) =>
    subTitles.push($(el).text().split(' - ')[1].trim()),
  );

  const dateFormate = titles.map((el, idx) => ({
    title: el,
    subTitle: subTitles[idx],
    date: dates[idx],
    link: links[idx],
  }));

  return res.status(200).json({ dateFormate });
});
