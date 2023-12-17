import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Documento } from './Documento';
import {
  EstadoEquipamentoEnum,
  TipoEquipamentoEnum,
} from '../enum/equipamento';

@Entity('equipamentos')
export class Equipamento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  nome: string;

  @Column({ type: 'text' })
  modelo: string;

  @Column({ type: 'text' })
  num_serie: string;

  @Column({ type: 'text', nullable: true })
  num_patrimonio: string;

  @Column({ type: 'text', nullable: true })
  num_os: string;

  @Column({ type: 'text', nullable: true })
  mac: string;

  @Column({ type: 'text', nullable: true })
  cod_barras: string;

  @Column({ type: 'enum', enum: TipoEquipamentoEnum, nullable: true })
  tipo_equipamento: TipoEquipamentoEnum;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  @Column({ type: 'time with time zone', nullable: true })
  data_transferencia: Date;

  @OneToMany(() => Documento, doc => doc.equipamento)
  @JoinColumn({ name: 'equi_id' })
  documentos: Documento[];

  @Column({ type: 'enum', enum: EstadoEquipamentoEnum })
  estado: EstadoEquipamentoEnum;

  @CreateDateColumn({ type: 'time with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'time with time zone' })
  updatedAt: Date;
}
