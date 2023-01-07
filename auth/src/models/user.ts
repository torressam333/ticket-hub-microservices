import mongoose from 'mongoose';

// Interface to describe attributes required for a new individual User
interface UserAttrs {
  email: string;
  password: string;
}

// Interface to descrive props/shape of the entire User Model Collection
// Along with any addtional methods the User model should have
interface UserModel extends mongoose.Model<UserDoc> {
  // must return instance of UserDoc
  build(attrs: UserAttrs): UserDoc;
}

// Interface to descrive properties that the User Document has
// Inherit from mongoose base Document class + extra custom props to add
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  // Any additional properties go here
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
// Now we can call: User.build({}) since custom fn was added to statics list
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

// Init user model w/ interfaces implemented. (<Collectionname>, <CollectionSchema>)
const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
