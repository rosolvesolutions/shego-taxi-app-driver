// server/src/routes/driver.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Driver from '../models/driverModel';

const router = express.Router();

/**
 * Register a new driver
 */
// @ts-expect-error

router.post('/register', async (req: Request, res: Response) => {
  try {
    const {
      driverLicense,
      phoneNumber,
      firstName,
      lastName,
      email,
      pfp,
      taxiNumber,
      isAvailable,
      password,
    } = req.body;

    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDriver = new Driver({
      driverLicense,
      phoneNumber,
      firstName,
      lastName,
      email,
      pfp,
      taxiNumber,
      isAvailable,
      password: hashedPassword,
    });

    await newDriver.save();
    res.status(201).json({ message: 'Driver registered successfully' });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: 'Failed to register driver' });
  }
});

/**
 * Update driver availability
 */
// @ts-expect-error

router.put('/:id/availability', async (req: Request, res: Response) => {
  try {
    const { isAvailable } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Driver ID is required' });
    }

    const driver = await Driver.findByIdAndUpdate(
      id,
      { isAvailable },
      { new: true }
    );

    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.status(200).json(driver);
  } catch (error) {
    console.error('❌ Error updating availability:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Login driver by email and password
 */
// @ts-expect-error

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Email and password are required.' });
    }

    const driver = await Driver.findOne({ email });

    if (!driver) {
      return res.status(404).json({ success: false, error: 'Account not found.' });
    }
    // @ts-expect-error

    const isMatch = await bcrypt.compare(password, driver.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Incorrect password.' });
    }

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;
