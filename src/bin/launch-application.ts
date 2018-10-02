import { getApplications } from '../lib/application-launcher';
import launchRofi from '../lib/rofi';
import { APPLICATIONS_DIR } from '../lib/consts';
import { spawnApplication, SplitDirection } from '../lib/i3';

export default function launchApplication(split: SplitDirection): void {
    const applications = getApplications();

    if (!applications.length) {
        console.log('No applications found, make sure', APPLICATIONS_DIR, 'has application files');
        process.exit(1);
    }

    launchRofi(applications)
        .then((name) => spawnApplication(name, split))
}