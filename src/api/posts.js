const Router = require('koa-router');
const posts = new Router();



posts.get('/test',ctx=>ctx.body='성공')
posts.post('/test',ctx=>ctx.body='성공')
posts.get('/test',ctx=>ctx.body='성공')
posts.delete('/test',ctx=>ctx.body='성공')
posts.put('/test',ctx=>ctx.body='성공')
posts.patch('/test',ctx=>ctx.body='성공')


module.exports = posts;
