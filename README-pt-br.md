[en][en]

# Configuração

Você deve criar o arquivo .env de acordo com o arquivo .env.example da raiz do projeto.

```
AGENCY=XXXX
URL_CONSULTA=https://barramento.caixa.gov.br/sibar/ConsultaCobrancaBancaria/Boleto
CNPJ_BENEFICIARIO=XXXXXXXXXXXXXX
```

CUIDADO: O valor da chave URL_CONSULTA não deve ser alterado.

## Antes de rodar o app

Você deve ter o [node][node] instalado na sua máquina.

## Rodando o app

```bash
npm install
```

```bash
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
