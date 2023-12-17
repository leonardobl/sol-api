import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TiposDeDocumentoEnum } from '../enum/documento';
import { Equipamento } from './Equipamento';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';

@Entity('documentos')
export class Documento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: TiposDeDocumentoEnum })
  tipo: TiposDeDocumentoEnum;

  @Column({ type: 'text' })
  file: string;

  @ManyToOne(() => Equipamento, equi => equi.documentos)
  equipamento: Equipamento;

  @CreateDateColumn({ type: 'time with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updatedAt: Date;
}
