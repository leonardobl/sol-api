import swaggerUi from 'swagger-ui-express';
import express, { Request, Response, response } from 'express';
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

app.use((erro: Error, req: Request, res: Response) => {
  if (erro instanceof Error) {
    return res.status(400).json({ message: erro.message });
  }

  return response.status(500).json({
    message: 'internal server error',
    dataError: erro,
  });
});
app.use(routesEquipamentos);
