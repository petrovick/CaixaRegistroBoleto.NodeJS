const axios = require('axios')

var apiToken = axios.create({
    baseURL: process.env.URL_API_TOKEN
})

apiToken.interceptors.request.use(function (config) {

    if(process.env.USAR_PROXY_SERVICO_LOG && process.env.USAR_PROXY_SERVICO_LOG === 'true') {
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

    return config;

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


module.exports = apiToken;
