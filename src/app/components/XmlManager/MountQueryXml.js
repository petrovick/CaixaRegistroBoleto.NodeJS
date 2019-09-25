module.exports = function(hash, agency, ip, currentDateTime, beneficiaryCode, ourNumber) {
    const xmlQuery =
            '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"> ' +
            '    <soapenv:Body xmlns:consultacobrancabancaria="http://caixa.gov.br/sibar/consulta_cobranca_bancaria/boleto" xmlns:sibar_base="http://caixa.gov.br/sibar"> ' +
            '    <SERVICO_ENTRADA xmlns="http://caixa.gov.br/sibar/consulta_cobranca_bancaria/boleto"> ' +
            '        <sibar_base:HEADER xmlns=""> ' +
            "            <VERSAO>1.0</VERSAO> " +
            "            <AUTENTICACAO>" + hash + "</AUTENTICACAO> " +
            "            <USUARIO_SERVICO>SGCBS02P</USUARIO_SERVICO> " +
            "            <OPERACAO>CONSULTA_BOLETO</OPERACAO> " +
            "            <INDICE>000</INDICE> " +
            "            <SISTEMA_ORIGEM>SIGCB</SISTEMA_ORIGEM> " +
            "            <UNIDADE>" + agency + "</UNIDADE> " +
            "            <IDENTIFICADOR_ORIGEM>" + ip +"</IDENTIFICADOR_ORIGEM> " +
            "            <DATA_HORA>" + currentDateTime + "</DATA_HORA> " +
            "            <ID_PROCESSO>" + beneficiaryCode + "</ID_PROCESSO> " +
            "        </sibar_base:HEADER> " +
            '        <DADOS xmlns=""> ' +
            "            <CONSULTA_BOLETO> " +
            "                <CODIGO_BENEFICIARIO>" + beneficiaryCode + "</CODIGO_BENEFICIARIO> " +
            "                <NOSSO_NUMERO>" + ourNumber + "</NOSSO_NUMERO> " +
            "            </CONSULTA_BOLETO> " +
            "        </DADOS> " +
            "    </SERVICO_ENTRADA> " +
            "</soapenv:Body> " +
            "</soapenv:Envelope>";
    return xmlQuery
}
