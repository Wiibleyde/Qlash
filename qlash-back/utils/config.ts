import os from 'os';
import fs from 'fs';
import path from 'path';


export const getIpAddress = (): string[] => {
    if (process.env.ISDOCKER === 'true') {
        return ['localhost'];
    }
    const nets = os.networkInterfaces();
    const interfaces: os.NetworkInterfaceInfo[] = [];
    for (const name of Object.keys(nets)) {
        const netInfo = nets[name];
        if (netInfo) {
            for (const iface of netInfo) {
                if (iface.family === 'IPv4' && !iface.internal) {
                    interfaces.push(iface);
                }
            }
        }
    }
    return interfaces.map(iface => iface.address) || ['localhost'];
}

export const updateBackEnv = (address: string) => {
    const projectRoot = path.resolve(__dirname, '../');
    const envFilePath = path.join(projectRoot, '.env');
    let envContent = '';
    if (fs.existsSync(envFilePath)) {
        envContent = fs.readFileSync(envFilePath, 'utf8');
        // Remplace la ligne HOST si elle existe, sinon ajoute-la
        if (/^HOST=.*/m.test(envContent)) {
            envContent = envContent.replace(/^HOST=.*/m, `HOST="${address}"`);
        } else {
            envContent += `\nHOST="${address}"\n`;
        }
    } else {
        // Crée le fichier avec la ligne HOST si il n'existe pas
        envContent = `HOST="${address}"\n`;
        fs.writeFileSync(envFilePath, envContent, 'utf8');
        console.log(`Created ${envFilePath} with HOST="${address}"`);
        return;
    }
    fs.writeFileSync(envFilePath, envContent, 'utf8');
    console.log(`Updated ${envFilePath} with HOST="${address}"`);
}

export const updateEnvVariable = (address: string) => {
    const filesPath = ['../../qlash-mobile/.env', '../../qlash-web/.env'];
    const envVarNames = ['HOST', 'NEXT_PUBLIC_HOST'];
    for (let i = 0; i < filesPath.length; i++) {
        const envFilePath = path.resolve(__dirname, filesPath[i] as string);
        const envVarName = envVarNames[i];
        let envContent = '';
        if (fs.existsSync(envFilePath)) {
            envContent = fs.readFileSync(envFilePath, 'utf8');
            const regex = new RegExp(`^${envVarName}=.*`, 'm');
            if (regex.test(envContent)) {
                envContent = envContent.replace(regex, `${envVarName}="${address}"`);
            } else {
                envContent += `\n${envVarName}="${address}"\n`;
            }
        } else {
            envContent = `${envVarName}="${address}"\n`;
            fs.writeFileSync(envFilePath, envContent, 'utf8');
            console.log(`Created ${envFilePath} with ${envVarName}="${address}"`);
            continue;
        }
        fs.writeFileSync(envFilePath, envContent, 'utf8');
        console.log(`Updated ${envFilePath} with ${envVarName}="${address}"`);
    }
}