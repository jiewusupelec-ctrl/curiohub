#!/usr/bin/env bash
# Copyright (C) 2026 Lenovo
# All Rights Reserved.
# Lenovo Confidential Restricted.

set -euo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

REPO_URL="${1:-${GITHUB_REPO_URL:-}}"
if [[ -z "$REPO_URL" ]]; then
  read -r -p "GitHub repository URL (for example https://github.com/name/kids-news-player.git): " REPO_URL
fi
if [[ -z "$REPO_URL" ]]; then
  echo "A GitHub repository URL is required." >&2
  exit 1
fi

if [[ ! -d .git ]]; then
  git init
  git branch -M main
fi

if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REPO_URL"
else
  git remote add origin "$REPO_URL"
fi

git add .
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "Publish kids audio player"
fi

git push -u origin main
echo "Pushed. Enable GitHub Pages with GitHub Actions as the source; the workflow will deploy the site and refresh it twice daily."
