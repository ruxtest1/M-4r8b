@echo off

for /f "tokens=1-2 delims=:" %%a in ('ipconfig^|find "IPv4"') do set ip=%%b
set ip=%ip:~1%
echo %ip%

set NODE_ENV=dev
set NODE_IP=%ip%

xcopy /y "platforms\android\build\outputs\apk" "output\android"
xcopy /y "platforms\android\build\outputs\apk" "D:\Dropbox\Shared File\bird\Marukyo"
xcopy /y "platforms\android\build\outputs\apk" "Z:\Rux\Marukyo-App"

xcopy /y "www\*" "..\M-5r56\app" /e /i