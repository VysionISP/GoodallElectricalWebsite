# Enquiry relay server

Small Node/Express service with one job: receive the contact form's POST to
`/api/enquiry` and forward it to Fergus as a new Enquiry, using a Fergus
Personal Access Token (PAT) that lives only on this server.

The PAT must never be:
- committed to the git repo
- sent to the browser
- pasted into a chat/AI session

## Local setup

```
cd server
npm install
./setup.sh   # interactive — prompts for the token, hidden input, writes .env
npm start
```

`setup.sh` never echoes the token to the screen or shell history, and sets
`.env` to `600` permissions (owner read/write only) when it's done. Run it
directly on whichever machine will actually run the server — don't run it
somewhere else and copy `.env` over.

The server listens on port 3001 by default (`PORT` in `.env`).

## Deploying on the Ubuntu VM

1. Copy the `server/` directory to the VM, e.g. `/var/www/goodallelectrical/server`.
2. Install Node 18+ if not already present.
3. `cd server && npm install --omit=dev`
4. Run `./setup.sh` on the VM and paste the real Fergus PAT when prompted — this creates `.env` directly on the machine (never via git).
5. Run it as a systemd service so it restarts on boot/crash. Example unit file
   at `/etc/systemd/system/goodall-enquiry.service`:

   ```ini
   [Unit]
   Description=Goodall Electrical enquiry relay
   After=network.target

   [Service]
   Type=simple
   WorkingDirectory=/var/www/goodallelectrical/server
   EnvironmentFile=/var/www/goodallelectrical/server/.env
   ExecStart=/usr/bin/node index.js
   Restart=on-failure
   User=www-data

   [Install]
   WantedBy=multi-user.target
   ```

   Then:
   ```
   sudo systemctl daemon-reload
   sudo systemctl enable --now goodall-enquiry
   ```

6. Point nginx at it: the site's `deploy/nginx.conf.example` includes a
   `location /api/ { proxy_pass http://127.0.0.1:3001; }` block — copy that
   into the live nginx config so `/api/enquiry` reaches this service while
   everything else keeps serving the static files directly.

## Confirming the Fergus API details are still correct

This was built from the `POST /enquiries` schema in Fergus's own Swagger UI
(`https://api.fergus.com/docs`) and the `PersonalAccessToken` (HTTP Bearer)
auth scheme shown there. If Fergus ever changes either, re-check that page —
the two places to update are `FERGUS_API_BASE_URL` in `.env` and the
`Authorization` header format in `index.js`.

## What gets sent to Fergus

| Contact form field | Fergus field |
|---|---|
| Full Name | `name` |
| Email | `email` |
| Phone | `phoneNumber` |
| Service Required + Job Details | `description` (service is prefixed onto the message, since Fergus's Enquiry schema has no separate service-type field) |
| — | `source`: fixed string `"Website Contact Form"` |

Address fields (`address1`, `addressSuburb`, etc.) are part of the Fergus
schema but aren't collected by the current contact form, so they're omitted.
