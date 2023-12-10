import { faker } from '@faker-js/faker';

export function fakeGenEquipamento() {
  return {
    nome: `Optiplex 500${Math.random()}`,
    modelo: 'Dell',
    num_serie: faker.string.numeric(10),
    num_patrimonio: faker.string.numeric(6),
    num_os: faker.string.numeric(6),
    mac: '00:1B:44:11:3A:B7',
    cod_barras: faker.string.numeric(16),
    tipo_equipamento: 'DESKTOP',
    observacoes: `isso e apenas um teste  N${Math.random()}`,
    estado: 'BACKUP',
  };
}
