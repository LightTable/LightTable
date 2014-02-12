#!/bin/sh
user=$(whoami)
home='/home/'
userDir=$home$user
lightDir='/LightTable'
lightDir=$userDir$lightDir
dirLocation=$(pwd)
deskText='[Desktop Entry]\nName=LightTable\nExec='
entryText='/ltbin\nTerminal=false\nType=Application\nIcon='
findIcon='/core/img/lticon.png'
echo "creating icon file.."
desktopPath='/home/'
desktopPath=$desktopPath$user
endDeskPath='/Desktop/LightTable.desktop'
desktopPath=$desktopPath$endDeskPath
echo $deskText$dirLocation$entryText$dirLocation$findIcon >$desktopPath
deskTop='/Desktop'
deskTop=$userDir$deskTop
cd $deskTop
chmod +x LightTable.desktop
#remove extra file created by execution
fileToGo='/create_icon.sh~'
excessFile=$dirLocation$fileToGo
if [ -f $excessFile ]; then
	rm $excessFile
fi

