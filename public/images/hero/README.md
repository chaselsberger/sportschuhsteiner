# Hero-Bilder Startseite

Bilder einfach in den passenden Ordner legen (jpg/png/webp), keine Code-Änderung nötig:

- `winter/` – Winterfotos, aktiv 1.11.–20.3.
- `sommer/` – Sommerfotos, aktiv 21.3.–31.10.
- `team/` – Fotos von Georg & Martina, dem Shop oder der Natur; wird zur Auflockerung
  etwa jeden 8. Tag statt des Saisonfotos gezeigt.

Pro Tag wird automatisch ein Bild aus dem passenden Ordner ausgewählt (wechselt nicht bei
jedem Seitenaufruf, sondern einmal täglich). Format möglichst 16:9 bis 4:5, gleicher
Bildausschnitt (Motiv mittig/leicht rechts), damit der Hero beim Wechsel ruhig wirkt.

Logik: `src/lib/hero-image.ts`
