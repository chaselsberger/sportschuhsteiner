#!/bin/bash
set -e
OUT=src/fonts
mkdir -p "$OUT"
# Baloo Bhai 2 (variable, Kannada/Latin) - static weights
declare -A BALOO=( [400]="regular" [500]="500" [600]="600" [700]="700" )
BASE="https://raw.githubusercontent.com/google/fonts/main/ofl/baloobhai2/BalooBhai2%5Bwght%5D.ttf"
curl -sL "$BASE" -o "$OUT/BalooBhai2-Variable.ttf"

BASE2="https://raw.githubusercontent.com/google/fonts/main/ofl/bigshouldersdisplay/BigShouldersDisplay%5Bwght%5D.ttf"
curl -sL "$BASE2" -o "$OUT/BigShouldersDisplay-Variable.ttf"

ls -la "$OUT"
