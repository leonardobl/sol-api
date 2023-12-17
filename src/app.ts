import swaggerUi from 'swagger-ui-express';
import express from 'express';
import cors from 'cors';
import { routesEquipamentos } from './routes/equipamento.routes';
import swaggerDoc from './swagger.json';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, { explorer: true }),
);

app.use(routesEquipamentos);
