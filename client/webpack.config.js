
// 打包 业务组件 webpack 配置
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const bundleName = 'bundle.js'
function getScriptsContent(data) {
    return `${data['bundle.js'].source()}`
};
//去掉换行
function clearBr(key) {
    key = key.replace(/<\/?.+?>/g, "");
    key = key.replace(/[\r\n]/g, "");
    return key;
}

const entry = path.resolve(__dirname, './entry.js');
module.exports = {
    // mode: 'development',
    mode: 'production',
    entry,
    output: {
        path: path.resolve(__dirname, 'buildDist'),
        filename: bundleName
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'styled-components': 'styled'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'steve',
            cache: false,
            filename: 'index.html',
            inject: false,
            minify: true,
            // {
            //     removeComments: true, // 移除HTML中的注释
            //     collapseWhitespace: true, // 删除空白符与换行符
            // },
            // 可以打包内联js ${htmlWebpackPlugin.tags.headTags}
            //必须等待 React  ReactDOM styled 已注入成全局变量，才初始化
            // js 加载顺寻 styled-components 依赖 react-is 
            templateContent: ({ htmlWebpackPlugin, compilation }) => `
    <html>
      <head>
        <title>test</title>
        ${htmlWebpackPlugin.tags.headTags}
      </head>
      <body>
      <script>
      var Lala = function(){}
      var test = (function (obj) {
          var scripts = [
              'https://df5apg8r0m634.cloudfront.net/react/react.production.min.js',
              'https://df5apg8r0m634.cloudfront.net/react/react-dom.production.min.js',
              'https://df5apg8r0m634.cloudfront.net/react/react-is.production.min.js'
          ];
          var styledScript = 'https://df5apg8r0m634.cloudfront.net/react/styled-components.min.js';
          obj.loadedJsNum = 0;
      
          obj.doRender = function(){
              var timer = setInterval(function(){
                  if(window.React && window.ReactDOM && window.styled && window.ReactIs){
                      clearInterval(timer);
                      ${getScriptsContent(compilation.assets)};
                  }
              },1000)
          }
      
          obj.loadScript = function(src,cb){
              var script =  document.createElement('script');
              script.src = src;
              document.querySelector('head').appendChild(script);
              script.onload = function(){
                  cb && cb();
              }
          }
          
          scripts.forEach(item=>{
              obj.loadScript(item,function(){
                  obj.loadedJsNum++;
                  if(obj.loadedJsNum==3){
                      obj.loadScript(styledScript,function(){
                          obj.doRender();
                      })
                  }
              });
          })
      
      })(new Lala())
      </script><div id="steveroot"></div>
        </body>
    </html>
  `

        })
    ]
};

// 加载  执行 // ${get(compilation.assets)}
// 第三方库 cdn 
{/* <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/react-is@16.13.1/umd/react-is.production.min.js"></script>
<script src="https://unpkg.com/styled-components/dist/styled-components.min.js"></script> */}