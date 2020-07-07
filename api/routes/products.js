const express = require('express')

const router = express.Router()

const multer = require('multer')

const checkAuth = require('../middleware/check-auth')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const upload = multer({ storage: storage })

const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Product.find()
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.post('/', checkAuth, upload.single('productImage'), (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        price: req.body.price,
        productImage: req.file.path
    })
    product.save()
        .then(result => {
            console.log(result)
            res.status(200).json({
                msg: 'Product Created',
                createdProduct: result
            })
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.findById(id)
        .then(result => {
            console.log(result)
            res.status(200).json(result)
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

router.delete('/:productId', checkAuth, (req, res, next) => {
    const id = req.params.productId
    Product.deleteOne({ _id: id })
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router