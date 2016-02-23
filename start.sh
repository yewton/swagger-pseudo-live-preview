#!/bin/sh -xe

cd /editor
http-server --cors --port=8080 -c=-1 /editor &

cd /usr/src/app
gulp serve
