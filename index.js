import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from "cookie-parser"
import cors from 'cors'
import connectDB from './database/connexion.js'

import Importer from './routes/Importer.js'
import Seller from './routes/Seller.js'
import Transporter from './routes/Transporter.js'

const app = express()

// Midlwares
app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json({ limit : "30mb", extended : true}))
app.use(bodyParser.urlencoded({ limit : "30mb", extended : true}))
app.use(cors())

app.use('/importers',Importer)
app.use('/sellers',Seller)
app.use('/transporters',Transporter)

// mongodb connection
connectDB();

app.listen(5000)