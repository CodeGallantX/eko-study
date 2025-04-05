@echo off
setlocal enabledelayedexpansion
:menu
prompt EkoStudy Bot: 
echo Welcome to EkoStudy!
echo.
echo Select option
echo 1. Continue Working
echo 2. Push to GitHub
echo 3. Exit
echo.

set /p option="Select operation (1/2/3): "

if "%option%"=="1" goto continueworking
if "%option%"=="2" goto pushtogithub
if "%option%"=="3" goto quit


:continueworking
echo Opening workspace...
echo Running Next.js local server - http://localhost:3000
code . && npm run dev


:pushtogithub
git add .
git status

set /p message="Enter GitHub commit message: "
git commit -m "%message%"
git push -u origin
echo Updates pushed to GitHub successfully
echo.

:quit
cls
echo Exiting terminal...
endlocal
exit