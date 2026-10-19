# Digital Vault Demo (frontend phase)

A DigiLocker-inspired document wallet built for a college project. It is NOT an official service, it is not affiliated with any government body, and all users and documents are fictional and unverified. Never enter real Aadhaar numbers, OTPs or government credentials.

## Folder structure
```
digital-vault-demo/
  index.html            Landing page
  login.html            User sign in          register.html   Create account
  dashboard.html        User dashboard        issued.html     Sample issued documents
  uploaded.html         Uploads + upload form search.html     Search and categories
  document.html         Details, preview, download, rename, delete
  profile.html          Profile and settings  notifications.html  Notifications + activity history
  help.html             FAQ, support email, contact form
  get-documents.html    Fetch sample documents from fictional issuers
  shares.html           Share links with expiry and revoke
  verify.html           Check a sample document number / open a share link
  admin-login.html      Administrator sign in
  admin-dashboard.html  Statistics            admin-users.html   User management
  admin-documents.html  Metadata management   admin-logs.html    Logs, reports, CSV export
  css/styles.css        All styling (blue and white theme, responsive)
  js/data.js            Sample data + storage layer (the part the backend will replace)
  js/app.js             Navigation, rendering, validation, demo interactions
```

## Run it in VS Code
1. Install VS Code and open this folder (File > Open Folder).
2. Install the "Live Server" extension (by Ritwick Dey).
3. Right-click `index.html` and choose "Open with Live Server".
4. Without Live Server, run `python -m http.server 5500` in the folder and open http://localhost:5500.

## Demo sign-in
- User: `asha.demo@example.test` with any password of 8+ characters (passwords are not stored or checked in the demo).
- Admin: `admin@example.test` with any password of 8+ characters, from `admin-login.html`.
- Or create your own account on the register page. Use the "Reset demo data" button on the profile page to start over.

## Preparing for Spring Boot + MySQL
- Every data call goes through the `DV` object in `js/data.js`. Replace each method with `fetch()` to a REST endpoint:
  `GET/POST /api/documents`, `GET/PUT/DELETE /api/documents/{id}`, `GET /api/documents/{id}/download`, `GET/PUT /api/me`, `GET /api/notifications`, `GET /api/activity`, `POST /api/shares`, `DELETE /api/shares/{id}`, `GET /api/verify?number=`, `POST /api/documents/fetch`, `POST /api/auth/login`, `POST /api/auth/register`, and under `/api/admin/**`: `users`, `documents`, `logs`.
- Suggested MySQL tables: `users` (id, name, email, password_hash, role, status, created_at), `documents` (id, owner_id, kind, category, title, issuer, number, status, file_path, size_bytes, created_at), `notifications` (id, user_id, text, is_read, created_at), `activity_logs` (id, user_email, action, detail, type, created_at).
- Authentication: use Spring Security with BCrypt password hashes and an HttpOnly session cookie or JWT. Remove the `sessionStorage` login in `DV.login`.
- Administrator access: the `data-guard` attribute and the sign-in check only hide pages in the browser and are NOT security. Protect `/api/admin/**` with `hasRole('ADMIN')` on the server and check document ownership on every request.
- File uploads: validate type and size on the server, store files outside the web root, and never trust the file name.
