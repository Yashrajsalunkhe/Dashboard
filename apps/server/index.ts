import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import signup from './routes/signup';
import signin from './routes/signin';
import { getUser, updateUser, deleteUser } from './routes/user';
import createDoctorProfile, { getDoctor, updateDoctor, deleteDoctor } from './routes/doctorn';
import { createPatient, getPatient, updatePatient, deletePatient } from './routes/patient';
import { createAppointment, getAppointment, updateAppointment, deleteAppointment } from './routes/appointment';
import { createBill, getBill, updateBill, deleteBill } from './routes/bill';
import { createReminder, getReminder, updateReminder, deleteReminder } from './routes/reminder';
import { sendReminder } from './routes/notifications';
import { requireRole } from './routes/authMiddleware';
import { exportJSON, exportCSV } from './routes/export';

const app = express();

app.use(cors());
app.use(express.json())

app.post("/signup", signup);
app.post("/signin", signin)
app.get("/user", getUser);
app.put("/user/:id", updateUser);
app.delete("/user/:id", deleteUser);
app.post("/doctor", createDoctorProfile);
app.get("/doctor", getDoctor);
app.put("/doctor/:id", updateDoctor);
app.delete("/doctor/:id", deleteDoctor);
app.post("/patient", createPatient);
app.get("/patient", getPatient);
app.put("/patient/:id", updatePatient);
app.delete("/patient/:id", deletePatient);
app.post("/appointment", createAppointment);
app.get("/appointment", getAppointment);
app.put("/appointment/:id", updateAppointment);
app.delete("/appointment/:id", deleteAppointment);
app.post("/bill", createBill);
app.get("/bill", getBill);
app.put("/bill/:id", updateBill);
app.delete("/bill/:id", deleteBill);
app.post("/reminder", createReminder);
app.get("/reminder", getReminder);
app.put("/reminder/:id", updateReminder);
app.delete("/reminder/:id", deleteReminder);
app.post("/send-reminder", sendReminder);
app.get("/export/json", requireRole(['ADMIN']), exportJSON);
app.get("/export/csv", requireRole(['ADMIN']), exportCSV);

app.listen(3000);