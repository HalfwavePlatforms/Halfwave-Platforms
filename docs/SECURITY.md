# Halfwave Platforms - Security Policy & Secret Remediation

## 1. Secret Exposure & Remediation Guide

If `.env` was previously pushed to a Git remote (e.g., GitHub), follow these critical remediation steps immediately:

### Step 1: Untrack from Git (Completed Locally)
`.env` has been removed from Git tracking and added to `.gitignore`. Check with:
```bash
git status
```

### Step 2: Key & Secret Rotation Checklist
Any credentials that were present in a pushed `.env` file should be rotated:

1. **Database Password**:
   - Change your PostgreSQL user password in your database management console.
   - Update `DATABASE_URL` in your local `.env`.
2. **JWT Secret Keys**:
   - Generate new cryptographic secrets:
     ```bash
     node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"
     ```
   - Update `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` in `.env`.
3. **Resend / Email API Key**:
   - Log into [Resend Dashboard](https://resend.com), revoke the old API key, and create a new one.
4. **Cloudinary Keys**:
   - In the Cloudinary Management Console, rotate your API Secret.

### Step 3: Git History Cleansing (Optional for Public Repos)
To remove the secret from past Git commit history completely, use **git-filter-repo** or **BFG Repo-Cleaner**:
```bash
# Using BFG
bfg --delete-files .env
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force
```

---

## 2. Environment Variables Standard

- **Never** commit `.env` or files containing plain-text keys (`.pem`, `.key`, `*.env`).
- Always commit `.env.example` templates with sanitized dummy values.
- In production, inject secrets via environment variables (AWS ECS, Docker Secrets, Render, Vercel, Railway).
