#!/usr/bin/env bash
# One-time interactive setup for the enquiry relay server.
# Run this directly on the Ubuntu VM (not on your own machine, not in git).
# It prompts for the Fergus Personal Access Token and writes server/.env —
# the token is never echoed to the screen and never leaves this machine.

set -euo pipefail
cd "$(dirname "$0")"

ENV_FILE=".env"

if [ -f "$ENV_FILE" ]; then
  read -r -p "$ENV_FILE already exists. Overwrite it? [y/N] " confirm
  if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo "Aborted. Existing $ENV_FILE left untouched."
    exit 0
  fi
fi

echo "Paste the Fergus Personal Access Token (input is hidden, press Enter when done):"
read -r -s FERGUS_PAT
echo

if [ -z "$FERGUS_PAT" ]; then
  echo "No token entered — aborting."
  exit 1
fi

read -r -p "Fergus API base URL [https://api.fergus.com]: " API_BASE
API_BASE="${API_BASE:-https://api.fergus.com}"

read -r -p "Port for this service [3001]: " PORT
PORT="${PORT:-3001}"

cat > "$ENV_FILE" <<EOF
FERGUS_PAT=$FERGUS_PAT
FERGUS_API_BASE_URL=$API_BASE
PORT=$PORT
EOF

chmod 600 "$ENV_FILE"

echo
echo "Wrote $ENV_FILE (permissions set to 600, owner-read/write only)."
echo
echo "Next steps:"
echo "  npm install --omit=dev"
echo "  npm start          # test it directly, or"
echo "  sudo systemctl daemon-reload && sudo systemctl enable --now goodall-enquiry"
echo "  (see README.md for the systemd unit file and nginx/apache proxy config)"
