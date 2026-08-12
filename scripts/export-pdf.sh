#!/usr/bin/env bash
set -euo pipefail

repo_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
windows_pdf='C:\Users\iamyu\AppData\Local\Temp\Yuga-Chang-Resume.pdf'
windows_html="file:///$(wslpath -m "$repo_dir/index.html")"

rm -f /mnt/c/Users/iamyu/AppData/Local/Temp/Yuga-Chang-Resume.pdf
powershell.exe -NoProfile -Command \
  "& 'C:\Program Files\Google\Chrome\Application\chrome.exe' --headless --disable-gpu --no-pdf-header-footer --print-to-pdf='$windows_pdf' '$windows_html'"
cp /mnt/c/Users/iamyu/AppData/Local/Temp/Yuga-Chang-Resume.pdf "$repo_dir/Yuga-Chang-Resume.pdf"
