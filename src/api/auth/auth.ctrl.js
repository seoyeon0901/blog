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
      ctx.status = 409;
      return;
    }
    // 존재하지 않는다면?

    const user = new User({
      username,
    });

    await user.setPassword(password); //hashedpassword 생성
    await user.save();

    ctx.body = user.serialize();
  } catch (e) {
    ctx.throm(500, e);
  }
};

const login = async (ctx) => {};

const check = async (ctx) => {};

const logout = async (ctx) => {};

module.exports = { register, login, check, logout };
