// server/src/routes/driver.ts
import express from 'express'
import Driver from '../models/driverModel'
//import { log } from 'console'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const {
      driverLicense,
      phoneNumber,
      firstName,
      lastName,
      email,
      pfp,
      taxiNumber,
    } = req.body

    const newDriver = new Driver({
      driverLicense,
      phoneNumber,
      firstName,
      lastName,
      email,
      pfp,
      taxiNumber,
    })
    console.log('📩 Received POST /register with body:', req.body)


    await newDriver.save()

    res.status(201).json({ message: 'Driver registered successfully' })
  } catch (err) {
    console.error('❌ Registration Error:', err)
    res.status(500).json({ error: 'Failed to register driver' })
  }
})

export default router
