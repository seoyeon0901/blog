require('dotenv').config();
//
const Koa = require('koa');
const Router = require('koa-router');
const api = require('./api');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const createFakeData = require('./createFakeData');
//
const app = new Koa();
const router = new Router();
const { PORT, MONGO_URI } = process.env;
//
mongoose.connect(MONGO_URI).then(() => {
  console.log('mongodb 성공');
  createFakeData();
}).catch(e => console.error(e));
//
app.use(bodyParser());
router.use('/api', api.routes());
//
app.use(router.routes()).use(router.allowedMethods());
//
const port = PORT || 4000;
app.listen(port, () => {
  console.log('성공');
});
