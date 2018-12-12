let log = require('color-console');
let fs = require('fs');
let path = require('path');
let fsSync = require('fs-sync');
var ejs = require('ejs');

let package_obj = {};

let package_name = process.env.npm_config_package;

package_obj.name = package_name;
package_obj.name_lower = package_name.toLowerCase();
package_obj.namespace = process.env.npm_config_namespace;

let template_path = './templates/package/';


let list_arr = [];
let list = traverseDir(template_path, list_arr);

let file_name;
let file_content;
let new_path;
let des_path;

log.green('Package Name='+package_obj.name+" | Namespace="+package_obj.namespace);
log.green("Following files are generated:");
log.green("=============================================================================");


list.forEach(function(item) {


    file_content = fs.readFileSync(item).toString();

    file_name = path.basename(item);
    new_path = item.replace('templates', '');
    new_path = new_path.replace('package', '');
    new_path = new_path.replace(/\\/,'');
    new_path = new_path.replace(/\\/,'');


    new_path = new_path.replace(file_name,'');

    switch(file_name) {
        case 'packagename.php':
            file_name = package_obj.name_lower+'.php';
            break;
        case 'ServiceProvider.ejs':
            file_content = fs.readFileSync(item).toString();
            file_content = ejs.render(file_content, package_obj);
            file_name = package_obj.name+file_name+'.php';
            break;
    }

    des_path = new_path+file_name;

    log.green(des_path);

    fsSync.write(des_path, file_content);

});




function traverseDir(dir, list_arr){



    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            //log.cyan(fullPath);
            traverseDir(fullPath, list_arr);
        } else {

            list_arr.push(fullPath);
            //log.yellow(fullPath);
        }
    });



    return list_arr;
}
