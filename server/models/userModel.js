const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {type: String , required: true},
    email: {type: String , required: true},
    password: {type: String , required: true},
    savedJobs: [{type: mongoose.Schema.Types.ObjectId, ref: "Job"}],
    isAdmin: {type: Boolean , default: false},

},
    {
        timestamps : true,
    }
)

// Password hashing before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if changed
  console.log('Hashing password before save');
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Password comparison method
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('User' , userSchema)