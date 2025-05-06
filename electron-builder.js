/**
 * Electron Builder Configuration
 */
const { execSync } = require('child_process')

const config = {
    appId: 'net.voideventhub.launcher',
    productName: 'Void Event Launcher',
    artifactName: '${productName}-setup-${channel}_${version}-${os}_${arch}.${ext}',

    copyright: 'Copyright © 2025 Tyrthurey',

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
        target: [
            {
                target: 'nsis',
                arch: 'x64',
            },
        ],
    },

    // Windows Installer Configuration
    nsis: {
        oneClick: false,
        perMachine: false,
        allowElevation: true,
        allowToChangeInstallationDirectory: true,
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
        description: 'Custom launcher which allows users to join modded servers. All mods, configurations, and updates are handled automatically.',
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

if (process.env.CODE_SIGN_SCRIPT_PATH) {
    console.log('CODE_SIGN_SCRIPT_PATH found in env vars:', process.env.CODE_SIGN_SCRIPT_PATH)
    config.win.sign = configuration => {
        console.log('Requested signing for ', configuration.path)

        // Only proceed if it's an exe file in the dist directory
        if (!configuration.path.includes('.exe') || (!configuration.path.includes('/dist/') && !configuration.path.includes('\\dist\\'))) {
            console.log('This is not an executable or not in the dist directory, skip signing')
            return true
        }

        // Only sign the primary installer
        const filename = configuration.path.split(/[/\\]/).pop().toLowerCase()
        if (!filename.includes('void') || !filename.includes('launcher') || !filename.includes('setup')) {
            console.log('This is not the main installer, skip signing')
            return true
        }

        console.log('Signing the executable:', configuration.path)

        const scriptPath = process.env.CODE_SIGN_SCRIPT_PATH

        try {
            // Execute the sign script synchronously
            process.env.INPUT_COMMAND = 'sign'
            process.env.INPUT_FILE_PATH = configuration.path
            const env = {
                command: process.env.INPUT_COMMAND,
                username: process.env.INPUT_USERNAME,
                password: process.env.INPUT_PASSWORD,
                credential_id: process.env.INPUT_CREDENTIAL_ID,
                totp_secret: process.env.INPUT_TOTP_SECRET,
                file_path: process.env.INPUT_FILE_PATH,
                output_path: process.env.INPUT_OUTPUT_PATH,
                malware_block: process.env.INPUT_MALWARE_BLOCK,
                override: process.env.INPUT_OVERRIDE,
                clean_logs: process.env.INPUT_CLEAN_LOGS,
                environment_name: process.env.INPUT_ENVIRONMENT_NAME,
                jvm_max_memory: process.env.INPUT_JVM_MAX_MEMORY,
            }
            console.log('env:', JSON.stringify(env, null, 2))
            const output = execSync(`node "${scriptPath}"`, {
                env: { ...process.env, ...env },
            }).toString()
            console.log(`Script output: ${output}`)
        } catch (error) {
            console.error(`Error executing script: ${error.message}`)
            if (error.stdout) {
                console.log(`Script stdout: ${error.stdout.toString()}`)
            }
            if (error.stderr) {
                console.error(`Script stderr: ${error.stderr.toString()}`)
            }
            return false
        }

        return true // Return true at the end of successful signing
    }

    // sign only for Windows 10 and above - adjust for your code as needed
    config.win.signingHashAlgorithms = ['sha256']
}

module.exports = config
