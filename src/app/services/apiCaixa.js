const axios = require('axios')
const apiToken = require('./apiToken')

const apiCaixa = axios.create({
    baseURL: process.env.URL_CAIXA,
    headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        "Accept": "text/xml;charset=UTF-8"
    }
});

apiCaixa.defaults.timeout = 5000;

apiCaixa.interceptors.request.use(async function (config) {
    //console.log('Antes de entrar na API caixa')
    if(process.env.USAR_PROXY_SERVICO_CAIXA && process.env.USAR_PROXY_SERVICO_CAIXA === 'true') {
        //console.log('Colocou usar')
        config.proxy = {
            host: process.env.HTTP_PROXY_URL,
            port: process.env.HTTP_PROXY_PORT,
        }
        if(process.env.HTTP_PROXY_USER !== undefined)
        {
            config.proxy.auth = {
                username: process.env.HTTP_PROXY_USER,
                password: process.env.HTTP_PROXY_PASS
            }
        }
    }
    //console.log(config)
    return config;

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


module.exports = apiCaixa;
