; Custom NSIS Script for Void Event Launcher
; This adds additional customization to the installer

; Include Modern UI 2
!include MUI2.nsh
!include LogicLib.nsh
!include FileFunc.nsh

; General Interface Settings
; Don't redefine these as they are set by electron-builder
; !define MUI_ICON "build\icon.ico"
; !define MUI_UNICON "build\uninstall.ico"

; Use custom colors for the installer
!define MUI_BGCOLOR "101020"
!define MUI_TEXTCOLOR "FFFFFF"

; Header image - don't redefine
; !define MUI_HEADERIMAGE
; !define MUI_HEADERIMAGE_BITMAP "build\header.bmp"
!define MUI_HEADERIMAGE_RIGHT

; Welcome/Finish page
; Use the defined MUI_WELCOMEFINISHPAGE_BITMAP if it exists
!ifndef MUI_WELCOMEFINISHPAGE_BITMAP
  !define MUI_WELCOMEFINISHPAGE_BITMAP "${NSISDIR}\Contrib\Graphics\Wizard\win.bmp"
!endif

!define MUI_WELCOMEPAGE_TITLE "Welcome to Void Event Launcher Setup"
!define MUI_WELCOMEPAGE_TEXT "This wizard will guide you through the installation of Void Event Launcher.$\r$\n$\r$\nVoid Event Launcher is a custom launcher for modded Minecraft, designed for Void Event Hub events.$\r$\n$\r$\nClick Next to continue."

; Finish page customization
!define MUI_FINISHPAGE_RUN "$INSTDIR\Void Event Launcher.exe"
!define MUI_FINISHPAGE_RUN_TEXT "Launch Void Event Launcher"
!define MUI_FINISHPAGE_SHOWREADME "$INSTDIR\README.txt"
!define MUI_FINISHPAGE_SHOWREADME_TEXT "Show README file"
!define MUI_FINISHPAGE_LINK "Visit Void Event Hub website"
!define MUI_FINISHPAGE_LINK_LOCATION "https://voideventhub.net"

; Abort warning
!define MUI_ABORTWARNING

; License page
!define MUI_LICENSEPAGE_CHECKBOX

; Components page
!define MUI_COMPONENTSPAGE_SMALLDESC

; Custom pages
Function CustomPageFunction
  !insertmacro MUI_HEADER_TEXT "Void Event Launcher" "Customize your installation"
  ; Add custom NSDialogs code here if needed
FunctionEnd

; Add our custom page - NOTE: electron-builder handles the standard pages
; so we don't need to define them all here, just our custom one
!ifndef ELECTRON_BUILDER_INCLUDED_PAGES
  Page custom CustomPageFunction
!endif

; Uninstaller pages are handled by electron-builder
; !insertmacro MUI_UNPAGE_WELCOME
; !insertmacro MUI_UNPAGE_CONFIRM
; !insertmacro MUI_UNPAGE_INSTFILES
; !insertmacro MUI_UNPAGE_FINISH

; Language files - electron-builder will include English by default
!ifndef ELECTRON_BUILDER_INCLUDED_LANGUAGES
  !insertmacro MUI_LANGUAGE "French"
  !insertmacro MUI_LANGUAGE "German"
  !insertmacro MUI_LANGUAGE "Spanish"
!endif

; Custom functions
Function .onInit
  ; Only show language selection if multiple languages are defined
  !ifdef MUI_LANGDLL_DISPLAY
    !insertmacro MUI_LANGDLL_DISPLAY
  !endif
FunctionEnd

; Reserve files for solid compression
!insertmacro MUI_RESERVEFILE_LANGDLL

; Custom component descriptions
!define DESC_SecCore "Core files required for Void Event Launcher."
!define DESC_SecOptional "Optional components and additional themes."

Section "Core Files" SecCore
  SectionIn RO
  ; Core installation files
SectionEnd

Section "Optional Components" SecOptional
  ; Optional components
SectionEnd

!insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
  !insertmacro MUI_DESCRIPTION_TEXT ${SecCore} "${DESC_SecCore}"
  !insertmacro MUI_DESCRIPTION_TEXT ${SecOptional} "${DESC_SecOptional}"
!insertmacro MUI_FUNCTION_DESCRIPTION_END 