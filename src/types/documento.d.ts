import { TiposDeDocumentoEnum } from '../enum/documento';

export interface IDocumentoDto {
  id: string;
  tipo: TiposDeDocumentoEnum;
  file: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPageDocumento {
  tipo: TiposDeDocumentoEnum;
  file: string;
}
