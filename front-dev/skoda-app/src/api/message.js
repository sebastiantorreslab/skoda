import fetch from "node-fetch";

var phoneNbr = "573103722011";
var telephoneId = "127211667149374";
var bearerToken =
  "EAAT1QwDAPQEBOwRcJwy2rjHvrUdzcDFiEhQV9ZAKDOhkB3k2ZBVva2iUuyTmlRRfbQ9VLEH17wU63rkcJgD6qUzBTTaNCfppOpplJAuUizzdqbFD3RJEd01wHEOAviGmjzuQ3Uun2OxpBkIBhUNYR4yB9MMxkGG4X6mSaGHeFsKFA5c6TMsxf5ITTA0gzK2Qgg2mMeVwGHkqU4MyNwyL8BdaqEj97ZA";

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
