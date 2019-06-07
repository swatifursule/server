import * as Koa from 'koa';
import log4js = require("log4js");
import cors = require("@koa/cors");
import router from './routes';

const logger = log4js.getLogger("server");
logger.level = "debug";

const port: number = 3020;

// create koa app and router objects
const app = new Koa();

// enable CORS
app.use(cors());

// logger
app.use(async (ctx, next) => {
    await next();
    if (logger.isTraceEnabled()) {
        const rt = ctx.response.get("X-Response-Time");
        logger.trace(`${ctx.method} ${ctx.url} - ${rt}`);
    }
});

// error handling
app.use(async (ctx, next) => {
    try {
        await next();
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
        ctx.app.emit('error', err, ctx);
    }
});



// tells the router to use all the routes that are on the object
app.use(router.routes());
app.use(router.allowedMethods());


logger.info(`Server running on port ${port}`);

module.exports = app.listen(port);
