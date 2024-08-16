const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique:true},
    password: { type: Buffer, required: true },
    role:{type:String, default:"user"},
    addresses:{type:[Schema.Types.Mixed],default:[]},
    name:{type:String,default:"New User"},
    image:{type:String,default:"https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png"},
    salt:Buffer
})

const virtual = userSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){delete ret._id}
})

exports.User = mongoose.model('User',userSchema)