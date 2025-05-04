<!-- <p align="center"><img src="./app/assets/images/minecraft_title.png" width="550px" height="250px" alt="aventium softworks"></p> -->

<h1 align="center">Launcher</h1>

<em><h5 align="center">(formerly Electron Launcher and a fork of Helios Launcher)</h5></em>

<p align="center">Join the Muspelheim Network without worrying about installing Java, Forge, or other mods. We'll handle that for you.</p>

## Description

The Muspelheim Network is a collection of popular Minecraft Modpack servers. Team up with your friends, communicate seamlessly via the integrated voice chat, and engage in trade with other teams...

Download and install the launcher to gauge all it can do!

<!-- #### Need Help? [Contact the developers]

[![Status Discord](https://lanyard.cnrad.dev/api/431469113341116426)](https://discord.com/users/431469113341116426) -->

#### Like the project? Leave a ⭐ star on the repository!

## Downloads

You can download from [GitHub Releases](https://github.com/Tyrthurey/MuspelheimLauncher/releases)
**Supported Platforms**

If you download from the [Releases](https://github.com/Tyrthurey/MuspelheimLauncher/releases) tab, select the installer for your system.

| Platform | File |
| -------- | ---- |
| Windows x64 | `Muspelheim-Launcher-setup-VERSION-win_x64.exe` |
| macOS x64 | `Muspelheim-Launcher-setup-VERSION-mac_x64.dmg` |
| macOS arm64 | `Muspelheim-Launcher-setup-VERSION-mac_arm64.dmg` |
| Linux x86_64 | `Muspelheim-Launcher-setup-VERSION-linux_x86_64x.AppImage` |
| Linux arm64 | `Muspelheim-Launcher-setup-VERSION-linux_arm64.AppImage` |
| Linux aarch64 | `Muspelheim-Launcher-setup-VERSION-linux_aarch64.rpm` |

## Development

This section details the setup of a basic developmentment environment.

### Getting Started

**System Requirements**

* [Node.js][nodejs] v20

---

**Clone and Install Dependencies**

```console
> git clone https://github.com/Tyrthurey/MuspelheimLauncher.git
> cd MuspelheimLauncher
> npm install
```

---

**Launch Application**

```console
> npm start
```

---

**Build Installers**

To build for your current platform.

```console
> npm run dist
```

Build for a specific platform.

| Platform    | Command              |
| ----------- | -------------------- |
| Windows x64 | `npm run dist:win`   |
| macOS       | `npm run dist:mac`   |
| Linux x64   | `npm run dist:linux` |

Builds for macOS may not work on Windows/Linux and vice-versa.

---

### Visual Studio Code

All development of the launcher should be done using [Visual Studio Code][vscode].

Paste the following into `.vscode/launch.json`

```JSON
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "program": "${workspaceFolder}/node_modules/electron/cli.js",
      "args" : ["."],
      "outputCapture": "std"
    },
    {
      "name": "Debug Renderer Process",
      "type": "chrome",
      "request": "launch",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "runtimeArgs": [
        "${workspaceFolder}/.",
        "--remote-debugging-port=9222"
      ],
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

This adds two debug configurations.

#### Debug Main Process

This allows you to debug Electron's [main process][mainprocess]. You can debug scripts in the [renderer process][rendererprocess] by opening the DevTools Window.

#### Debug Renderer Process

This allows you to debug Electron's [renderer process][rendererprocess]. This requires you to install the [Debugger for Chrome][chromedebugger] extension.

Note that you **cannot** open the DevTools window while using this debug configuration. Chromium only allows one debugger, opening another will crash the program.

### To Make a New Release:

You push your latest commit and sync it to github. Then you get the commit hash.

`git log --oneline`

The tag should follow the v0.x.y convention, i.e. v0.0.4

`git tag TAG LATEST_COMMIT_ID`

When you're done, push the tag and wait for the release to build (approx 10 minutes)

`git push origin TAG`


Then go to Releases, to the Draft that has been created.

Edit it, and touch nothing except "Generate Release Notes", and scroll to the very bottom.

Make sure Latest Release is checked (it should be), and click on Publish.

---

## Resources

* [Helios Launcher](https://github.com/dscalzi/HeliosLauncher)

<!-- The best way to contact the developers is on [Discord](https://discord.com/users/431469113341116426). -->

---


[nodejs]: https://nodejs.org/en/ 'Node.js'
[vscode]: https://code.visualstudio.com/ 'Visual Studio Code'
[mainprocess]: https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes 'Main Process'
[rendererprocess]: https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes 'Renderer Process'
[chromedebugger]: https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome 'Debugger for Chrome'
[discord]: https://discord.gg/zNWUXdt 'Discord'
[issues]: https://github.com/dscalzi/HeliosLauncher/wiki 'issues'
[nebula]: https://github.com/dscalzi/Nebula 'dscalzi/Nebula'
[v2branch]: https://github.com/dscalzi/HeliosLauncher/tree/ts-refactor 'v2 branch'

### Special Thanks

* [@dscalzi](https://github.com/dscalzi) and his [project](https://github.com/dscalzi/HeliosLauncher) for the original launcher.

* [@Fairy-Jeux](https://github.com/Fairy-Jeux) and his [fork of Helios](https://github.com/Fairy-Jeux/CreateAcademyLauncher) which was the base for this fork.