const mongoose = require('mongoose')
const dotenv = require('dotenv')
const products = require('./data/products')
const Product = require('./models/Product')
const connectDB = require('./config/db.js')

dotenv.config()
connectDB()
 
const importData = async () => {
    try {
        await Product.deleteMany()
 
        const sampleProducts = products.map(product => {
            return { ...product }
        })
 
        await Product.insertMany(sampleProducts)
        console.log('Data Imported!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}
 
const destroyData = async () => {
    try {
        await Product.deleteMany()

        console.log('Data Destroyed!')
        process.exit()
    } catch (error) {
        console.error(`${error}`)
        process.exit(1)
    }
}
 
if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
