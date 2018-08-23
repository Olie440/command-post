import { readFileSync } from 'fs';
import { isObject, isString } from 'lodash';

export interface Application {
    name: string
    command: string
    type: string
    source: string,
    args?: Array<string>
}

export function isApplication(file: any): file is Application {
    return (
        isObject(file) &&
        isString(file.name) &&
        isString(file.command)
    );
}

export function fileToApplication(path: string): Application {
    let file;

    try {
        file = JSON.parse(
            readFileSync(path, { encoding: 'utf8' })
        );
    } catch(e) {
        return null;
    }

    if (!isApplication(file)) {
        return null;
    }

    return {
        name: file.name,
        command: file.command,
        type: file.type,
        source: path,
        args: file.args || []
    }
}
