<<<<<<< HEAD
# JunkLife
=======
# JunkLife

JunkLife is a full-stack scrap management platform for `junklife.in`, built with React, Vite, Tailwind CSS, Node.js, Express, MongoDB, and JWT authentication. It supports customer bookings, admin operations, dynamic scrap rates, blogs, contact management, Razorpay payouts, and production-friendly project organization.

## Features

- JWT auth with `admin` and `customer` roles
- Scrap rate catalog with admin-managed pricing
- Pickup scheduling and booking status tracking
- Simulated Razorpay payout flow after pickup confirmation
- Blog and contact CMS-style management
- Admin analytics dashboard
- Nodemailer email hooks
- Cloudinary-ready image uploads
- Google Maps address autofill-ready UI hook
- Modular backend architecture with validation and role guards

## Project Structure

```text
JunkLife/
  client/   # React + Vite + Tailwind frontend
  server/   # Express + MongoDB REST API
```

## Quick Start

1. Install dependencies:

```bash
npm install
npm install --prefix server
npm install --prefix client
```

2. Create environment files:

```bash
copy .env.example .env
copy .env.example server/.env
copy client/.env.example client/.env
```

3. Update the values in `.env`, `server/.env`, and `client/.env`.

4. Start the app in development:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and backend runs on `http://localhost:5000`.

## Seed Admin User

Run the seed script after MongoDB is available:

```bash
npm run seed
```

Default seeded admin credentials:

- Email: `admin@junklife.in`
- Password: `Admin@123`

## Build For Production

```bash
npm run build
npm run start
```

## API Documentation

The detailed API reference lives in `server/API_DOCUMENTATION.md`.

## Deployment Notes

- Use a managed MongoDB cluster such as MongoDB Atlas.
- Keep JWT, Razorpay, Cloudinary, and SMTP secrets in environment variables only.
- Add HTTPS and secure cookies or token storage safeguards in production.
- Restrict CORS to your deployed frontend origin.
- Set up Razorpay webhooks if you want to move from simulated payouts to webhook-confirmed transfers.
>>>>>>> 084f682 (Initial JunkLife full-stack app)
