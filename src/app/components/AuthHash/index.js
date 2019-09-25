const moment = require("moment");
var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
var Base64 = require("crypto-js/enc-base64");

module.exports = function(beneficiaryCode, ourNumber, expireDate/*"00000000"*/, price/*"000000000000000"*/,beneficiaryCNPJ){
    var stringPriceLayout = "000000000000000";
    var number = price.toFixed(2).toString().replace('.', '');
    stringPriceLayout += number;
    var finalFormatedPrice = stringPriceLayout.substr(stringPriceLayout.length - 15);

    var expireDateString = ''
    if(expireDate === 0) {
        expireDateString = '00000000';
    }
    else {
        expireDateString = moment(expireDate).format("DDMMYYYY");
    }

    var beneficiaryCodeLayout = "0000000" + beneficiaryCode;
    beneficiaryCode=beneficiaryCodeLayout.substr(beneficiaryCodeLayout.length - 7);
    const authString = beneficiaryCode + ourNumber + expireDateString + finalFormatedPrice + beneficiaryCNPJ;

    //console.log(beneficiaryCode + '-' + ourNumber + '-' + expireDateString + '-' + finalFormatedPrice + '-' + beneficiaryCNPJ)

    return Base64.stringify(SHA256(authString));
}
