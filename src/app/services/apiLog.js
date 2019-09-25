const axios = require('axios')
const apiToken = require('./apiToken')

const apiLog = axios.create({
    baseURL: process.env.URL_API_LOG,
    headers: {
        'Content-Type': 'application/json'
    }
});

apiLog.interceptors.request.use(async function (config) {

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

    const { data } = await apiToken.get(process.env.URL_API_TOKEN_METHOD);
    const token = data.Result;

    const headers = { ...config.headers };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    config.headers = headers;
    return config;

}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


module.exports = apiLog;
