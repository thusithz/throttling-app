import app from './app';

const port = process.env.PORT ?? 3333;

app.listen(Number(process.env.PORT) || 3333, '0.0.0.0', () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://0.0.0.0:${port}`);
  /* eslint-enable no-console */
});
