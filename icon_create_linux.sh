#!/bin/sh
user=$(whoami)
home='/home/'
userDir=$home$user
lightDir='/LightTable'
lightDir=$userDir$lightDir
if [ ! -d $lightDir ]; then
	echo "FAILED: cannot create icon"
	echo "LightTable must be in the current home directory"	
	exit 0	
fi
deskText='[Desktop Entry]\nName=LightTable\nExec=/home/'
entryText='/LightTable/deploy/LightTable\nTerminal=false\nType=Application\nIcon=/home/'
findIcon='/LightTable/deploy/core/img/lticon.png'
echo "creating icon file.."
desktopPath='/home/'
desktopPath=$desktopPath$user
endDeskPath='/Desktop/LightTable.desktop'
desktopPath=$desktopPath$endDeskPath
echo $deskText$user$entryText$user$findIcon >$desktopPath
deskTop='/Desktop'
deskTop=$userDir$deskTop
cd $deskTop
chmod +x LightTable.desktop
excessFile='/LightTable/create_icon_linux.sh~'
if [ -f $userDir$excessFile ]; then
	rm $userDir$excessFile
fi

