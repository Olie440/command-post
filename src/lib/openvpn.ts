import { Application } from "./application";
import { execSync } from "child_process";
import { getConfig } from "./config";

function createApplication(): Application {
    const instanceCount = execSync('ps -A | grep openvpn | wc -l',  { encoding: 'utf8' });

    if (Number(instanceCount) === 0) {
        const { openvpn } = getConfig();
        return  {
            name: 'Start VPN',
            command: 'openvpn',
            args: ['--config', openvpn.configPath],
            type: 'Direct',
            source: 'code'
        }
    }

    return  {
        name: 'Stop VPN',
        command: 'killall',
        args: ['openvpn'],
        type: 'Direct',
        source: 'code'
    }
}

export default createApplication();
