import {
  EstadoEquipamentoEnum,
  TipoEquipamentoEnum,
} from '../enum/equipamento';
import { IDocumentoDto } from './documento';

export interface IPageEquipamento {
  nome: string;
  modelo: string;
  num_serie: string;
  num_patrimonio?: string;
  num_os?: string;
  mac?: string;
  cod_barras?: string;
  tipo_equipamento: TipoEquipamentoEnum;
  observacoes?: string;
  data_transferencia?: string;
  documentos?: IDocumentoDto[];
  estado: EstadoEquipamentoEnum;
}

export interface IEquipamentoDto {
  id: string;
  nome: string;
  modelo: string;
  num_serie: string;
  num_patrimonio: string;
  num_os: string;
  mac: string;
  cod_barras: string;
  tipo_equipamento: TipoEquipamentoEnum;
  observacoes: string;
  data_transferencia: string;
  documentos: IDocumentoDto[];
  estado: EstadoEquipamentoEnum;
  createdAt: string;
  updatedAt: string;
}
