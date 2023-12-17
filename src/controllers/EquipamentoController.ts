import { Request, Response } from 'express';
import { EquipamentoRepository } from '../repositories/equipamentoRepository';
import { PaginationQueryFormat, ToPagination } from '../utils/pagination';

export class EquipamentoController {
  async create(req: Request, res: Response) {
    try {
      const resposta = await EquipamentoRepository.create(req.body);
      await EquipamentoRepository.save(resposta);
      return res.status(201).json(resposta);
    } catch (error) {
      return res.status(500).json({
        message: 'internal server erro',
        dataError: error,
      });
    }
  }

  async list(req: Request, res: Response) {
    const { page, size } = PaginationQueryFormat(req);

    const skip = Number(size) * Number(page) - Number(size);

    try {
      const result = await EquipamentoRepository.findAndCount({
        relations: ['documentos'],
        skip,
        take: Number(size),
      });

      const numberOfItems = result[1];
      const numberOfPages = Math.ceil(numberOfItems / +size);

      const data = ToPagination({
        page: Number(page),
        size: Number(size),
        numberOfItems,
        response: result[0],
        numberOfPages,
      });

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({
        message: 'internal server erro',
        dataError: error,
      });
    }
  }
}
