@echo off
echo Compiling typescript...

tsc --build tsconfig.json && node ./bin/www 


