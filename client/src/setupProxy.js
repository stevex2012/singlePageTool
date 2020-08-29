const {createProxyMiddleware} = require("http-proxy-middleware");
module.exports = function(app){
    app.use(
        createProxyMiddleware("/remoteapi",{
            target:"https://test.fmootech.cn",
            changeOrigin:true,
        })
    )
}
