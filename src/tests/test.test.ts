import { fakeGenEquipamento } from '../mocks/equipamentoMock';
import { EquipamentoController } from '../controllers/EquipamentoController';
import { Request, Response } from 'express';
import { EquipamentoRepository } from '../repositories/equipamentoRepository';

jest.mock('../repositories/equipamentoRepository');
jest.mock('express');

describe('Equipamento controller', () => {
  beforeEach(() => jest.clearAllMocks());
  it('Deve criar um equipamento com sucesso', async () => {
    const controller = new EquipamentoController();

    const req = {
      body: fakeGenEquipamento(),
    } as Request;

    const res: Response = {};

    const result = await controller.create(req, res);

    expect(EquipamentoRepository.create).toHaveBeenCalledTimes(1);
    expect(EquipamentoRepository.create).toHaveBeenCalledWith(req.body);
  });
});
