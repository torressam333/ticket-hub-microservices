import mongoose from 'mongoose';

// Interface to describe properties required for new User
interface UserAttrs {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

// Way to implement TS interface with mongoose model
const buildNewUser = (attrs: UserAttrs) => {
  return new User(attrs);
};

export { User };
