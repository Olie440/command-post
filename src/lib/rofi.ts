import { exec } from 'child_process';
import { Promise } from 'es6-promise'

import { Application } from './application';
import { RofiConfig, getConfig } from './config';

function getRofiConfig(): RofiConfig {
    const config = getConfig();

    if (!config.rofi) {
        return {
            cmd: 'rofi'
        }
    }

    return {
        cmd: config.rofi.cmd || 'rofi',
        theme: config.rofi.theme,
        lines: config.rofi.lines
    }
}

function getRofiCommand(): string {
    const config = getRofiConfig();
    const commandParts = [
        config.cmd,
        '-dmenu'
    ]

    if (config.theme) {
        commandParts.push('-theme');
        commandParts.push(config.theme);
    }

    if (config.lines) {
        commandParts.push('-lines');
        commandParts.push(config.lines);
    }

    return commandParts.join(' ');
}
export default function launchRofi(applications: Application[]): Promise<string> {
    console.log(getRofiCommand())
    return new Promise(
        (resolve, reject) => {
            const rofi = exec(getRofiCommand(), (error: Error, stdin: string) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(stdin.replace('\n', ''));
                }
            });
        
            rofi.stdin.write(
                applications.map(x => x.name).join('\n')
            );
            rofi.stdin.end();
        }
    );
}