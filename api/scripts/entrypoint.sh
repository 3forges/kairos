#! /usr/bin/env bash

set -e
set -x

# ---
# And start the API
# CMD ["fastapi", "run", "--workers", "4", "app/main.py"]

fastapi run --workers 4 app/main.py
