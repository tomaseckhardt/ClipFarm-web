#!/bin/bash
# Menší webové verze brag videí (originály v assets/brag/*/brag.mp4 zůstávají beze změny):
#   9:16 → brag-540.mp4 (540×960): telefony na webu nejsou širší než 250 px, ani na retině víc nepotřebují
#   16:9 → brag-640.mp4 (640×360): verze pro mobily (<source media>), desktop dostane originál
# Spustit znovu jen při výměně videí. Potřebuje ffmpeg s libx264 nebo libopenh264.
set -euo pipefail
cd "$(dirname "$0")/../assets/brag"
enc=libx264; ffmpeg -hide_banner -encoders 2>/dev/null | grep -q libx264 || enc=libopenh264
encode() { # vstup, výstup, šířka:výška, bitrate
  ffmpeg -v error -y -i "$1" -vf "scale=$3:flags=lanczos" -c:v "$enc" -b:v "$4" -maxrate 1200k -bufsize 2400k \
    -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 96k "$2"
  echo "$2 $(du -h "$2" | cut -f1)"
}
for v in *-9x16; do encode "$v/brag.mp4" "$v/brag-540.mp4" 540:960 450k; done
for v in *-16x9; do encode "$v/brag.mp4" "$v/brag-640.mp4" 640:360 350k; done
