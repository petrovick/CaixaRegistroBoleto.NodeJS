const axios = require('axios');
var apiToken = require('../../services/apiToken');
var apiLog = require('../../services/apiLog');

module.exports = async function(logRequisicao) {

    const { data } = await apiLog.post(process.env.URL_API_LOG_METHOD, {
        LogRequisicao: logRequisicao
    });
    return data.result;
}
