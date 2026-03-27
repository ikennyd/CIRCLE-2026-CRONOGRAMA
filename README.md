# GPS Briefing — Setup Completo (Google Sheets)

## Estrutura
```
gps-briefing/
├── index.html     ← formulário (mobile-first)
├── vercel.json    ← configuração do deploy
└── README.md      ← este arquivo
```

---

## 1. Google Sheets — Criar a Planilha

1. Acesse [Google Sheets](https://sheets.google.com) e crie uma planilha em branco.
2. Na **Linha 1**, cole exatamente os seguintes cabeçalhos (um em cada coluna, de A até AE):
   `Data`, `nome`, `loja`, `whatsapp`, `tempo_mentoria`, `plataformas`, `plataforma_principal`, `logistica_ml`, `faturamento`, `investimento_ads`, `tacos`, `unidades`, `ticket_medio`, `margem`, `tendencia`, `produto_campeao`, `custo_campeao`, `preco_campeao`, `modelo_estoque`, `situacao_estoque`, `novo_produto`, `nivel_ads`, `problema_ads`, `afiliados`, `obstaculos`, `tentativas`, `prioridade`, `meta_30d`, `meta_90d`, `expectativa_sessao`, `outros`

---

## 2. Google Apps Script — Conectar a Planilha

1. Na sua planilha, clique em **Extensões > Apps Script**.
2. Apague o código que estiver lá e cole este:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rowData = [];
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  for (var i = 0; i < headers.length; i++) {
    var header = headers[i];
    if (header === "Data") {
      rowData.push(new Date());
    } else {
      rowData.push(e.parameter[header] || "");
    }
  }
  sheet.appendRow(rowData);
  return ContentService.createTextOutput("Sucesso").setMimeType(ContentService.MimeType.TEXT);
}
```

3. Clique em **Salvar** (ícone de disquete).
4. Clique no botão azul **Implantar** (Deploy) > **Nova implantação** (New deployment).
5. Clique na engrenagem ao lado de "Selecione o tipo" e escolha **App da Web** (Web app).
6. Configure assim:
   - Descrição: `Formulário GPS`
   - Executar como: **Eu** (Seu email)
   - Quem tem acesso: **Qualquer pessoa** (Anyone)
7. Clique em **Implantar**. (O Google pedirá para autorizar o acesso, clique em "Revisar permissões", escolha sua conta, clique em "Avançado" e "Acessar projeto").
8. Copie a **URL do App da Web** gerada.

---

## 3. Configurar o Formulário

No arquivo `index.html`, vá até a linha 456 (dentro da tag `<script>`) e cole a URL que você copiou:

```js
const GOOGLE_SHEETS_URL = 'COLE_SUA_URL_DO_GOOGLE_APPS_SCRIPT_AQUI'
```

---

## 4. GitHub — Subir o projeto

1. Acesse **github.com** → **New repository**
2. Nome: `gps-briefing` → **Create repository**
3. Faça upload dos 3 arquivos: `index.html`, `vercel.json`, `README.md`
   - Clique em **Add file → Upload files**
   - Arraste os arquivos → **Commit changes**

---

## 5. Vercel — Conectar e Publicar

1. Acesse **vercel.com** → **Add New Project**
2. Selecione o repositório `gps-briefing` no GitHub
3. Clique em **Deploy** (sem alterar nada)
4. Em ~30 segundos você recebe o link: `https://gps-briefing.vercel.app`

---

## 6. Personalizar o link (opcional)

Para usar `briefing.gpsx.com.br`:
- Na Vercel: **Settings → Domains → Add Domain**
- Adicione `briefing.gpsx.com.br` e siga as instruções de DNS

---

## Link para enviar ao cliente

```
https://gps-briefing.vercel.app
```
(substitua pelo seu link real após o deploy)
