import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  app.use(express.json());
  app.use(express.static(path.resolve(process.cwd(), 'public')));

  const appointmentsFilePath = path.resolve(process.cwd(), 'appointments.json');

  const readAppointments = () => {
    try {
      if (fs.existsSync(appointmentsFilePath)) {
        const data = fs.readFileSync(appointmentsFilePath, 'utf-8');
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading appointments file:', e);
    }
    return [];
  };

  const saveAppointments = (appointments: any[]) => {
    try {
      fs.writeFileSync(appointmentsFilePath, JSON.stringify(appointments, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error writing appointments file:', e);
    }
  };

  // POST /api/appointments: Register an appointment request
  app.post('/api/appointments', (req, res) => {
    const { fullName, phoneNumber, department, preferredDoctor, preferredDate, preferredTime } = req.body;

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({ error: 'Full name is required.' });
    }
    if (fullName.trim().length < 2) {
      return res.status(400).json({ error: 'Please enter a valid full name.' });
    }

    if (!phoneNumber || typeof phoneNumber !== 'string' || !phoneNumber.trim()) {
      return res.status(400).json({ error: 'Phone number is required.' });
    }

    // Clean phone number (strip spaces, dashes, parentheses)
    const cleanPhone = phoneNumber.replace(/[\s\-()]/g, '');
    const indianPhoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    if (!indianPhoneRegex.test(cleanPhone)) {
      return res.status(400).json({
        error: 'Please enter a valid 10-digit mobile number (e.g. 9876543210 or +91 98765 43210).'
      });
    }

    if (!department || typeof department !== 'string' || !department.trim()) {
      return res.status(400).json({ error: 'Department / specialty selection is required.' });
    }

    if (!preferredDate || typeof preferredDate !== 'string') {
      return res.status(400).json({ error: 'Preferred appointment date is required.' });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    if (preferredDate < todayStr) {
      return res.status(400).json({ error: 'Appointment date cannot be in the past.' });
    }

    const appointmentId = `MMH-${Math.floor(100000 + Math.random() * 900000)}`;

    const newAppointment = {
      id: appointmentId,
      fullName: fullName.trim(),
      phoneNumber: cleanPhone,
      department: department.trim(),
      preferredDoctor: preferredDoctor && preferredDoctor !== 'No preference' ? preferredDoctor.trim() : 'No preference',
      preferredDate,
      preferredTime: preferredTime && preferredTime.trim() ? preferredTime.trim() : 'Any time',
      status: 'Pending Phone Confirmation',
      createdAt: new Date().toISOString(),
      notes: 'Our hospital coordination desk will verify and confirm via phone call.'
    };

    const currentAppointments = readAppointments();
    currentAppointments.unshift(newAppointment);
    saveAppointments(currentAppointments);

    return res.status(201).json({
      success: true,
      message: 'Appointment request received and queued for phone confirmation.',
      appointment: newAppointment
    });
  });

  // GET /api/appointments: List appointments
  app.get('/api/appointments', (req, res) => {
    const appointments = readAppointments();
    res.json({ success: true, count: appointments.length, appointments });
  });

  const contactMessagesFilePath = path.resolve(process.cwd(), 'contact_messages.json');

  const readContactMessages = () => {
    try {
      if (fs.existsSync(contactMessagesFilePath)) {
        const data = fs.readFileSync(contactMessagesFilePath, 'utf-8');
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Error reading contact messages file:', e);
    }
    return [];
  };

  const saveContactMessages = (messages: any[]) => {
    try {
      fs.writeFileSync(contactMessagesFilePath, JSON.stringify(messages, null, 2), 'utf-8');
    } catch (e) {
      console.error('Error writing contact messages file:', e);
    }
  };

  // POST /api/contact: Submit contact enquiry
  app.post('/api/contact', (req, res) => {
    const { fullName, phone, email, subject, message } = req.body;

    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return res.status(400).json({ error: 'Full name is required.' });
    }
    if (fullName.trim().length < 2) {
      return res.status(400).json({ error: 'Please enter a valid full name.' });
    }

    if (!phone || typeof phone !== 'string' || !phone.trim()) {
      return res.status(400).json({ error: 'Phone number is required.' });
    }

    const cleanPhone = phone.replace(/[\s\-()]/g, '');
    const phoneRegex = /^(?:\+91|0)?[6-9]\d{9}$/;
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({
        error: 'Please enter a valid 10-digit mobile number (e.g. 9876543210).'
      });
    }

    if (email && typeof email === 'string' && email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        return res.status(400).json({ error: 'Please enter a valid email address.' });
      }
    }

    if (!subject || typeof subject !== 'string' || !subject.trim() || subject === 'Select a subject') {
      return res.status(400).json({ error: 'Please select a valid subject for your enquiry.' });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return res.status(400).json({ error: 'Message must be at least 10 characters long.' });
    }

    const messageId = `MSG-${Math.floor(100000 + Math.random() * 900000)}`;
    const newEnquiry = {
      id: messageId,
      fullName: fullName.trim(),
      phone: cleanPhone,
      email: email ? email.trim() : null,
      subject: subject.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
      status: 'Received - Reception Follow-up Required'
    };

    const messages = readContactMessages();
    messages.unshift(newEnquiry);
    saveContactMessages(messages);

    return res.status(201).json({
      success: true,
      messageId,
      message: 'Your message has been received. Our reception team will reach out to you shortly.',
      enquiry: newEnquiry
    });
  });

  // GET /api/contact: List contact messages
  app.get('/api/contact', (req, res) => {
    const messages = readContactMessages();
    res.json({ success: true, count: messages.length, messages });
  });

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Serve static files in production or Vite middleware in dev
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.cwd(), 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
