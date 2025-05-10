; Custom NSIS Script for Void Event Launcher
; This adds additional customization to the installer

; Include Modern UI 2
!include MUI2.nsh

; General Interface Settings
!define MUI_ICON "${NSISDIR}\Contrib\Graphics\Icons\modern-install.ico"
!define MUI_UNICON "${NSISDIR}\Contrib\Graphics\Icons\modern-uninstall.ico"

; Use custom colors for the installer
!define MUI_BGCOLOR "101020"
!define MUI_TEXTCOLOR "FFFFFF"

; Header image
!define MUI_HEADERIMAGE
!define MUI_HEADERIMAGE_BITMAP "build\header.bmp"
!define MUI_HEADERIMAGE_RIGHT

; Welcome/Finish page
!define MUI_WELCOMEFINISHPAGE_BITMAP "build\sidebar.bmp"
!define MUI_WELCOMEPAGE_TITLE "Welcome to Void Event Launcher Setup"
!define MUI_WELCOMEPAGE_TEXT "This wizard will guide you through the installation of Void Event Launcher.$\r$\n$\r$\nVoid Event Launcher is a custom launcher for modded Minecraft servers, designed for Void Event Hub events.$\r$\n$\r$\nClick Next to continue."

; Finish page customization
!define MUI_FINISHPAGE_RUN "$INSTDIR\Void Event Launcher.exe"
!define MUI_FINISHPAGE_RUN_TEXT "Launch Void Event Launcher"
!define MUI_FINISHPAGE_SHOWREADME "$INSTDIR\README.txt"
!define MUI_FINISHPAGE_SHOWREADME_TEXT "Show README file"
!define MUI_FINISHPAGE_LINK "Visit Void Event Hub website"
!define MUI_FINISHPAGE_LINK_LOCATION "https://voideventhub.com"

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

; Page ordering
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "LICENSE.txt"
!insertmacro MUI_PAGE_COMPONENTS
!insertmacro MUI_PAGE_DIRECTORY
Page custom CustomPageFunction
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

; Uninstaller pages
!insertmacro MUI_UNPAGE_WELCOME
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_UNPAGE_FINISH

; Language files
!insertmacro MUI_LANGUAGE "English"
!insertmacro MUI_LANGUAGE "French"
!insertmacro MUI_LANGUAGE "German"
!insertmacro MUI_LANGUAGE "Spanish"

; Custom functions
Function .onInit
  !insertmacro MUI_LANGDLL_DISPLAY
FunctionEnd

; Reserve files for solid compression
ReserveFile "build\header.bmp"
ReserveFile "build\sidebar.bmp"
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