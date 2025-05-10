; Custom NSIS Script for Void Event Launcher
; Uses the recommended approach with macros for customization

; Custom header - executed before any other code
!macro customHeader
  !define MUI_BGCOLOR "101020"
  !define MUI_TEXTCOLOR "FFFFFF"
!macroend

; Pre-initialization - executed at the beginning of the .onInit callback
!macro preInit
  ; Add any pre-initialization code here
!macroend

; Custom initialization - executed in the .onInit callback after preInit
!macro customInit
  ; Set up any custom initialization
!macroend

; Custom welcome page - only used if oneClick is false
!macro customWelcomePage
  !define MUI_WELCOMEPAGE_TITLE "Welcome to Void Event Launcher"
  !define MUI_WELCOMEPAGE_TEXT "This wizard will guide you through the installation of Void Event Launcher.$\r$\n$\r$\nVoid Event Launcher is a custom launcher for modded Minecraft, designed for Void Event Hub events.$\r$\n$\r$\nClick Next to continue."
  !insertmacro MUI_PAGE_WELCOME
!macroend

; Custom installation mode - used to force per-machine or per-user installation
!macro customInstallMode
  ; Uncomment to force per-machine installation
  ; $isForceMachineInstall = 1
  
  ; Uncomment to force per-user installation
  ; $isForceCurrentInstall = 1
!macroend

; Custom installation - executed during the installation process
!macro customInstall
  ; Custom installation steps go here
  DetailPrint "Installing Void Event Launcher..."
!macroend

; Custom uninstall welcome page - only used if oneClick is false
!macro customUnWelcomePage
  !define MUI_WELCOMEPAGE_TITLE "Uninstall Void Event Launcher"
  !define MUI_WELCOMEPAGE_TEXT "This wizard will guide you through the uninstallation of Void Event Launcher.$\r$\n$\r$\nBefore starting, please make sure Void Event Launcher is not running.$\r$\n$\r$\nClick Next to continue."
  !insertmacro MUI_UNPAGE_WELCOME
!macroend

; Custom uninstallation - executed during the uninstallation process
!macro customUnInstall
  ; Custom uninstallation steps go here
  DetailPrint "Uninstalling Void Event Launcher..."
!macroend

; Custom finish page options
!define MUI_FINISHPAGE_RUN "$INSTDIR\Void Event Launcher.exe"
!define MUI_FINISHPAGE_RUN_TEXT "Launch Void Event Launcher"
!define MUI_FINISHPAGE_SHOWREADME "$INSTDIR\README.txt"
!define MUI_FINISHPAGE_SHOWREADME_TEXT "Show README file"
!define MUI_FINISHPAGE_LINK "Visit Void Event Hub website"
!define MUI_FINISHPAGE_LINK_LOCATION "https://voideventhub.net"

; Component descriptions for the installer
!define DESC_SecCore "Core files required for Void Event Launcher."
!define DESC_SecOptional "Optional components and additional themes."

Function .onInit
  ; This is handled by electron-builder through customInit macro
FunctionEnd

Section "Core Files" SecCore
  SectionIn RO
  ; Core installation files - handled by electron-builder
SectionEnd

Section "Optional Components" SecOptional
  ; Optional components - add any extra files here
SectionEnd

!insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
  !insertmacro MUI_DESCRIPTION_TEXT ${SecCore} "${DESC_SecCore}"
  !insertmacro MUI_DESCRIPTION_TEXT ${SecOptional} "${DESC_SecOptional}"
!insertmacro MUI_FUNCTION_DESCRIPTION_END 