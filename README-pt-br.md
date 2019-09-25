[en][en]

# Configuração

Você deve criar o arquivo .env de acordo com o arquivo .env.example da raiz do projeto.

```

NODE_ENV=production
URL_CAIXA=https://barramento.caixa.gov.br/sibar/
URL_CONSULTA_METHOD=ConsultaCobrancaBancaria/Boleto
URL_REGISTRO_METHOD=ManutencaoCobrancaBancaria/Boleto/Externo

URL_API_TOKEN=XXXXXXUrlToGetTokenToAccessLogServiceXXXXXX
URL_API_TOKEN_METHOD=XXTokenMethodNameXX

URL_API_LOG=XXXXXXUrlLogServiceXXXXXX
URL_API_LOG_METHOD=XXXXXXUrlMethodLogServiceXXXXXX

CNPJ_BENEFICIARIO=XXXXCNPJXXXXXXX
USAR_SERVICO_LOG=[TRUE OR FALSE(Without brackets)]
USAR_PROXY_SERVICO_LOG=false
USAR_PROXY_SERVICO_CAIXA=true
HTTP_PROXY_URL=proxy.company.com.br
HTTP_PROXY_PORT=9999
PORT=5006
Access_Control_Allow_Origin=*
```

CUIDADOS:
    1) O valor da chave 'URL_CAIXA', 'URL_CONSULTA_METHOD' e 'URL_REGISTRO_METHOD' não deve ser alterado.
    2) 'Access_Control_Allow_Origin': configure cors de acordo com suas necessidades. Por padrão está '*'.


## Antes de rodar o app

Você deve ter o [node][node] instalado na sua máquina.

## Rodando o app

```bash
npm install
```
ou
```
yarn
```

### DEBUG
```bash
npm run dev
```
ou
```bash
yarn dev
```

### PROD
```
npm start
```

### Será que está funcionando?

Você deve usar o arquivo 'Insomnia.json', que está no root deste projeto, para testar com o [Insomnia][insomnia].

# Contato

Entre em contato através do

-   Whatsapp: [+55 (34) 99838-9076][whatsapp]
-   Email: petrovickg@hotmail.com

[whatsapp]: https://api.whatsapp.com/send?phone=5534998389076
[insomnia]: https://insomnia.rest/download/
[node]: https://nodejs.org/en/
[en]: https://github.com/petrovick/CaixaRegistroBoleto-NODEJS
