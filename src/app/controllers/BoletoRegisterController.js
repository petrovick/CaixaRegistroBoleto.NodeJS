const soapRequest = require("easy-soap-request");
const moment = require("moment");
const DOMParser = require("xmldom").DOMParser;

var XmlManager = require("../components/XmlManager/ExtractValue");
var MountRegisterXml = require("../components/XmlManager/MountRegisterXml");
var AuthHash = require('../components/AuthHash/index')
var ServicoLog = require('../components/Log')
var RegisterValidator = require('../Validators/Register')

var apiCaixa = require('../services/apiCaixa')

class BoletoRegisterController {
    async index(req, res) {
        var {ip,hostname,codigoBeneficiario,dataEmissao,dataVencimento,valor,
            jurosMora,posVencimento,nossoNumero,numeroDocumento,pagador,
            sacadorAvalista,multa
         } = req.body;

        var logRequisicao = undefined;

        /**
         * Should log when "URL_API_LOG" env is defined
         */
        if(process.env.URL_API_LOG) {
            logRequisicao = {
                DataRequisicao: new Date(),
                ParametroRequisicao: JSON.stringify(req.body),
                TipoRequisicao: 'I',
                IP: ip,
                NomeDaMaquina: hostname
            };
            logRequisicao = await ServicoLog(logRequisicao);
        }

        RegisterValidator(req.body);

        var hash = AuthHash(codigoBeneficiario, nossoNumero, dataVencimento, valor , process.env.CNPJ_BENEFICIARIO);

        /**/
        const xmlQuery = MountRegisterXml(
            hash,process.env.AGENCY,ip,process.env.CNPJ_BENEFICIARIO,
            codigoBeneficiario,dataEmissao,dataVencimento,valor,jurosMora,
            posVencimento,nossoNumero,numeroDocumento,pagador,sacadorAvalista,multa);

        var response = {};
        var statusCode = {};
        try
        {
            const {data, status} = await apiCaixa.post(process.env.URL_REGISTRO_METHOD, xmlQuery, { headers: {"SOAPAction": "IncluiBoleto"}}); // Optional timeout parameter(milliseconds)
            response = data;
            statusCode = status;

            /*Log CEF Response*/
            if(logRequisicao) {
                logRequisicao.Outros = JSON.stringify(response);
                logRequisicao = await ServicoLog(logRequisicao);
            }

        }
        catch(err) {
            return res.status(500).json(
                {
                    mensagem: err + '',
                    situacao: 500
                }
            );
        }


        if(statusCode !== 200)
        {
            return res.status(200).json({
                mensagem: JSON.stringify(response),
                situacao: statusCode
            });
        }

        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(response, "text/xml");

        var codRetorno = await XmlManager.GetXmlNodeValue(xmlDoc,"COD_RETORNO");
        var mensagem = '';


        if (codRetorno !== '00') {
            mensagem = await XmlManager.GetXmlNodeValue(xmlDoc,"DADOS.EXCECAO");
            return res.status(200).json({
                mensagem,
                situacao: 500
            });
        }
        else {
            mensagem = await XmlManager.GetXmlNodeValue(xmlDoc,"DADOS.CONTROLE_NEGOCIAL.RETORNO");
            codRetorno = await XmlManager.GetXmlNodeValue(xmlDoc,"DADOS.CONTROLE_NEGOCIAL.COD_RETORNO");
            if(codRetorno == 0)
            {
                const codigoDeBarras =  await XmlManager.GetXmlNodeValue(xmlDoc,"INCLUI_BOLETO.CODIGO_BARRAS");
                const linhaDigitavel = await XmlManager.GetXmlNodeValue(xmlDoc,"INCLUI_BOLETO.LINHA_DIGITAVEL");
                const nossoNumero = await XmlManager.GetXmlNodeValue(xmlDoc,"INCLUI_BOLETO.NOSSO_NUMERO");
                const url = await XmlManager.GetXmlNodeValue(xmlDoc,"INCLUI_BOLETO.URL");

                return res.status(200).json({
                    mensagem,
                    situacao: 200,
                    codigoDeBarras,
                    linhaDigitavel,
                    nossoNumero,
                    url
                });

            }
            else
            {
                mensagem = await XmlManager.GetXmlNodeValue(xmlDoc,"DADOS.CONTROLE_NEGOCIAL.RETORNO");
                return res.status(200).json({
                    mensagem,
                    situacao: 500
                });
            }
        }

    }
}

module.exports = new BoletoRegisterController();
