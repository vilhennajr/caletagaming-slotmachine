import 'reflect-metadata';
import { app } from './app';
import { dataSource } from '../typeorm';

dataSource.initialize().then(() => {
    const server = app.listen(4433, () => {
    console.log('Caleta Gaming - Slot Machine');
  });
});
