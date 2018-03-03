#!/bin/bash
set -ev

# setup the datastore bucket
./mc config host add myminio http://minio_ds:9000 VKHGJTS8P3DR63GVRXLJ 6oXQdUMGUHEPcN4OfxN4ROXllCHZ7s/m3uNmcn7j
./mc mb myminio/images