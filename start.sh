#!/bin/bash -xe

cd /runtime
grunt connect:dist &

cd /usr/src/app
gulp serve
