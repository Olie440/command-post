import launchApplication from './bin/launch-application';

const [ command, ...args ] = process.argv.slice(2);

switch(command) {
    case 'application-launcher':
        launchApplication();
        break;

    default:
        console.log('command', command, 'not found');
}