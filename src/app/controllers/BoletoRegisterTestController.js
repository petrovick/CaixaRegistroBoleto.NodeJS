const soapRequest = require('easy-soap-request')
const moment = require('moment')
const DOMParser = require('xmldom').DOMParser

class BoletoRegisterController {
  async index (req, res) {
    var {
      codigoBeneficiario,
      dataEmissao,
      dataVencimento,
      valor,
      jurosMora,
      posVencimento,
      nossoNumero,
      numeroDocumento,
      pagador,
      sacadorAvalista,
      multa
    } = req.body

    return res.status(200).json(
      {
        mensagem: 'Serviço de teste.',
        status: 200,
        url: 'https://boletoonline.caixa.gov.br/ecobranca/SIGCB/imprimir/1234567/1'
      }
    )
  }
}

module.exports = new BoletoRegisterController()
