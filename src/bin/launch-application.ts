import { spawn } from 'child_process';

import { getApplication, getApplications } from '../lib/application-launcher';
import launchRofi from '../lib/rofi';
import { APPLICATIONS_DIR } from '../lib/consts';

function spawnApplication(name: string): void {
    const application = getApplication(name);

    if (!application.floating) {
        spawn('i3-msg', [ 'workspace', application.name ], { detached: true });
    }

    spawn('i3-msg', [ 'exec', application.command, ...application.args], { detached: true });
}

export default function launchApplication(): void {
    const applications = getApplications();

    if (!applications.length) {
        console.log('No applications found, make sure', APPLICATIONS_DIR, 'has application files');
        process.exit(1);
    }

    launchRofi(applications).then(spawnApplication)
}