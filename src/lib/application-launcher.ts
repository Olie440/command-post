import { readdirSync, existsSync, mkdirSync } from 'fs';
import { isNull, isArray, find, sortBy } from 'lodash';
import { APPLICATIONS_DIR } from './consts';
import { Application, isApplication, fileToApplication } from './application'
import openvpn from './openvpn';

const filenamePattern = /.*\.application\.json$/;


function generateApplicationList(): Application[] {
    const applications = readdirSync(APPLICATIONS_DIR, { encoding: 'utf8' })
        .filter(filename => filename.match(filenamePattern))
        .map(filename => `${APPLICATIONS_DIR}/${filename}`)
        .map(fileToApplication)
        .filter(isApplication)
        .concat(openvpn);

    return sortBy(applications, 'name');
}

export function getApplications(): Application[] {
    if (!existsSync(APPLICATIONS_DIR)) {
        mkdirSync(APPLICATIONS_DIR);
        return [];
    }

    return generateApplicationList();
}

export function getApplication(application: string): Application {
    const applications = getApplications();
    return find(applications, { name: application });
}
