const soapRequest = require("easy-soap-request");
const moment = require("moment");
const DOMParser = require("xmldom").DOMParser;
var SHA256 = require("crypto-js/sha256");
var Base64 = require("crypto-js/enc-base64");

var XmlManager = require("../components/XmlManager/ExtractValue");
var MountQueryXml = require("../components/XmlManager/MountQueryXml");
var AuthHash = require('../components/AuthHash/index')

class DadosEnvController {
    async index(req, res) {

        return res.status(200).json({
            NODE_ENV:process.env.NODE_ENV,
            URL_CAIXA: process.env.URL_CAIXA,
            URL_CONSULTA_METHOD: process.env.URL_CONSULTA_METHOD,
            URL_REGISTRO_METHOD: process.env.URL_REGISTRO_METHOD,
            URL_API_TOKEN: process.env.URL_API_TOKEN,
            URL_API_TOKEN_METHOD: process.env.URL_API_TOKEN_METHOD,
            URL_API_LOG: process.env.URL_API_LOG,
            URL_API_LOG_METHOD: process.env.URL_API_LOG_METHOD,
            USAR_SERVICO_LOG: process.env.USAR_SERVICO_LOG,
            USAR_PROXY_SERVICO_LOG: process.env.USAR_PROXY_SERVICO_LOG,
            USAR_PROXY_SERVICO_CAIXA: process.env.USAR_PROXY_SERVICO_CAIXA
        });

    }
}

module.exports = new DadosEnvController();
