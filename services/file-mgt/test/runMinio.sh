#!/bin/bash

set -ev

docker run -p 9000:9000 --name minio1 \
  -e "MINIO_ACCESS_KEY=VKHGJTS8P3DR63GVRXLJ" \
  -e "MINIO_SECRET_KEY=6oXQdUMGUHEPcN4OfxN4ROXllCHZ7s/m3uNmcn7j" \
  -v /mnt/data:/data \
  -v /mnt/config:/root/.minio \
  minio/minio server /data
