SHELL:=/bin/bash

all: build stat clean

build:
	rm -f muri-src.zip muri.zip src/muri.min.js
	uglifyjs --compress --mangle --no-dead-code --output src/muri.min.js src/*.js
	(cd src && zip -q -9 ../muri.zip index.html muri.min.js assets/* assets/**/* vendor/*.min.js)
	(cd src && zip -q -9 ../muri-src.zip ./* ./**/* ./**/**/* ../README)

.ONESHELL:
stat: build
	@filesize=`stat --printf="%s" muri.zip` && \
	echo $$filesize "byte ->" $$((100*$$filesize/13000)) "%"

clean:
	rm -f src/muri.min.js muri.zip

.PHONY: build stat clean all
