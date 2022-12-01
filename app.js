import express from 'express';
import { appRouter } from './src/router.js'
const app = express();

app.use('/', appRouter)

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send(error.message);
});

export default app