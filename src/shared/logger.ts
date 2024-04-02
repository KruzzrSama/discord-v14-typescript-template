export default class Logger {
    namespace: string;
    constructor(namespace: string) {
        this.namespace = namespace;
    }
    public error(content: string | any) {
        Logger.write(this.namespace, content, LogType.Error);
    }
    public success(content: string | any) {
        Logger.write(this.namespace, content, LogType.Success);
    }
    public info(content: string | any) {
        Logger.write(this.namespace, content, LogType.Information);
    }
    public warn(content: string | any) {
        Logger.write(this.namespace, content, LogType.Warning);
    }
    public normal(content: string | any) {
        Logger.write(this.namespace, content);
    }

    private static write(namespace: string, content: any, type?: LogType) {
        console.log(`${type && type + ": "}${namespace.toUpperCase()} > ${content}`);
    }
}

enum LogType {
    Error = "ERROR",
    Success = "SUCCESS",
    Information = "INFO",
    Warning = "WARN"
}