import { getApplications } from './application-launcher';
import { APPLICATIONS_DIR } from './consts';

const applications = getApplications();

if (!applications.length) {
    console.log('No applications found, make sure', APPLICATIONS_DIR, 'has application files');
}

applications.forEach(application => console.log(application.name));
