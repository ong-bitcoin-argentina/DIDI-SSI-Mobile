#!/bin/bash

if [ "$#" -ne 2 ] ; then
	echo "Usage: $0 <out_dir> <in_file>"
	exit 1
fi

RESP=$(tail -n 1 "$2")

mkdir -p "$1"
echo "$RESP" | jq '.frontImage' | sed -e 's/"//g' | base64 --decode > "$1/front.jpg"
echo "$RESP" | jq '.backImage' | sed -e 's/"//g' | base64 --decode > "$1/back.jpg"
echo "$RESP" | jq '.selfieImage' | sed -e 's/"//g' | base64 --decode > "$1/selfie.jpg"
