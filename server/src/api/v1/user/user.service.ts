import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { iUser } from './user.model';
import UserSchema from '../../../middlewares/db';

const User: any = UserSchema.User;

async function login({ email, password }: iUser) {
  const user = await User.findOne({ email });
  if (user && bcrypt.compareSync(password, user.hash)) {
    const token = jwt.sign(
      { sub: user.id },
      process.env.SECRET || '12wrty56yu',
      { expiresIn: '1d' },
    );
    return {
      ...user.toJSON(),
      token,
    };
  }
}

async function getById(id: string) {
  return await User.findById(id);
}

async function create(userParam: iUser) {
  // validate
  if (await User.findOne({ email: userParam.email })) {
    throw 'Email "' + userParam.email + '" is already taken';
  }

  let user = new User(userParam);

  // hash password
  if (userParam.password) {
    user['hash'] = bcrypt.hashSync(userParam.password, 10);
  }

  // save user
  await user.save();
}

async function update(id: string, userParam: iUser) {
  const user = await User.findById(id);

  // validate
  if (!user) throw 'User not found';
  if (
    user.email !== userParam.email &&
    (await User.findOne({ email: userParam.email }))
  ) {
    throw 'Email "' + userParam.email + '" is already taken';
  }

  // hash password if it was entered
  if (userParam.password) {
    userParam.hash = bcrypt.hashSync(userParam.password, 10);
  }

  // copy userParam properties to user
  Object.assign(user, userParam);

  await user.save();
}

async function _delete(id: string) {
  await User.findByIdAndRemove(id);
}

export default {
  login,
  getById,
  create,
  update,
  delete: _delete,
};
