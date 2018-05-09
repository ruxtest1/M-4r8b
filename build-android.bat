@echo off

for /f "tokens=1-2 delims=:" %%a in ('ipconfig^|find "IPv4"') do set ip=%%b
set ip=%ip:~1%
echo %ip%

set NODE_ENV=dev
set NODE_IP=%ip%

@RD /S /Q "www"

ionic cordova build android --prod

copy.bat