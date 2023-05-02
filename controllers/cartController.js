//import cart collection
const cartitems = require('../models/cartSchema')

//add to cart
exports.addtocart = async (req,res)=>{
    //get product details from req
    const {id,title,image,price,quantity} = req.body

    //logic
    try{
        //check product is in cart collection
        const product = await cartitems.findOne({id})

        if(product){
            //product is in cart
            //increment product quantity
            product.quantity+=1
            //update granttotal
            product.grantTotal = product.price *product.quantity
            //to save changes in mongodb
            product.save()
            //send response to client
            res.status(200).json("Items added to your cart...")
        }
        else{
           //product is not in cart 
           //add product to cart
           const newProduct = new cartitems({
            id,title,price,image,quantity,grantTotal:price
           })
           //save new product to mongodb
           await newProduct.save()
           //send response to client
           res.status(200).json("Item added to your cart...")
        }

    }
    catch(error){
        res.status(401).json(error)
    }
}

//get cart
exports.getCart = async (req,res)=>{
    try{
        //get all items from cart collection
        const allItems = await cartitems.find()
        res.status(200).json(allItems)
    }
    catch(error){
        res.status(401).json(error)
    }
}

//removecartitem
exports.removecartitem = async (req,res)=>{
    //get product id from req
    const {id} = req.params

    try{
        //remove product with given id from cart collection
    const removeitem = await cartitems.deleteOne({id})
    if(removeitem){
        //get all cart collection item after removing the particular item
        const allItems = await cartitems.find()
        res.status(200).json(allItems)
    }
    else{
        res.status(404).json("Item not present in your cart")
    }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//emptycart
exports.emptycart = async (req,res)=>{
    try{
        await cartitems.deleteMany({})
        res.status(200).json("Your cart is Empty Now!!!!")
    }
    catch(error){
        res.status(401).json(error)
    }
}

//incrementquantity
exports.incrementCount = async (req,res)=>{
    //get product id from req
    const {id} = req.params
    try{
        //check product is in cart collection
        const product = await cartitems.findOne({id})
        if(product){
            //update quantity , grantTotal
            product.quantity+=1
            product.grantTotal= product.price*product.quantity
            //to save changes in mongodb
            await product.save()
            //get all cart collection item after update the particular item count
            const allItems = await cartitems.find()
            res.status(200).json(allItems)

        }
        else{
            res.status(404).json("Product is not in your cart...")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

//decrementcartquantity
exports.decrementCartQuantity = async (req,res)=>{
     //get product id from req
     const {id} = req.params
     try{
         //check product is in cart collection
         const product = await cartitems.findOne({id})
         if(product){
             //update quantity 
             product.quantity-=1
             //check quantity = 0
             if(product.quantity==0){
                //remove product from cart collection
                await cartitems.deleteOne({id})
                //get all cart collection item after removing the particular item 
                const allItems = await cartitems.find()
                res.status(200).json(allItems)
             }
             else{
                product.grantTotal= product.price*product.quantity
             //to save changes in mongodb
             await product.save()
             //get all cart collection item after update the particular item count
             const allItems = await cartitems.find()
             res.status(200).json(allItems)
             }
             
 
         }
         else{
             res.status(404).json("Product is not in your cart...")
         }
     }
     catch(error){
         res.status(401).json(error)
     }
}