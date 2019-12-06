#!/bin/bash

for filepath in ./views/partials/*
do	
	file=$(basename $filepath)
	filename="${file%.*}"
	echo "[ STARTUP ] Compiling template $file to public/$filename.template.js"
	./node_modules/handlebars/bin/handlebars $filepath -f ./public/$filename.template.js
done

echo "[ STARTUP ] Done compiling"
