//To define routes for client request, create routes folder and router.js file

//import express
const express = require('express')
//import product controller
const productController = require('../controllers/productController')

//import wishlist controller
const wishlistController = require('../controllers/wishlistController');

//import cartController
const cartController = require('../controllers/cartController');

//using express create object for Router class inorder to setup path
const router = new express.Router()


//resolve client request in various server routes

//api
//get-all products
router.get('/products/all-products',productController.getallproducts)
//view-product/id
router.get('/products/view-product/:id',productController.viewproduct)
//add-to-wishlist
router.post('/wishlist/add-product',wishlistController.addtowishlist)
//get-wishlist-items
router.get('/wishlist/get-items',wishlistController.getwishlistItems)
//remove-wishlist-item
router.delete('/wishlist/remove-item/:id',wishlistController.removefromwishlist)
//addto cart
router.post('/cart/add-product',cartController.addtocart)
//get-cart
router.get('/cart/all-products',cartController.getCart)
//remove-cart-item
router.delete('/cart/remove-item/:id',cartController.removecartitem)
//emptycart
router.delete('/cart/remove-all-items',cartController.emptycart)
//incCartCount
router.get('/cart/increment-item/:id',cartController.incrementCount)
//deccartCount
router.get('/cart/decrement-item/:id',cartController.decrementCartQuantity)

//export router
module.exports = router

