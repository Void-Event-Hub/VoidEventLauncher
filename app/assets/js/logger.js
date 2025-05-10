const { app } = process.type === 'browser' ? require('electron') : require('@electron/remote')
const winston = require('winston')
const path = require('path')
const fs = require('fs')
const { EventEmitter } = require('events')

// custom logging transport that behaves like the game
// not native to Winston
class FileLoggingTransport extends winston.Transport {

    constructor(options) {
        super(options)
        this.logFileName = options.logFileName || 'app'
        this.logFileExt = options.logFileExt || 'log'
        this.maxLogFiles = options.maxLogFiles || 1
        // Set max listeners for this instance
        this.setMaxListeners(100) // Increasing from default 10
    }

    getStream() {
        if (this.stream) return this.stream

        const dirName = app.getPath('logs')
        const fileName = `${this.logFileName}-latest.${this.logFileExt}`
        const fileNameFull = path.join(dirName, fileName)

        try {
            const latestStats = fs.statSync(fileNameFull)
            fs.renameSync(fileNameFull, path.join(dirName, `${this.logFileName}-${Math.floor(latestStats.atimeMs)}.${this.logFileExt}`))
        } catch (e) {
            if (e.code !== 'ENOENT' && e.code !== 'EBUSY') throw e
        }

        const stream = fs.createWriteStream(fileNameFull, { flags: 'a' })
        this.stream = stream

        const files = fs.readdirSync(dirName)
        if (files.length > this.maxLogFiles) {
            const oldFiles = files
                .map(file => ({ file, stats: fs.lstatSync(path.join(dirName, file)) }))
                .sort((a, b) => b.stats.birthtimeMs - a.stats.birthtimeMs)
                .slice(this.maxLogFiles)
            oldFiles.forEach(({ file }) => fs.rmSync(path.join(dirName, file)))
        }

        return stream
    }

    log(info, callback) {
        const message = info[Symbol.for('message')]
        this.getStream().write(`${message}\n`, callback)
    }

    // Add cleanup method to properly close stream when done
    close() {
        if (this.stream) {
            this.stream.end()
            this.stream = null
        }
    }
}

// Set global EventEmitter max listeners to 100
EventEmitter.defaultMaxListeners = 100

const fileTransport = new FileLoggingTransport({
    format: winston.format.uncolorize(),
    logFileName: 'launcher',
    maxLogFiles: 5
})
// Setting max listeners for the shared instance as well
fileTransport.setMaxListeners(100) // Increasing from 30

/**
 * Reconfigures the logger
 *
 * The default Helios logger creates a Winston logger that only has a console transport. This changes it a bit
 * and adds a file transport to the logger.
 * @param {Function} loggerFactory The logger factory function
 * @returns {Function} The new logger factory function
 */
exports.reconfigureLogger = function (loggerFactory) {
    return function (...args) {
        const logger = loggerFactory(...args)
        logger.add(fileTransport)
        return logger
    }
}

// Clean up when process exits to prevent memory leaks
process.on('exit', () => {
    fileTransport.close()
})
