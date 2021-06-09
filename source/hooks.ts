import { IBuildTaskOption } from '../@types';
import { IBuildResult } from '../@types';
import * as fs from "fs";
import * as os from "os";
interface IOptions {
    commonTest1: number;
    commonTest2: 'opt1' | 'opt2';
    webTestOption: boolean;
}

const PACKAGE_NAME = 'huaweivr';

interface ITaskOptions extends IBuildTaskOption {
    packages: {
        'cocos-plugin-template': IOptions;
    };
}

function log(...arg: any[]) {
    return console.log(`[${PACKAGE_NAME}] `, ...arg);
}

let allAssets = [];

export const throwError = true;

export async function load() {
    console.log(`[${PACKAGE_NAME}] Load cocos plugin example in builder.`);
    allAssets = await Editor.Message.request('asset-db', 'query-assets');
}

export async function onBeforeBuild(options: ITaskOptions) {
    // Todo some thing
    log(`${PACKAGE_NAME}.webTestOption`, 'onBeforeBuild');
}

export async function onBeforeCompressSettings(options: ITaskOptions, result: IBuildResult) {
    const pkgOptions = options.packages[PACKAGE_NAME];
    if (pkgOptions.webTestOption) {
        console.debug('webTestOption', true);
    }
    // Todo some thing
    console.debug('get settings test', result.settings);
}

export async function onAfterCompressSettings(options: ITaskOptions, result: IBuildResult) {
    // Todo some thing
    console.log('webTestOption', 'onAfterCompressSettings');
}

export async function onAfterBuild(options: ITaskOptions, result: IBuildResult) {
    // change the uuid to test
    const uuidTestMap = {
        image: '57520716-48c8-4a19-8acf-41c9f8777fb0',
    }
    for (const name of Object.keys(uuidTestMap)) {
        const uuid = uuidTestMap[name];
        console.debug(`containsAsset of ${name}`, result.containsAsset(uuid));
        console.debug(`getAssetPathInfo of ${name}`, result.getAssetPathInfo(uuid));
        console.debug(`getRawAssetPaths of ${name}`, result.getRawAssetPaths(uuid));
        console.debug(`getJsonPathInfo of ${name}`, result.getJsonPathInfo(uuid));
    }
    if(fs.existsSync(result.dest +"/proj/libs")){
    }else{
        fs.mkdirSync(result.dest +"/proj/libs");
        fs.appendFileSync(result.dest +"/proj/settings.gradle",os.EOL + "include ':HuaweiVR'")
        const mypath = [...__dirname];
        for (let index = 0; index < __dirname.length; index++) {
            if(__dirname[index] == '\\'){
                mypath[index] = '/';
            }
        }
        fs.appendFileSync(result.dest +"/proj/settings.gradle",os.EOL + "project(':HuaweiVR').projectDir = new File('" + mypath.join("") +"/HVRSDK_XrDemo')");
        const configMessage = require(result.dest + "/cocos.compile.config.json");
        let temp = configMessage.android.ndkPath.replace(/\\/g,"\\\\");
        let ndkPath = temp.replace( /:/g,"\\:");
        fs.appendFileSync(result.dest +"/proj/local.properties",os.EOL + "ndk.dir=" + ndkPath);
    }
}

export function unload() {
    console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`);
}
