# Shop reaktivieren

Die Inhaber haben entschieden, den Online-Verkauf vorerst **nicht** live zu
schalten. Produkt-Shop und Online-Gutschein-Kauf sind deaktiviert, die
Website läuft ansonsten normal weiter (Sortiment-Übersicht, Beratung,
Kontakt, Termine, Gutschein-Infoseite mit Anfrage per Mail/Telefon).

## Was aktuell deaktiviert ist

- `/shop` und `/shop/[produkt]` zeigen einen Hinweis statt der Produkte
  (Route bleibt erreichbar, Produktseiten liefern 404).
- `/gutscheine/kaufen` leitet auf `/gutscheine` um.
- Auf `/gutscheine` ist "Jetzt online kaufen" durch "Gutschein anfragen"
  (Mailto) ersetzt.
- Die Navigation (Hauptmenü, mobile Tableiste, mobiles Menü) blendet den
  Menüpunkt "Shop" aus.
- Die Startseite zeigt keinen "Neu im Shop"-Bereich, die
  Sortiment-Kategorieseiten zeigen keine "Einzelstücke im Shop".
- Die API-Routen `/api/checkout` und `/api/checkout/gutschein` lehnen
  Anfragen mit HTTP 503 ab (zusätzliche Absicherung, falls doch eine
  Anfrage ankommt).
- Der Admin-Bereich (`/admin`) ist **nicht** betroffen – Produkte, Fotos und
  Bestellungen können dort weiter gepflegt werden, während der Shop für
  Kund:innen offline ist.

Umgesetzt über einen zentralen Schalter `brand.shopEnabled` in
`src/brand.config.ts`, gespeist aus der Umgebungsvariable
`NEXT_PUBLIC_SHOP_ENABLED`.

## Reaktivierung – Schnellstart

1. In `.env` (Plesk: Websites & Domains → sport-schuh-steiner.at →
   Node.js → Umgebungsvariablen, oder direkt in der `.env`-Datei im
   `app/`-Ordner):

   ```
   NEXT_PUBLIC_SHOP_ENABLED=true
   ```

2. Prüfen, ob die restliche Vor-Go-Live-Checkliste unten erledigt ist.
3. Bauen und neu starten:

   ```bash
   cd /var/www/vhosts/sport-schuh-steiner.at/app
   npm run build
   touch tmp/restart.txt
   ```

   (oder in Plesk: "App neu starten"). Ohne Neustart nach dem Build wird
   die Änderung nicht sichtbar.

Zum erneuten Deaktivieren: Schritt 1 auf `false` setzen (oder Variable
entfernen) und Schritte 2–3 wiederholen.

## Vor dem echten Go-Live noch zu erledigen

- [ ] **SMTP-Zugangsdaten** in `.env` eintragen (`SMTP_HOST`, `SMTP_PORT`,
      `SMTP_USER`, `SMTP_PASSWORD`) – ohne diese kann der Gutschein-PDF-Mailversand
      nach dem Kauf nicht funktionieren.
- [ ] **Stripe auf Live-Modus prüfen**: `NEXT_PUBLIC_SITE_ENV=production`
      setzen (schaltet u. a. von Stripe-Testschlüsseln auf Live-Schlüssel
      um, siehe `src/brand.config.ts`), echte Live-Keys
      (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`,
      `STRIPE_WEBHOOK_SECRET`) hinterlegt und der Stripe-Webhook auf die
      Produktions-URL (`/api/webhooks/stripe`) eingerichtet.
- [ ] **Echte Produktdaten** im Admin-Bereich prüfen – keine Test-/Beispielprodukte
      mehr online, Preise und Fotos aktuell.
- [ ] **Testkauf** einmal komplett durchspielen (Produkt-Kauf und
      Gutschein-Kauf), inkl. Bestätigungsmail und PDF-Gutschein.
- [ ] Diese Checkliste danach als erledigt markieren bzw. Punkte streichen.

## Wo der Schalter überall wirkt (für spätere Änderungen)

`src/brand.config.ts` (`shopEnabled`) wird u. a. importiert in:

- `src/app/shop/page.tsx`, `src/app/shop/[slug]/page.tsx`, `src/app/shop/erfolg/page.tsx`
- `src/app/gutscheine/page.tsx`, `src/app/gutscheine/kaufen/page.tsx`, `src/app/gutscheine/erfolg/page.tsx`
- `src/app/api/checkout/route.ts`, `src/app/api/checkout/gutschein/route.ts`
- `src/app/sortiment/[kategorie]/page.tsx`
- `src/components/MainNav.tsx`, `src/components/MobileTabBar.tsx`, `src/components/MobileMenuSheet.tsx`
- `src/components/home/ServiceStrip.tsx`, `src/components/home/LatestPairs.tsx`
