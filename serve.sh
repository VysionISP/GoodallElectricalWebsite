#!/bin/bash
# Serve the Goodall Electrical site locally for preview.
# Usage: ./serve.sh [port]   (defaults to 8000)

PORT="${1:-8000}"
cd "$(dirname "$0")" || exit 1

echo "Serving Goodall Electrical site at http://localhost:$PORT"
echo "Press Ctrl+C to stop."

# Open the browser shortly after the server starts (macOS 'open').
( sleep 1 && open "http://localhost:$PORT" ) &

python3 -m http.server "$PORT"
