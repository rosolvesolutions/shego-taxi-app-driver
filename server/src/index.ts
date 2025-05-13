import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'

import connectDB from './config/db'
import driverRoutes from './routes/driverRoute'
import visionRoutes from './routes/visionRoute' // 👈 新加的

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const app = express()
const PORT = process.env.EXPRESS_SERVER_PORT || 5001

app.use(cors({ origin: '*' })) 
app.use(express.json()) 

connectDB() 

// Test endpoint
app.get('/api/value', (req, res) => {
  res.json({ value: 'Express Server Status: WORKING!' })
})

// Driver registration routes
app.use('/api/driver', driverRoutes)

// Vision OCR routes 👇
app.use('/api/vision', visionRoutes)

app.listen(PORT, () => {
  console.log(`✅ Server running at ${process.env.EXPRESS_SERVER_IP}:${PORT}`)
})
