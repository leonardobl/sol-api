import { AppDataSource } from '../data-source';
import { Equipamento } from '../entities/Equipamento';

export const EquipamentoRepository = AppDataSource.getRepository(Equipamento);
