import { spawn } from 'child_process';
import { getApplication } from './application-launcher';

export enum SplitDirection {
    Horizontal = 'h',
    Vertical = 'v',
    None = 'none'
}

export function spawnWindow(name: string, split: SplitDirection): void {
    if (split === SplitDirection.None) {
        spawn('i3-msg', [ 'workspace', name ], { detached: true });
    } else {
        spawn('i3-msg', [ 'split', split ], { detached: true });
    }
}

export function spawnApplication(name: string, split: SplitDirection): void {
    const application = getApplication(name);

    if (!application.floating && application.type !== 'Command') {
        spawnWindow(application.name, split);
    }

    spawn('i3-msg', [ 'exec', application.command, ...application.args], { detached: true });
}