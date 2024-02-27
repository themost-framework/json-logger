
export declare interface JsonLoggerOptions {
    logLevel?: 'info' | 'error' | 'warn' | 'verbose' | 'debug';
    dateFormat?: string;
    format?: 'json' | 'raw';
    stdout?: WritableStream
    stderr?: WritableStream;
}

export declare class JsonLogger {

    constructor(options?: JsonLoggerOptions);

    level: number;

    static Levels: {
        error: number,
        warn: number,
        info: number,
        verbose: number,
        debug: number
    }

    log(...args: any[]): void;
    info(...args: any[]): void;
    error(...args: any[]): void;
    warn(...args: any[]): void;
    verbose(...args: any[]): void;
    debug(...args: any[]): void;
}
