; Custom NSIS Script for Void Event Launcher
; Uses the recommended macros approach for electron-builder

; Custom header - executed before any other code
!macro customHeader
  !ifndef MUI_BGCOLOR
    !define MUI_BGCOLOR "101020"
  !endif
  !ifndef MUI_TEXTCOLOR
    !define MUI_TEXTCOLOR "FFFFFF"
  !endif
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
  !ifndef MUI_WELCOMEPAGE_TITLE
    !define MUI_WELCOMEPAGE_TITLE "Welcome to Void Event Launcher"
  !endif
  !ifndef MUI_WELCOMEPAGE_TEXT
    !define MUI_WELCOMEPAGE_TEXT "This wizard will guide you through the installation of Void Event Launcher.$\r$\n$\r$\nVoid Event Launcher is a custom launcher for modded Minecraft, designed for Void Event Hub events.$\r$\n$\r$\nClick Next to continue."
  !endif
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
  !ifndef MUI_WELCOMEPAGE_TITLE
    !define MUI_WELCOMEPAGE_TITLE "Uninstall Void Event Launcher"
  !endif
  !ifndef MUI_WELCOMEPAGE_TEXT
    !define MUI_WELCOMEPAGE_TEXT "This wizard will guide you through the uninstallation of Void Event Launcher.$\r$\n$\r$\nBefore starting, please make sure Void Event Launcher is not running.$\r$\n$\r$\nClick Next to continue."
  !endif
!macroend

; Custom uninstallation - executed during the uninstallation process
!macro customUnInstall
  ; Custom uninstallation steps go here
  DetailPrint "Uninstalling Void Event Launcher..."
!macroend

; These are used by electron-builder directly, we don't need to use insertmacro
!ifndef MUI_FINISHPAGE_RUN
  !define MUI_FINISHPAGE_RUN "$INSTDIR\Void Event Launcher.exe"
!endif
!ifndef MUI_FINISHPAGE_RUN_TEXT
  !define MUI_FINISHPAGE_RUN_TEXT "Launch Void Event Launcher"
!endif
!ifndef MUI_FINISHPAGE_SHOWREADME
  !define MUI_FINISHPAGE_SHOWREADME "$INSTDIR\README.txt"
!endif
!ifndef MUI_FINISHPAGE_SHOWREADME_TEXT
  !define MUI_FINISHPAGE_SHOWREADME_TEXT "Show README file"
!endif
!ifndef MUI_FINISHPAGE_LINK
  !define MUI_FINISHPAGE_LINK "Visit Void Event Hub website"
!endif
!ifndef MUI_FINISHPAGE_LINK_LOCATION
  !define MUI_FINISHPAGE_LINK_LOCATION "https://voideventhub.net"
!endif 