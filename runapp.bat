@ECHO OFF
setlocal enabledelayedexpansion

set "_IPAddress=127.0.0.1"
set "runDefault=1"
set "exposeWarning="

:processargs
SET "ARG=%~1"
IF DEFINED ARG (
    IF /I "%ARG%"=="--install" (
        CALL :install
    ) ELSE IF /I "%ARG%"=="--i" (
        CALL :install
    ) ELSE IF /I "%ARG%"=="--expose" (
        set "_IPAddress=0.0.0.0"
        set "exposeWarning=1"
    ) ELSE IF /I "%ARG%"=="--no-default" (
        set "runDefault=0"
    ) ELSE IF /I "%ARG%"=="--help" (
        CALL :help
        GOTO :eof
    ) ELSE (
        ECHO Invalid argument: %ARG%
        CALL :help
        GOTO :eof
    )
    SHIFT
    GOTO processargs
)

IF %runDefault%==1 (
    CALL :default
)


GOTO :eof

:install
ECHO Installing virtualenv...
pip install virtualenv
python -m venv venv
ECHO Activating virtualenv...
call venv\Scripts\activate
ECHO Installing dependencies...
pip install -r requirements.txt
GOTO :eof

:default
IF "!exposeWarning!"=="1" (
    ECHO WARNING: The server is exposed to all network interfaces.
    ECHO WARNING: Make sure to configure security settings accordingly.
)
ECHO Starting server at !_IPAddress!:80...

python manage.py runserver !_IPAddress!:80
CMD /k
GOTO :eof

:help
ECHO Usage:
ECHO   --install, --i    Install virtualenv and dependencies.
ECHO   --expose          Expose the server to all network interfaces 0.0.0.0.
ECHO                      WARNING: Ensure proper security settings.
ECHO   --no-default      Do not run the default server.
ECHO   --help

GOTO :eof
