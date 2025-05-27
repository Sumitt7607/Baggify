const mongoose=require('mongoose')
const usermodel = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]  // Ensure this is correct
});

module.exports=mongoose.model('user',usermodel)