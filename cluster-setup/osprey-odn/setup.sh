#!/bin/bash

set -ev
docker exec file_mgt /usr/src/app/setup.sh  || echo warning
docker exec data_layer /usr/src/app/setup.sh || echo warning