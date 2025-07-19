# Dental Clinic Management Backend

This is the backend API for the Dental Clinic Management System. It provides all server-side logic, database access, authentication, and role-based access control for managing patients, appointments, billing, reminders, and users.

---

## Features

- **User Authentication:** Signup/signin with Supabase Auth, role support (Admin, Dentist, Receptionist, etc.)
- **Patient Management:** CRUD for patient records
- **Appointment Management:** CRUD for appointments
- **Billing:** CRUD for bills, mark as paid/unpaid
- **Reminders:** CRUD for reminders, mock notification sending (WhatsApp/email)
- **Role-Based Access:** Middleware to restrict sensitive endpoints (e.g., export) to Admins
- **Manual Backup:** Export all data as JSON or CSV (Admin only)

---

## Getting Started

### 1. Install Dependencies

```bash
pnpm install
# or
bun install
```

### 2. Set Up Environment

- Copy `.env.example` to `.env` and fill in your Supabase credentials and database URL.

### 3. Database Setup

```bash
pnpm db:generate
pnpm db:push
# or
bun run db:generate
dbun run db:push
```

### 4. Run the Server

```bash
pnpm dev
# or
bun run index.ts
```

The server will start on `http://localhost:3000` by default.

---

## API Endpoints

### **Authentication**
- `POST /signup` — Register a new user
- `POST /signin` — Login

### **User**
- `GET /user?id=...` or `/user?email=...`
- `PUT /user/:id`
- `DELETE /user/:id`

### **Doctor**
- `POST /doctor`
- `GET /doctor?id=...` or `/doctor?userId=...`
- `PUT /doctor/:id`
- `DELETE /doctor/:id`

### **Patient**
- `POST /patient`
- `GET /patient?id=...` or `/patient`
- `PUT /patient/:id`
- `DELETE /patient/:id`

### **Appointment**
- `POST /appointment`
- `GET /appointment?id=...` or `/appointment`
- `PUT /appointment/:id`
- `DELETE /appointment/:id`

### **Bill**
- `POST /bill`
- `GET /bill?id=...` or `/bill`
- `PUT /bill/:id`
- `DELETE /bill/:id`

### **Reminder**
- `POST /reminder`
- `GET /reminder?id=...` or `/reminder`
- `PUT /reminder/:id`
- `DELETE /reminder/:id`

### **Notifications**
- `POST /send-reminder` — Mock WhatsApp/email reminder

### **Manual Backup (Admin Only)**
- `GET /export/json` — Export all data as JSON
- `GET /export/csv` — Export patient data as CSV
- Requires `x-user-id` header of an Admin user

---

## Role-Based Access

- Use the `x-user-id` header for protected endpoints (e.g., export)
- Only Admins can access export endpoints

---

## Notes
- This backend is designed for local/offline-first use, but can be extended for cloud sync.
- Notification sending is mocked for development/testing.
- For production, integrate real notification APIs (e.g., Twilio, EmailJS).

---

## License
MIT
