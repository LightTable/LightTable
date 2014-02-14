#!/bin/sh
dirLocation=$(pwd)
deskText='[Desktop Entry]\nName=LightTable\nExec='
entryText='/ltbin\nTerminal=false\nType=Application\nIcon='
findIcon='/core/img/lticon.png'
echo "creating icon file.."
newExecutable='/LightTable.desktop'
newExecutablePath=$dirLocation$newExecutable
echo $deskText$dirLocation$entryText$dirLocation$findIcon >$newExecutablePath
echo $dirLocation
chmod +x $newExecutablePath
#remove extra file created by execution
fileToGo='/icon_within.sh~'
excessFile=$dirLocation$fileToGo
if [ -f $excessFile ]; then
	rm $excessFile
fi
