/**
 * Electron Builder Configuration
 */
// const { execSync } = require('child_process')

const config = {
    appId: 'net.voideventhub.launcher',
    productName: 'Void Event Launcher',
    artifactName: '${productName}-setup-${channel}_${version}-${os}_${arch}.${ext}',

    copyright: 'Copyright © 2025 Void Event Hub',

    asar: true,
    compression: 'maximum',

    files: [
        '*.{js,json,txt,md}',
        '{app,libraries,build}/**/*',
        'node_modules/**/*.{js,json}',
        // '!{dist,.gitignore,.vscode,docs,dev-app-update.yml,.nvmrc,.eslintrc.json}',
        // '!flatpack/**'
    ],

    extraResources: ['libraries'],

    // Windows Configuration
    win: {
        publish: ['github'],
        artifactName: '${productName}-setup-${channel}_${version}-${os}_${arch}.${ext}',
        target: [
            {
                target: 'nsis',
                arch: 'x64',
            },
        ],
        // Custom signing script is moved to signtoolOptions
        signtoolOptions: {
            sign: './sign.js',
        },
        // SHA-256 is usually the default, so no need to specify hash algorithms
    },

    // Windows Installer Configuration
    nsis: {
        oneClick: false,
        perMachine: false,
        allowElevation: true,
        allowToChangeInstallationDirectory: true,
        include: 'build/installer.nsh',
        installerIcon: 'build/icon.ico',
        uninstallerIcon: 'build/uninstall.ico',
        installerHeader: 'build/header.bmp',
        // installerSidebar: 'build/sidebar.bmp',
        // uninstallerSidebar: 'build/sidebar.bmp',
        createDesktopShortcut: true,
        createStartMenuShortcut: true,
        shortcutName: 'Void Event Launcher',
        license: 'LICENSE.txt',
        multiLanguageInstaller: true,
        runAfterFinish: true,
        differentialPackage: true,
    },

    // macOS Configuration
    mac: {
        target: [
            {
                target: 'dmg',
                arch: ['x64', 'arm64'],
            },
        ],
        category: 'public.app-category.games',
    },

    // Linux Configuration
    linux: {
        target: [
            {
                target: 'AppImage',
                arch: ['x64', 'arm64'],
            },
            {
                target: 'deb',
                arch: ['x64', 'arm64'],
            },
            {
                target: 'rpm',
                arch: ['x64', 'arm64'],
            },
        ],
        maintainer: 'Void-Event-Hub',
        vendor: 'Void-Event-Hub',
        synopsis: 'Modded Minecraft Launcher for use in Void Event Hub events.',
        description:
            'Custom launcher which allows users to join modded servers. All mods, configurations, and updates are handled automatically.',
        category: 'Game',
    },

    directories: {
        buildResources: 'build',
        output: 'dist',
    },

    // GitHub Release Configuration
    publish: {
        provider: 'github',
        repo: 'VoidEventLauncher',
        owner: 'Void-Event-Hub',
        releaseType: 'draft',
    },
}

module.exports = config
