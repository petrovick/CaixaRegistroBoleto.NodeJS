const soapRequest = require('easy-soap-request')
const moment = require('moment')
const DOMParser = require('xmldom').DOMParser
var SHA256 = require('crypto-js/sha256')
var Base64 = require('crypto-js/enc-base64')

var XmlManager = require('../components/XmlManager/ExtractValue')
var MountQueryXml = require('../components/XmlManager/MountQueryXml')
var AuthHash = require('../components/AuthHash/index')
var ServicoLog = require('../components/Log')

var apiCaixa = require('../services/apiCaixa')

class BoletoQueryController {
  async index (req, res) {
    const { ip, hostname, codigoBeneficiario: beneficiaryCode, nossoNumero: ourNumber } = req.body

    //console.log(req.body);
    const headersConsulta = {
      'Content-Type': 'text/xml;charset=UTF-8'
    }

    var logRequisicao = undefined

    if (process.env.URL_API_LOG) {
      logRequisicao = {
        DataRequisicao: new Date(),
        ParametroRequisicao: JSON.stringify(req.body),
        TipoRequisicao: 'C',
        IP: ip,
        NomeDaMaquina: hostname
      }
      //console.log(JSON.stringify(logRequisicao));
      logRequisicao = await ServicoLog(logRequisicao)
    }

    var hash = AuthHash(beneficiaryCode, ourNumber, 0, 0, process.env.CNPJ_BENEFICIARIO)

    const currentDateTime = moment().format('YYYYMMDDHHmmss')

    const xmlQuery = MountQueryXml(hash, process.env.AGENCY, ip, currentDateTime, beneficiaryCode, ourNumber)

    var response = {}
    var statusCode = {}
    try {
      //console.log('Chegou aqui')
      const { data, status } = await apiCaixa.post(process.env.URL_CONSULTA_METHOD, xmlQuery) // Optional timeout parameter(milliseconds)
      
      response = data
      statusCode = status

      /*Log CEF Response*/
      if(logRequisicao) {
          logRequisicao.Outros = JSON.stringify(response);
          logRequisicao = await ServicoLog(logRequisicao);
      }
      
    } catch (err) {
      return res.status(200).json(
        {
          mensagem: err + '',
          status: 500
        }
      )
    }

    if (statusCode !== 200) {
      return res.status(200).json({
        mensagem: JSON.stringify(response),
        status: statusCode
      })
    }

    var parser = new DOMParser()
    var xmlDoc = parser.parseFromString(response, 'text/xml')

    var codRetorno = await XmlManager.GetXmlNodeValue(xmlDoc, 'COD_RETORNO')
    var mensagem = ''
    var mensagemExcecao = ''
    
    if (codRetorno !== '00') {
      mensagem = await XmlManager.GetXmlNodeValue(xmlDoc, 'consultacobrancabancaria:SERVICO_SAIDA.MSG_RETORNO')
      mensagemExcecao = await XmlManager.GetXmlNodeValue(xmlDoc, 'DADOS.EXCECAO')
      
      return res.status(200).json({
        mensagemExcecao,
        mensagem,
        situacao: 500
      })

    } else {
      mensagem = await XmlManager.GetXmlNodeValue(xmlDoc, 'MENSAGENS.RETORNO')
      mensagem += await XmlManager.GetXmlNodeValue(xmlDoc, 'consultacobrancabancaria:SERVICO_SAIDA.MSG_RETORNO')
      codRetorno = await XmlManager.GetXmlNodeValue(xmlDoc, 'CONTROLE_NEGOCIAL.COD_RETORNO')
      mensagemExcecao = await XmlManager.GetXmlNodeValue(xmlDoc, 'DADOS.EXCECAO')


      if (codRetorno != '0') {
        return res.status(200).json({
          mensagemExcecao,
          mensagem,
          situacao: 500
        })
      } else {
        
        const codigoDeBarras =  await XmlManager.GetXmlNodeValue(xmlDoc, 'TITULO.CODIGO_BARRAS')
        const dataEmissao =     await XmlManager.GetXmlNodeValue(xmlDoc, 'TITULO.DATA_EMISSAO')
        const dataJurosMora =   await XmlManager.GetXmlNodeValue(xmlDoc, 'TITULO.DATA')
        const dataMulta =       await XmlManager.GetXmlNodeValue(xmlDoc, 'TITULO.MULTA.DATA')
        const dataVencimento =  await XmlManager.GetXmlNodeValue(xmlDoc, 'TITULO.DATA_VENCIMENTO')
        const flagRegistro =    await XmlManager.GetXmlNodeValue(xmlDoc, 'FLAG_REGISTRO')
        const linhaDigitavel =  await XmlManager.GetXmlNodeValue(xmlDoc, 'TITULO.LINHA_DIGITAVEL')
        const numeroDocumento = await XmlManager.GetXmlNodeValue(xmlDoc, 'TITULO.NUMERO_DOCUMENTO')
        const tipoEspecie =     await XmlManager.GetXmlNodeValue(xmlDoc, 'TITULO.TIPO_ESPECIE')
        const tipoJuros =       await XmlManager.GetXmlNodeValue(xmlDoc, 'TITULO.JUROS_MORA.TIPO')
        const urlBoleto =       await XmlManager.GetXmlNodeValue(xmlDoc, 'TITULO.URL')
        const valor =           await XmlManager.GetXmlNodeValue(xmlDoc, 'TITULO.VALOR')
        const valorJuros =      await XmlManager.GetXmlNodeValue(xmlDoc, 'TITULO.JUROS_MORA.VALOR')
        
        const valorMulta = await XmlManager.GetXmlNodeValue(xmlDoc, 'TITULO.MULTA.VALOR')

        return res.status(200).json({
          mensagem,
          situacao: 200,
          codigoDeBarras,
          dataEmissao,
          dataJurosMora,
          dataMulta,
          dataVencimento,
          flagRegistro: flagRegistro === 'S',
          linhaDigitavel,
          numeroDocumento,
          tipoEspecie,
          tipoJuros,
          urlBoleto,
          valor: parseFloat(valor),
          valorJuros: parseFloat(valorJuros),
          valorMulta: parseFloat(valorMulta)
        })
      }
    }
  }
}

module.exports = new BoletoQueryController()
