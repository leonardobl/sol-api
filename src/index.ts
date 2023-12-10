import { app } from './app';
import { AppDataSource } from './data-source';

const port = 3333;

AppDataSource.initialize().then(() => {
  app.listen(port, () => console.log(`Server on port:${port}`));
});
