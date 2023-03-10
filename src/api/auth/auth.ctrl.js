const Joi = require('joi');
const User = require('../../models/user');

const register = async (ctx) => {
  const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }

  // 유효성 검증을 통과했다면?

  const { username, password } = ctx.request.body;

  try {
    const exists = await User.findByUsername(username);
    if (exists) {
      // 이미 존재하는 username
      ctx.status = 409;
      return;
    }

    // 존재하지 않는다면? > User 모델로 인스턴스 생성
    const user = new User({
      username,
    });

    await user.setPassword(password); //hashedpassword 생성
    await user.save();

    ctx.body = user.serialize(); // body에는 serialize를 통해 hashedpassword 삭제

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throm(500, e);
  }
};

const login = async (ctx) => {
  const { username, password } = ctx.request.body; //body로 보낸 아디와 비번
  if (!username || !password) {
    ctx.status = 401;
    return;
  }

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      ctx.status = 401;
      return;
    }

    const valid = await user.checkPassword(password);

    if (!valid) {
      ctx.status = 401;
      return;
    }

    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

const check = async (ctx) => {
  const {user} = ctx.state
  if(!user){ // 로그인 중이 아님
    ctx.status = 401;
    return;
  }
  ctx.body = user
};

const logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204
};

module.exports = { register, login, check, logout };
