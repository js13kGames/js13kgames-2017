#!/usr/bin/env bash

rm -f muri-src.zip muri.zip
uglifyjs --no-dead-code --output src/muri.min.js src/*.js
(cd src && zip -q -9 ../muri.zip index.html muri.min.js assets/**/* vendor/*.min.js)
(cd src && zip -q -9 ../muri-src.zip *)

filesize=`stat --printf="%s" muri.zip`
echo $filesize "byte ->" $((100*$filesize/13000)) "%"
