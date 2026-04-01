# JunkLife API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### `POST /auth/register`
Register a new customer.

### `POST /auth/login`
Login with email and password.

## Scrap Rates

### `GET /scrap-rates`
Public endpoint to fetch all scrap prices.

### `POST /scrap-rates`
Admin only. Create a rate.

### `PUT /scrap-rates/:id`
Admin only. Update a rate.

### `DELETE /scrap-rates/:id`
Admin only. Delete a rate.

## Bookings

### `POST /bookings`
Authenticated customer creates a pickup booking.

### `GET /bookings/my`
Customer sees their own bookings.

### `GET /bookings`
Admin sees all bookings.

### `PATCH /bookings/:id/status`
Admin updates booking status.

## Payments

### `POST /payments/create-order`
Authenticated user creates a Razorpay order for estimated payout tracking.

### `POST /payments/confirm`
Confirms a payout completion for a booking.

## Blogs

### `GET /blogs`
Public list of blogs.

### `GET /blogs/:slug`
Public blog detail.

### `POST /blogs`
Admin creates a blog.

### `PUT /blogs/:id`
Admin updates a blog.

### `DELETE /blogs/:id`
Admin deletes a blog.

## Contacts

### `POST /contacts`
Public contact form submission.

### `GET /contacts`
Admin-only contact query list.

## Users

### `GET /users`
Admin-only user listing endpoint.

## Analytics

### `GET /analytics/overview`
Admin-only summary statistics for dashboard cards and charts.
