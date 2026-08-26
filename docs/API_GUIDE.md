# Halfwave Platforms - API Documentation Guide

## 1. Overview
The Halfwave API is built on **NestJS 11** with global prefix `/api` and versioning `/v1`.

- **Base URL (Local)**: `http://localhost:3000/api/v1`
- **Swagger Documentation**: [`http://localhost:3000/api/v1/docs`](http://localhost:3000/api/v1/docs)

---

## 2. Core Endpoints

### Contacts (`/api/v1/contacts`)
- `POST /api/v1/contacts`: Public contact enquiry submission.
  ```json
  {
    "name": "Alice Smith",
    "email": "alice@example.com",
    "phone": "+1-555-0199",
    "company": "Acme Corp",
    "serviceInterested": "Web Development",
    "budget": "$10,000 - $25,000",
    "message": "Looking to build a high-performance web platform."
  }
  ```
- `GET /api/v1/contacts/admin`: List all inquiries (Admin only).
- `PATCH /api/v1/contacts/admin/:id/status`: Update status (new, contacted, in_progress, completed, closed).

### Services (`/api/v1/services`)
- `GET /api/v1/services`: List all active public services.
- `POST /api/v1/services/admin`: Create a new service offering (Admin only).
- `PATCH /api/v1/services/admin/reorder`: Atomically reorder service display indices.

### Users & Authentication (`/api/v1/users`, `/api/v1/roles`, `/api/v1/permissions`)
- User management, password resets, role-based permission assignments.
