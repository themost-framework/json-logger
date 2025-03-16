import { inspect } from 'util';
import date from 'date-and-time';

const DefaultDateFormat = 'DD/MMM/YYYY:HH:mm:ss ZZ'

class JsonLogger {

    /**
     * @param {{dateFormat:string=,logLevel:string=,format:raw=}=} options
     */
    constructor(options) {
        this.options = Object.assign({}, {
            dateFormat: DefaultDateFormat,
            level: 'info',
            format: 'json',
            stdout: process.stdout,
            stderr: process.stderr
        }, options);
        if (options == null) {
            // validate NODE_ENV environment variable
            if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
                this.options.level = 'debug';
            }
        }
        this.logLevel = JsonLogger.Levels.info;
        if (Object.prototype.hasOwnProperty.call(JsonLogger.Levels, this.options.level)) {
            this.logLevel = JsonLogger.Levels[this.options.level];
        }
    }

    static get Levels() {
        return {
            error: 0,
            warn: 1,
            info: 2,
            verbose: 3,
            debug: 4
        };
    }

    log() {
        if (this.logLevel < JsonLogger.Levels.info) {
            return;
        }
        this.write.apply(this, ['log'].concat(Array.from(arguments)));
    }

    info() {
        if (this.logLevel < JsonLogger.Levels.info) {
            return;
        }
        this.write.apply(this, ['info'].concat(Array.from(arguments)));
    }

    warn() {
        if (this.logLevel < JsonLogger.Levels.warn) {
            return;
        }
        this.write.apply(this, ['warn'].concat(Array.from(arguments)));
    }

    error() {
        if (this.logLevel < JsonLogger.Levels.error) {
            return;
        }
        this.write.apply(this, ['error'].concat(Array.from(arguments)));
    }

    verbose() {
        if (this.logLevel < JsonLogger.Levels.verbose) {
            return;
        }
        this.write.apply(this, ['verbose'].concat(Array.from(arguments)));
    }

    debug() {
        if (this.logLevel < JsonLogger.Levels.debug) {
            return;
        }
        this.write.apply(this, ['debug'].concat(Array.from(arguments)));
    }

    /**
     * @param {string} level
     * @param {...*} arg
     */
    // eslint-disable-next-line no-unused-vars
    write(level, arg) {
        const args = Array.from(arguments);
        const log = (level === 'error') ? this.options.stderr : this.options.stdout
        if (args.length > 1) {
            if (args[args.length - 1] == null) {
                args.pop();
            }
        }
        // add timestamp
        args.unshift(date.format(new Date(), this.options.dateFormat || DefaultDateFormat));
        if (this.options.format === 'json') {
            log.write(JSON.stringify(args) + '\n');
            return;
        }
        log.write(args.map((arg) => inspect(arg)).map(
            (arg) => arg.replace(/^'/, '').replace(/'$/, '')
        ).join(',') + '\n');
    }

    level(level) {
        if (Object.prototype.hasOwnProperty.call(JsonLogger.Levels, level)) {
            this.logLevel = JsonLogger.Levels[level];
        }
    }

}

export {
    JsonLogger
}
