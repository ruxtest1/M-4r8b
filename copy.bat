@echo off

for /f "tokens=1-2 delims=:" %%a in ('ipconfig^|find "IPv4"') do set ip=%%b
set ip=%ip:~1%
echo %ip%

set NODE_ENV=dev
set NODE_IP=%ip%
set t=%date%_%time%
set d=%t:~10,4%-%t:~7,2%-%t:~4,2% %t:~15,2%%t:~18,2%%t:~21,2%

copy /y "platforms\android\build\outputs\apk\android-debug.apk" "output\android\android-debug-%d%.apk"
copy /y "platforms\android\build\outputs\apk\android-debug.apk" "D:\Dropbox\Shared File\bird\Marukyo\android-debug.apk"
copy /y "platforms\android\build\outputs\apk\android-debug.apk" "Z:\Rux\Marukyo-App\android-debug-%d%.apk"

xcopy /y "www\*" "..\M-5r56\app" /e /i
