const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
      minlength: 5,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true },
);

// custom validators
UserSchema.path('email').validate(v => {
  return validator.isEmail(v);
});

// authenticate a user
UserSchema.statics.authenticate = async (email, password) => {
  const user = await this.find({ email })
    .limit(1)
    .lean();
  if (user.length === 0) return Promise.reject(new Error(`Email not found.`));
  const match = await bcrypt.compare(password, user[0].password);
  if (match) return user[0];
  return Promise.reject(new Error(`Invalid Password.`));
};

// hash the password before saving a new user
// generate jwt token as api key before saving
UserSchema.pre('save', async () => {
  try {
    this.password = await bcrypt.hash(this.password, 10);
    this._id = await mongoose.Types.ObjectId();
    this.apiKey = await jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  } catch (e) {
    console.log(e);
  }
});

module.exports = mongoose.model('User', UserSchema);
