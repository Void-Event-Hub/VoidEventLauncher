; Custom NSIS Script for Void Event Launcher
; Uses the recommended macros approach for electron-builder

; Custom header - executed before any other code
!macro customHeader
  !define MUI_BGCOLOR "101020"
  !define MUI_TEXTCOLOR "FFFFFF"
!macroend

; Pre-initialization - executed at the beginning of the .onInit callback
!macro preInit
  ; Pre-initialization code here
!macroend

; Custom initialization - executed in the .onInit callback after preInit
!macro customInit
  ; Custom initialization code here
!macroend

; Custom welcome page - only used if oneClick is false
!macro customWelcomePage
  !define MUI_WELCOMEPAGE_TITLE "Welcome to Void Event Launcher"
  !define MUI_WELCOMEPAGE_TEXT "This wizard will guide you through the installation of Void Event Launcher.$\r$\n$\r$\nVoid Event Launcher is a custom launcher for modded Minecraft, designed for Void Event Hub events.$\r$\n$\r$\nClick Next to continue."
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
!macroend

; Custom uninstallation - executed during the uninstallation process
!macro customUnInstall
  ; Custom uninstallation steps go here
  DetailPrint "Uninstalling Void Event Launcher..."
!macroend

; These are used by electron-builder directly, we don't need to use insertmacro
!define MUI_FINISHPAGE_RUN "$INSTDIR\Void Event Launcher.exe"
!define MUI_FINISHPAGE_RUN_TEXT "Launch Void Event Launcher"
!define MUI_FINISHPAGE_SHOWREADME "$INSTDIR\README.txt"
!define MUI_FINISHPAGE_SHOWREADME_TEXT "Show README file"
!define MUI_FINISHPAGE_LINK "Visit Void Event Hub website"
!define MUI_FINISHPAGE_LINK_LOCATION "https://voideventhub.net" 