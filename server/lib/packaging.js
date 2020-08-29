

/**
 * 
 * 打包接口
 * 
 */
const fs = require('fs');
const path = require('path');
let process = require('child_process');
//
function flatProps(props) {
    let result = '';
    for (let key in props) {
        result += ` ${key}={${JSON.stringify(props[key])}}`
    }
    return result;
}
//根据数据构造 import 组件，和实例化组件
function importsAndComponents(list, isPc) {
    //记录已引用的组件
    const importedArrs = [];
    function getResult(list) {
        let importList = '';
        const componetRoot = isPc ? 'pc' : 'h5';
        let componentsInstance = '';
        list.forEach(item => {
            const { name, props, children } = item;
            if (!importedArrs.includes(name)) {
                importedArrs.push(name);
                importList += `import ${name} from './src/pageComponents/${componetRoot}/${name}/${name}.jsx';`;
            }
            const childrenComponents = children && getResult(children) || { importList: '', componentsInstance: '' };
            importList += childrenComponents.importList;
            componentsInstance += `<${name} ${flatProps({ ...props })}>${childrenComponents.componentsInstance}</${name}>`;
        })
        return {
            importList,
            componentsInstance
        }
    }
    return getResult(list);
}
const packageTasks = []; //动态变化的
let isPackaging = false;
function doPackage(component_json) {
    packageTasks.push(component_json);
    return packaging();// packaging应该是一个动态检测函数
}
const packaging = () => {
    //TODO 队列 
    return new Promise((resolve, reject) => {
        var timer = setInterval(() => {
            if (!isPackaging && packageTasks.length) {
                isPackaging = true;
                doWebpack(packageTasks[0]);
            } 
            if(!packageTasks.length) {
                clearInterval(timer);
            }
        }, 50)
        function doWebpack(component_json) {
            //根据数据动态创建入口
            const { pc = [], h5 = [] } = JSON.parse(component_json);
            //pc 组件，h5 组件 
            //动态创建一个打包入口文件  entry.js 使用fs写入到client目录下
            //记录已引用的组件
            const pcData = importsAndComponents(pc, 1);
            const h5Data = importsAndComponents(h5, 0);
            const id = new Date().getTime()
            const entryFile = `
            import React from 'react';
            import ReactDOM from 'react-dom';
            ${pcData.importList}
            ${h5Data.importList}
            ReactDOM.render(
                <div>
                ${pcData.componentsInstance}
                ${h5Data.componentsInstance}
            </div>,
            document.getElementById('steveroot')
            )
        `;
            console.log('=================打包================');
            // return;
            //动态写入文件 
            const writePath = path.resolve(__dirname, '../../client/entry.js');
            //先删除文件，
            try {
                console.log('=========先删除打包入口文件:', writePath);
                fs.unlinkSync(writePath)
            } catch (e) {
                console.log(e);
            }
            //写入文件 
            console.log('=========写入打包文件:', writePath);
            fs.writeFile(writePath, entryFile, (err) => {
                if (err) throw err;
                console.log('=====打包入口文件已生成===', writePath);
                //执行webpack 打包
                console.log('=====使用process.exec 执行打包命令 yarn run buildPage===');
                process.exec('yarn run buildPage', {
                    maxBuffer: 5000 * 1024, // 默认 200 * 1024
                }, function (err) {
                    if (err) {
                        console.log(err);
                        reject(err);
                        packageTasks.length = 0;
                    }
                    console.log('=====打包成功===');
                    const buildPath = path.resolve(__dirname, '../../client/buildDist/index.html');
                    console.log('=====读取打包后的文件===', buildPath);
                    fs.readFile(buildPath, 'utf8', (err, file) => {
                        if (err) throw err;
                        resolve(file);
                        packageTasks.shift();
                        isPackaging = false;
                    })
                    //读取打包后的文件
                });
            });
        }
    })
}
// module.exports = packaging;
module.exports = doPackage;