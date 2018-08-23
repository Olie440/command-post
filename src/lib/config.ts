import { CONFIG_PATH } from './consts'
import { readFileSync, existsSync } from 'fs';

export interface Config {
    rofi?: RofiConfig
}

export interface RofiConfig {
    cmd?: string,
    theme?: string,
    lines?: string
}

export function getConfig(): Config {
    if (!existsSync(CONFIG_PATH)) {
        return {};
    }
    
    try {
        return JSON.parse(
            readFileSync(CONFIG_PATH, { encoding: 'utf8' })
        );
    } catch(e) {
        return {}
    }
}