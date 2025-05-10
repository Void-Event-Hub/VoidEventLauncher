// this script adapted from
// https://github.com/electron-userland/electron-builder/issues/6158#issuecomment-899798533

// Windows App Signing Script for SSL.com CodeSignTool
// I swear, whoever tampers with this, I will personally cook and send to the pits of hell. -Tyr

const childProcess = require('child_process')
const fs = require('fs')
const path = require('path')

const TEMP_DIR = path.join(__dirname, 'release', 'temp')

if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true })
}

function sign(configuration) {
    console.log(`Signing ${configuration.path}`)
    // we move signed files to a file named tmp.exe because our product name
    // contains a space, meaning our .exe contains a space, which CodeSignTool
    // balks at even with attempted backslash escaping, so we rename to tmp.exe
    const tmpExe = `tmp-${Math.random()}.exe`
    const tmpExePath = path.join(TEMP_DIR, tmpExe)

    // Create a different output path to avoid source/destination being the same
    const outputDir = path.join(TEMP_DIR, 'signed')

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
    }

    // Get the absolute path to the CodeSignTool
    const codeSignToolPath = process.env.CODE_SIGN_TOOL_PATH || path.join(process.cwd(), 'code_signer')

    console.log('CodeSignTool path:', codeSignToolPath)
    console.log('Temp dir:', TEMP_DIR)
    console.log('Output dir:', outputDir)
    console.log('Configuration path:', configuration.path)

    // note: CodeSignTool can't sign in place without verifying the overwrite
    // with a y/m interaction so we are creating a new file in a temp directory
    // and then replacing the original file with the signed file.
    const signFile = [
        `bash ${codeSignToolPath}/CodeSignTool.sh sign`,
        `-input_file_path='${tmpExePath}'`,
        `-output_dir_path='${outputDir}'`,
        `-credential_id='${process.env.WINDOWS_SIGN_CREDENTIAL_ID}'`,
        `-username='${process.env.WINDOWS_SIGN_USER_NAME}'`,
        `-password='${process.env.WINDOWS_SIGN_USER_PASSWORD}'`,
        `-totp_secret='${process.env.WINDOWS_SIGN_USER_TOTP}'`,
    ].join(' ')

    console.log('Copying file to temp location:', tmpExePath)
    const preMoveFile = `cp "${configuration.path}" "${tmpExePath}"`

    // The signed file will be in the output directory with the same name as the input file
    const signedFilePath = path.join(outputDir, tmpExe)
    console.log('Will move signed file back from:', signedFilePath)
    const postMoveFile = `cp "${signedFilePath}" "${configuration.path}"`

    try {
        childProcess.execSync(preMoveFile, {
            stdio: 'inherit',
        })
        console.log('Executing signing command')
        childProcess.execSync(signFile, {
            stdio: 'inherit',
        })
        console.log('Moving signed file back')
        childProcess.execSync(postMoveFile, {
            stdio: 'inherit',
        })
        console.log('Signing completed successfully')
    } catch (error) {
        console.error('Error during signing process:', error.message)
        console.error('Command stdout/stderr:', error.stdout?.toString(), error.stderr?.toString())
        throw error
    }
}

exports.default = sign
