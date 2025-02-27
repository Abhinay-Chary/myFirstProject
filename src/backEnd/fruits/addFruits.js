const mongoose= require('mongoose')
const fruitSchema= mongoose.Schema({
    name: String,
    source:String,
    price:Number,
    quantity:Number
})
module.exports= mongoose.model('Fruit',fruitSchema)