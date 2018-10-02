import launchApplication from './bin/launch-application';
import { SplitDirection } from './lib/i3';

const [ command, ...args ] = process.argv.slice(2);

switch(command) {
    case 'application-launcher':
        launchApplication(SplitDirection.None);
        break;
    
    case 'split-horizontal':
        launchApplication(SplitDirection.Horizontal);
        break;

    case 'split-vertical':
        launchApplication(SplitDirection.Vertical);
        break;

    default:
        console.log('command', command, 'not found');
}