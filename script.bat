@echo off
setlocal enabledelayedexpansion
:menu
echo Welcome back!
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
echo Continue where you left off.
code .
echo Running local server...
npm run dev


:pushtogithub
git add .
git status

set /p message="Enter GitHub commit message: "
git commit -m "%message%"
git push -u origin
echo Updates pushed to GitHub successfully

:quit
cls
echo Exiting terminal...
endlocal
exit