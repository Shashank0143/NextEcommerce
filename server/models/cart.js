const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    productTitle:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    subTotal:{
        type:Number,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
        productId:{
        type:String,
        required:true
    },
    countInStock:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    size: {
        type: String, // Assuming size is a string, can change it based on your use case
        default: null, // Default value in case no size is provided
        required: false,
    },
    // Optionally, you can also add customMeasurements if needed
    customMeasurements: {
        type: Object, // Can be an object to store multiple measurement values
        default: null,
        required: false,
    }
})

cartSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

cartSchema.set('toJSON', {
    virtuals: true,
});

exports.Cart = mongoose.model('Cart', cartSchema);
exports.cartSchema = cartSchema;
