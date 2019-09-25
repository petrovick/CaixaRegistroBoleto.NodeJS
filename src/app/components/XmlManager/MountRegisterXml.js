const moment = require("moment");

module.exports = function(
    hash, agency, ip, cnpjBeneficiario,
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
    multa)
{
    const horaAgora = moment().format("YYYYMMDDHHmmss");

    dataVencimento = dataVencimento.length > 10 ? dataVencimento.substring(0, 10) : dataVencimento;
    dataEmissao = dataEmissao.length > 10 ? dataEmissao.substring(0, 10) : dataEmissao;


    var xmlRegister =
        '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> ' +
        '    <soapenv:Body xmlns:ns3="http://caixa.gov.br/sibar/manutencao_cobranca_bancaria/boleto/externo" xmlns:ns2="http://caixa.gov.br/sibar"> ' +
        '       <SERVICO_ENTRADA xmlns="http://caixa.gov.br/sibar/manutencao_cobranca_bancaria/boleto/externo" > ' +
        '                     <ns2:HEADER xmlns=""> ' +
        "                             <VERSAO>1.0</VERSAO> " +
        "                             <AUTENTICACAO>" + hash + "</AUTENTICACAO> " +
        "                             <USUARIO_SERVICO>SGCBS02P</USUARIO_SERVICO> " +
        "                             <OPERACAO>INCLUI_BOLETO</OPERACAO> " +
        "                             <INDICE>0</INDICE> " +
        "                             <SISTEMA_ORIGEM>SIGCB</SISTEMA_ORIGEM> " +
        "                             <UNIDADE>" + agency + "</UNIDADE> " +
        "                             <IDENTIFICADOR_ORIGEM>" + ip + "</IDENTIFICADOR_ORIGEM> " +
        "                             <DATA_HORA>" + horaAgora + "</DATA_HORA> " +
        "                             <ID_PROCESSO>" + codigoBeneficiario + "</ID_PROCESSO> " +
        "             </ns2:HEADER> " +
        '      <DADOS xmlns=""> ' +
        "         <INCLUI_BOLETO> " +
        "            <CODIGO_BENEFICIARIO>" + codigoBeneficiario + "</CODIGO_BENEFICIARIO> " +
        "            <TITULO> " +
        "               <NOSSO_NUMERO>" + nossoNumero + "</NOSSO_NUMERO> " +
        "               <NUMERO_DOCUMENTO>" + numeroDocumento + "</NUMERO_DOCUMENTO> " +
        "               <DATA_VENCIMENTO>" + dataVencimento + "</DATA_VENCIMENTO> " +
        "               <VALOR>" + valor + "</VALOR> " +
        "               <TIPO_ESPECIE>99</TIPO_ESPECIE> " +
        "               <FLAG_ACEITE>N</FLAG_ACEITE> " +
        "               <DATA_EMISSAO>" + dataEmissao + "</DATA_EMISSAO> ";

        //if(jurosMora)
        //{
            xmlRegister += "               <JUROS_MORA> ";
            if(jurosMora)
            {
                if(jurosMora.data) {
                    xmlRegister +=
                        "                  <DATA>" + jurosMora.data + "</DATA> ";
                }
                if(jurosMora.tipo) {
                    xmlRegister += "                  <TIPO>" + jurosMora.tipo + "</TIPO> ";

                    if(jurosMora.valor)
                    {
                        xmlRegister +=
                            "                  <VALOR>" + jurosMora.valor + "</VALOR> ";
                    }
                    else if(jurosMora.percentual)
                    {
                        xmlRegister +=
                            "                  <PERCENTUAL>" + jurosMora.percentual + "</PERCENTUAL> ";
                    }//OBRIGATORIAMENTE O CEF NECESSITA TER UM VALOR/PERCENTUAL PARA O JUROS/MORA, QUANDO NÃO INFORMADO SERÁ ZERADO.
                    else {
                        xmlRegister += "                  <VALOR>0</VALOR> ";
                    }
                }
                else {
                    xmlRegister += "                  <TIPO>ISENTO</TIPO> ";
                    xmlRegister += "                  <VALOR>0.0</VALOR> ";
                }
            }
            else
            {
                xmlRegister += "                  <TIPO>ISENTO</TIPO> ";
                xmlRegister += "                  <VALOR>0.0</VALOR> ";
            }
            xmlRegister += "               </JUROS_MORA> ";
        //}

        xmlRegister +=
            "               <VALOR_ABATIMENTO>0</VALOR_ABATIMENTO> ";
        xmlRegister +=
            "               <POS_VENCIMENTO> " ;

        xmlRegister +=
            "                  <ACAO>" + posVencimento.acao + "</ACAO> " +
            "                  <NUMERO_DIAS>" + posVencimento.numeroDias +  "</NUMERO_DIAS> ";

        xmlRegister +=
            "               </POS_VENCIMENTO> ";

        xmlRegister +=
            "               <CODIGO_MOEDA>09</CODIGO_MOEDA> " +
            "               <PAGADOR> ";
        if(pagador.cpf)
        {
            xmlRegister +=
                "                  <CPF>" + pagador.cpf + "</CPF> " +
                "                  <NOME>"+ (pagador.nome ? pagador.nome.replace('&', 'e').substring(0, 40) : '' ) + "</NOME> ";
        }
        else if(pagador.cnpj)  {
            xmlRegister +=
                "                  <CNPJ>" + pagador.cnpj + "</CNPJ> " +
                "                  <RAZAO_SOCIAL>"+ (pagador.razaoSocial ? pagador.razaoSocial.replace('&', 'e').substring(0, 40) : '') + "</RAZAO_SOCIAL> ";
        }
        if(pagador.endereco)
        {
            xmlRegister +=
                "                  <ENDERECO> " +
                "                     <LOGRADOURO>" + (pagador.endereco.logradouro ? pagador.endereco.logradouro.substring(0, 40) : '' ) + "</LOGRADOURO> " +
                "                     <BAIRRO>" + (pagador.endereco.bairro ? pagador.endereco.bairro.substring(0, 15) : '') + "</BAIRRO> " +
                "                     <CIDADE>" + (pagador.endereco.cidade ? pagador.endereco.cidade.substring(0, 15) : '') + "</CIDADE> " +
                "                     <UF>" + (pagador.endereco.uf ? pagador.endereco.uf.substring(0, 2) : '' )+ "</UF> " +
                "                     <CEP>" + (pagador.endereco.cep ? (pagador.endereco.cep + '').substring(0,8) : '') + "</CEP> " +
                "                  </ENDERECO> ";
        }


        xmlRegister +=
            "               </PAGADOR> ";
        if(sacadorAvalista)
        {
            xmlRegister += "               <SACADOR_AVALISTA> ";

            if(sacadorAvalista.cpf)
            {
                xmlRegister +=
                    "                  <CPF>" + pagador.cpf + "</CPF> " +
                    "                  <NOME>" + pagador.nome + "</NOME> ";
            }
            else if(sacadorAvalista.cnpj)  {
                xmlRegister +=
                    "                  <CNPJ>" + pagador.cnpj + "</CNPJ> " +
                    "                  <RAZAOSOCIAL>"+ pagador.nome + "</RAZAOSOCIAL> ";
            }
            xmlRegister += "               </SACADOR_AVALISTA> ";
        }

        if(multa) {

            xmlRegister +=
                "               <MULTA> ";
            if(multa.data) {
                xmlRegister +=
                    "                  <DATA>" + multa.data.substring(0, 10) + "</DATA> ";
            }

            if(multa.valor)
            {
                xmlRegister +=
                    "                  <VALOR>" + multa.valor + "</VALOR> ";
            }
            else if(multa.percentual)
            {
                xmlRegister +=
                    "                  <PERCENTUAL>" + multa.percentual + "</PERCENTUAL> ";
            }

            xmlRegister +=
                "               </MULTA> ";

        }

        xmlRegister +=
            "               <VALOR_IOF>0</VALOR_IOF> " +
            "               <IDENTIFICACAO_EMPRESA>" + cnpjBeneficiario + "</IDENTIFICACAO_EMPRESA> " +
            "               <FICHA_COMPENSACAO> " +
            "                  <MENSAGENS> " +
            "                     <MENSAGEM /> " +
            "                  </MENSAGENS> " +
            "               </FICHA_COMPENSACAO> " +
            "               <RECIBO_PAGADOR> " +
            "                  <MENSAGENS> " +
            "                     <MENSAGEM /> " +
            "                  </MENSAGENS> " +
            "               </RECIBO_PAGADOR> " +
            "               <PAGAMENTO> " +
            "                  <QUANTIDADE_PERMITIDA>1</QUANTIDADE_PERMITIDA> " +
            "                  <TIPO>NAO_ACEITA_VALOR_DIVERGENTE</TIPO> " +
            "                  <VALOR_MINIMO>0</VALOR_MINIMO> " +
            "                  <VALOR_MAXIMO>0</VALOR_MAXIMO> " +
            "               </PAGAMENTO> " +
            "            </TITULO> " +
            "         </INCLUI_BOLETO> " +
            "      </DADOS> " +
            "   </SERVICO_ENTRADA> " +
            "</soapenv:Body> " +
            "</soapenv:Envelope> ";
        //console.log(xmlRegister);
        return xmlRegister;
};
