/**
 * Eigener Startdatei für Plesk/Passenger (Node.js-Hosting). Plesk startet
 * diese Datei direkt mit node und übergibt den Port über process.env.PORT.
 * "npm start" (next start) wird von Passenger nicht verwendet.
 */
const { createServer } = require("http");
const next = require("next");

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => handle(req, res)).listen(port, () => {
    console.log(`Sport Schuh Steiner läuft auf Port ${port} (dev=${dev})`);
  });
});
