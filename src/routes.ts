const request = require('superagent');
const Router = require('koa-router');

const router = new Router();
router.get('/', async (ctx, next) => {
    ctx.body= 'Hello World!';
});
router.get('/images*', async (ctx, next) => {
    console.log("ctx.params.tags: ", ctx.params);
    console.log(" ctx.query.tags: ", ctx.query.q);

    await request
        .get('https://www.flickr.com/services/feeds/photos_public.gne?tags='+ctx.query.q)
        .then(res => {
            ctx.body = res.body;

        })
        .catch(err => {
            console.log(err);
        });
});

export default router;