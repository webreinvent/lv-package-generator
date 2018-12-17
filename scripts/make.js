let log = require('color-console');
let readlineSync = require('readline-sync');
let fs = require('fs');
let path = require('path');
let fsSync = require('fs-sync');
let ejs = require('ejs');

var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);


/*
|--------------------------------------------------------------------------
| Get Package Configuration
|--------------------------------------------------------------------------
*/
let package_config = {};


let config_file = './config.json';
//check config files
if (!fs.existsSync(config_file)) {
    log.red("'"+config_file+"' file does not exist.");
    log.red("You must run 'npm run start' to generate the package and config.json file");
    return false;
}

file_content = fs.readFileSync(config_file).toString();

package_config = JSON.parse(file_content);

let args = process.argv;

let maker = args[2];

if(!maker)
{
    log.red("'npm run make [command]:[name]'");
    return false;
}

let agr = maker.split(":");

let type = agr[0];
let name = agr[1];

if(!type)
{
    log.red("'npm run make [command]:[name]'");
    return false;
}


log.green('Type='+type+" | Name="+name);
log.green("=============================================================================");


switch (type) {
    case 'model':
        console.log(type, 'smells quite badly.');
        break;
    case 'view':
        console.log(type, 'smells quite badly.');
        break;
    case 'controller':
        console.log(type, 'smells quite badly.');
        break;
    case 'seed':
        console.log(type, 'smells quite badly.');
        break;
    case 'migration':
        console.log(type, 'smells quite badly.');
        break;
    case 'pivot':
        console.log(type, 'smells quite badly.');
        break;
    case 'resource':
        console.log(type, 'smells quite badly.');
        break;

    default:
        log.red('Sorry, '+type+' does not match with any of the available command.');
}
