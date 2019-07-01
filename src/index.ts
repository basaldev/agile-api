import * as assert from 'assert';
import * as Express from 'express';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as db from './db';
import getLogger from './logger';

assert.ok(process.env.PORT, 'No PORT env is specified');

const logger = getLogger('@app');
const app = Express();

app.use(helmet());
app.use(cors());
app.use(Express.json({ limit: '5mb' }));

app.get('/comments', (req, res) => {
  db.find('comments').then(docs => {
    res.status(200).send(docs);
  });
});

app.post('/comments', (req, res) => {
  db.create('comments', req.body).then(() => {
    res.status(201).send({ result: 'created' });
  });
});

app.use('*', (req, res, next) => {
  next({
    status: 404,
    message: 'Not found'
  });
});

app.use((err, req, res, next) => {
  const status = (err && err.status) || 500;
  const message = (err && err.message) || 'Internal server error';
  res.status(status).send({ message });
  next();
});

logger.info('Connecting to db...');
db.connect()
  .then(() => {
    app.listen(`${process.env.PORT}`, () => {
      logger.info(`Server now listening at ${process.env.PORT}`);
    });
  })
  .catch(err => {
    logger.fatal('db connection error', err);
  });

export default app;
