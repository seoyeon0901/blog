const Router = require('koa-router');
const auth = require('./auth');
const posts = require('./posts/posts')


const api = new Router();

api.use('/posts',posts.routes())
api.use('/auth', auth.routes())
module.exports = api;
