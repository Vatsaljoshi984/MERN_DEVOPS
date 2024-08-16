const mongoose = require('mongoose');
const { Schema } = mongoose;

const brandSchema = new Schema({
    value: { type: String, required: true, unique: true },
    label: { type: String, required: true, unique: true },
    image: { type: String, default: "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Clipart.png" },
    checked: { type: Boolean, default: false },
})

const virtual = brandSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
brandSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.Brand = mongoose.model('Brand', brandSchema)