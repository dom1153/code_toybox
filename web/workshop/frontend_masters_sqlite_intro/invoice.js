import sqlite3 from "sqlite3";

// connect to the database here
// data.db is the name of the database file
const db = new sqlite3.Database("./data.db");

export default function registerInvoice(fastify, opts, done) {
  fastify.all("/", (request, reply) => {
    const id = request.query.id;

    // code goes here
    db.all(
      `
        SELECT
          InvoiceId as id,
          InvoiceDate as date,
          BillingAddress as address,
          BillingCity as city,
          BillingState as state,
          BillingCountry as country,
          BillingPostalCode as postalCode,
          Total as total
        FROM
            Invoice
          WHERE
            InvoiceId = ?
      `,
      [id],
      (err, invoiceRows) => {
        if (err) {
          reply.code(500);
          reply.send({ error: err, errorLocation: "Invoice" });
          return;
        }

        if (invoiceRows.length === 0) {
          reply.code(404);
          reply.send({ error: err, errorLocation: "Invoice" });
          return;
        }

        // we're just gonna nest another call. sqlite is fast.
        // in theory we could run in parralel, but doesn't matter in sqlite's case
        db.all(
          `
            SELECT
              i.UnitPrice as unitPrice,
              i.Quantity as quantity,
              t.Name as trackName,
              a.Title as albumTitle,
              ar.Name as artistName
            FROM
              InvoiceLine i
            JOIN
              Track t ON t.TrackId = i.TrackId
            JOIN
              Album a ON a.AlbumId = t.AlbumId
            JOIN
              Artist ar ON ar.ArtistId = a.ArtistId
            WHERE
              i.InvoiceId = ?
          `,
          [id],
          (err, trackRows) => {
            if (err) {
              reply.code(500);
              reply.send({ error: err, errorLocation: "Track" });
              return;
            }

            reply.send({ invoice: invoiceRows[0], lines: trackRows });
          }
        );
      }
    );

    // VVV I tried lmao...
    // db.rows(``);

    // invoice: id, date, total
    //    customoerId -> address, city, state, country, postal code
    // lines: [array { unitePrice, quantity, trackName, albumTitle, artistName } ]
    //    invoiceline invoiceid; unitpricve, quantity

    // reply.send({ invoice: {}, lines: [] });
  });

  done();
}

/*
this is how the response should look (to work in the UI)
{
  "invoice":
    {
      "id":10,
      "date":"2021-02-03 00:00:00",
      "address":"3 Chatham Street",
      "city":"Dublin","state":
      "Dublin",
      "country":"Ireland",
      "postalCode":null,
      "total":5.94
    },
  "lines":
    [
      {
        "unitPrice":0.99,
        "quantity":1,
        "trackName":"Etnia",
        "albumTitle":"Afrociberdelia",
        "artistName":"Chico Science & Nação Zumbi"
      },
      […]
    ]
}


*/
