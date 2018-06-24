import { readdirSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { isNull, isArray } from 'lodash';
import { APPLICATIONS_DIR } from './consts';
import { Application, isApplication, fileToApplication } from './application'
import { Cache, getCache, createCache } from './cache';

const filenamePattern = /.*\.application\.json$/;

function getApplicationCache(): Application[] {
    const cache = getCache(APPLICATIONS_DIR, '.cache');

    if (isNull(cache) || !isArray(cache.data)) {
        return null;
    }

    return cache.data.filter(isApplication);
}

function generateApplicationList(): Application[] {
    return readdirSync(APPLICATIONS_DIR, { encoding: 'utf8' })
        .filter(filename => filename.match(filenamePattern))
        .map(filename => `${APPLICATIONS_DIR}/${filename}`)
        .map(fileToApplication)
        .filter(isApplication);
}

export function getApplications(): Application[] {
    if (!existsSync(APPLICATIONS_DIR)) {
        mkdirSync(APPLICATIONS_DIR);
        return [];
    }

    const cache = getApplicationCache();

    if (!isNull(cache)) {
        return cache;
    }

    const applications = generateApplicationList();
    createCache(APPLICATIONS_DIR, '.cache', applications);

    return applications;
}

