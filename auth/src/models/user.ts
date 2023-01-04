import mongoose from 'mongoose';

// Interface to describe properties required for new User
interface UserAttrs {
  email: string;
  password: string;
}

// Interface to descrive props fir User Model
interface UserModel extends mongoose.Model<any> {
  build(attrs: UserAttrs): any;
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

// Way to implement TS interface with mongoose model via custom function
// Now we can call: User.build({})
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<any, UserModel>('User', userSchema);

export { User };
