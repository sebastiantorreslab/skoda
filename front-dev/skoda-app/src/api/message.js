import fetch from "node-fetch";

var phoneNbr = "573103722011";
var telephoneId = "127211667149374";
var bearerToken =
  "EAAT1QwDAPQEBOx9ANXTmS5TRJ7LwQVZC2oIcjrVCZCXDXmvFKkSjzEgmETWZAqL9FkyzkZAxJICHZAf4nVn0TWhK8ynzAS7voZAKE96cQkUknZCLVDJ0z5TiL5Gg1rohKwBUhflCRhjcSOYrdtH7rKgPZCQQYWXvouQTQZCZCOQW2IpXNspUU4V57TZAWLWZCfVZAMeMolxpX6ElnLl1A6RG810QXKfr8UOEwRxsZD";

var url = "https://graph.facebook.com/v17.0/" + telephoneId + "/messages";

var data = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
  to: phoneNbr,
  type: "interactive",
  interactive: {
    type: "list",
    header: {
      type: "text",
      text: "Cotización",
    },
    body: {
      text: "Lista de repuestos",
    },
    footer: {
      text: "Autoskoda Grupo VW",
    },
    action: {
      button: "Ver lista",
      sections: [
        {
          title: "your-section",
          rows: [
            {
              id: "unique-row",
              title: "rep1",
              description: "rep1",
            },
          ],
        },
        {
          title: "your-section",
          rows: [
            {
              id: "unique-row2",
              title: "rep2",
              description: "rep2",
            },
          ],
        },
      ],
    },
  },
};

var postReq = {
  method: "POST",
  headers: {
    Authorization: "Bearer " + bearerToken,
    "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
  json: true,
};

fetch(url, postReq)
  .then((data) => {
    return data.json();
  })
  .then((res) => {
    console.log(res);
  })
  .catch((error) => console.log(error));
