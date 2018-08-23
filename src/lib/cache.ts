import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { createHash } from 'crypto';
import { isObject, isString, isUndefined } from 'lodash';

export interface Cache {
    hash: string
    data: any
}

function isCache(json: any): json is Cache {
    return (
        isObject(json) &&
        isString(json.hash) &&
        !isUndefined(json.data)
    );
}

function getDirectoryHash(directoryPath: string): string {
    const hash = createHash('sha1');

    hash.update(
        execSync(`ls -l ${directoryPath}`, { encoding: 'utf8' })
    );

    return hash.digest('hex');
}

export function getCache(directoryPath: string, filename: string): Cache {
    const filePath = `${directoryPath}/${filename}`;

    if (!existsSync(filePath)) {
        return null;
    }

    const cache = JSON.parse(
        readFileSync(filePath, { encoding: 'utf8' })
    );

    if (!isCache(cache)) {
        return null;
    }

    const directoryHash = getDirectoryHash(directoryPath);

    if (directoryHash !== cache.hash) {
        return null;
    }

    return cache;
}

export function createCache(directoryPath: string, filename: string, data: any): void {
    const filePath = `${directoryPath}/${filename}`;

    if (!existsSync(directoryPath)) {
        return null;
    }

    if (existsSync(filePath)) {
        unlinkSync(filePath);
    }

    const cache = {
        hash: getDirectoryHash(directoryPath),
        data: data
    }

    writeFileSync(filePath, JSON.stringify(cache));
}
