import { readdirSync, existsSync, mkdirSync } from 'fs';
import { APPLICATIONS_DIR } from './consts';
import { Application, fileToApplication } from './application'

const filenamePattern: RegExp = /.*\.application\.json$/;

export function getApplications(): Application[] {
    if (!existsSync(APPLICATIONS_DIR)) {
        mkdirSync(APPLICATIONS_DIR);
        return [];
    }

    return readdirSync(APPLICATIONS_DIR, { encoding: 'utf8' })
        .filter(filename => filename.match(filenamePattern))
        .map(filename => `${APPLICATIONS_DIR}/${filename}`)
        .map(fileToApplication)
        .filter(x => x !== null);
}

