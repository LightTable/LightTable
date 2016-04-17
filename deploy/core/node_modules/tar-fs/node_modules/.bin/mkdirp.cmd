@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\..\mkdirp\bin\cmd.js" %*
) ELSE (
  node  "%~dp0\..\mkdirp\bin\cmd.js" %*
)