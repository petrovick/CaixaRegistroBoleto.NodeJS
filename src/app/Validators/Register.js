module.exports = function(body) {
    const { codigoBeneficiario, nossoNumero, numeroDocumento, valor, dataVencimento, dataEmissao, jurosMora ,posVencimento, pagador} = body;

    if(codigoBeneficiario == undefined || codigoBeneficiario == 0) {
        throw "Defina o valor da tag codigoBeneficiario.";
    }
    else if(nossoNumero == undefined || nossoNumero == 0) {
        throw "Defina o valor da tag nossoNumero.";
    }
    else if(numeroDocumento == undefined || numeroDocumento == 0) {
        throw "Defina o valor da tag numeroDocumento.";
    }
    else if((numeroDocumento + '' ).length != 11) {
        throw "'numeroDocumento' deve conter 11 dígitos.";
    }
    else if((nossoNumero + '' ).length != 17) {
        throw "'nossoNumero' deve conter 17 dígitos.";
    }
    else if(valor == undefined || valor == 0) {
        throw "Defina o valor da tag valor.";
    }
    else if(dataVencimento == undefined || dataVencimento == '') {
        throw "Defina o valor da tag dataVencimento.";
    }
    else if(dataEmissao == undefined || dataEmissao == '') {
        throw "Defina o valor da tag dataEmissao.";
    }
    else if(jurosMora && jurosMora.valor && jurosMora.valor < 0.01) {
        throw "Caso optar o juros por valor, 'jurosMora.valor' deve ser maior que R$0.01 centavos."
    }
    else if(posVencimento == undefined)
    {
        throw "Defina a 'acao' e 'numeroDias' com a tag posVencimento.";
    }
    else if(posVencimento.acao == undefined) {
        throw "Defina a 'acao' na tag posVencimento.";
    }
    else if(posVencimento.numeroDias == undefined) {
        throw "Defina a 'numeroDias' na tag posVencimento.";
    }
    else if(pagador == undefined) {
        throw "Defina o 'cpf/cnpj', 'nome/razaoSocial' e endereco com a tag pagador.";
    }
    else if((pagador.cpf == undefined && pagador.cnpj ==undefined ) || (pagador.cpf == 0 && pagador.cnpj == 0) ) {
        throw "Defina o 'cpf/cnpj' na tag pagador.";
    }
    else if((pagador.nome == undefined && pagador.razaoSocial ==undefined ) || (pagador.nome == '' && pagador.razaoSocial == '') ) {
        throw "Defina o 'nome/razaoSocial' na tag pagador.";
    }
    else if((nossoNumero + '' ).substring(6) !== (numeroDocumento + '')) {
        throw "Os 11 últimos dígitos do 'nossoNumero' devem ser iguais ao 'numeroDocumento'. Ex: {'nossoNumero': '1400000078987654321', 'numeroDocumento':'78987654321' ";
    }
};
