[pt-br][pt-br]

# Configuration

You should first create a .env file according to ".env.example" file.

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

CAREFUL:
    1) 'URL_CAIXA', 'URL_CONSULTA_METHOD' and 'URL_REGISTRO_METHOD' key don't need to be changed.
    2) 'Access_Control_Allow_Origin': you should define cors configuration as needed, the default is '*'.

## Before running the app

You should have [node][node] installed on your machine.

## Running app

```bash
npm install
```
or
```
yarn
```

### DEBUG
```bash
npm run dev or yarn dev
```
### PROD
```
npm start
```

### Is it really running?

You should be able to use the given file 'Insomnia.json', at the root of this project, for testing purpose using [Insomnia][insomnia].

# Contact

Feel free to contact me

-   Whatsapp: [+55 (34) 99838-9076][whatsapp]
-   Email: petrovickg@hotmail.com

[whatsapp]: https://api.whatsapp.com/send?phone=5534998389076
[insomnia]: https://insomnia.rest/download/
[node]: https://nodejs.org/en/
[pt-br]: https://github.com/petrovick/CaixaRegistroBoleto-NODEJS/blob/master/README-pt-br.md
