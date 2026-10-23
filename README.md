# TradeReplay

Replay-Trading-Übung (SMC/ICT): historische Kerzen Schritt für Schritt abspielen, Trades mit Risiko in € oder % eröffnen, Journal und Auswertung.

**Link (läuft auf PC und iPad im Browser):** https://noelpisaroni-cloud.github.io/tradereplay/

## Aufbau
- `index.html` – die komplette App (eine Datei)
- `sym_EURUSD.js`, `sym_PAXGUSDT.js` – eingebaute neuere Kursdaten der zwei Märkte EUR/USD und Gold (XAU/USD), alle Zeitrahmen
- `x_<Markt>_<Zeitrahmen>_<n>.js` – Langzeit-Archiv (kompakt gespeichert, wird nur bei Bedarf geladen und vor die eingebauten Daten gehängt)
- `manifest.webmanifest`, `icon-*.png` – damit man die Seite auf dem iPad zum Home-Bildschirm hinzufügen kann

## Auf dem iPad
Link in Safari öffnen → Teilen → **Zum Home-Bildschirm**. Dann startet TradeReplay im Vollbild wie eine App.

## Sessions
10 Sessions pro Markt (der Zeitrahmen ist nur die Ansicht). Gespeichert im Browser (localStorage) und – in der Claude-Version – zusätzlich in der Cloud. Zum Übertragen ohne Cloud: **Backup exportieren** / **Backup importieren**.

## Datenquellen Langzeit-Archiv
- EUR/USD und Gold (XAU/USD): OANDA-Minutenkurse (EUR/USD 2005–Mai 2020, Gold 2006–Mai 2020) aus [FutureSharks/financial-data](https://github.com/FutureSharks/financial-data), daraus alle Zeitrahmen gebildet (UTC; Tageskerzen Mo–Fr, 00:00 UTC). 1m ab 2019, 5m ab 2015/2016, 15m bis 1T ab 2005/2006.

## Neuere Daten
- EUR/USD: Yahoo Finance (1h/4h/1T ab Ende 2023, kürzere Zeitrahmen die letzten Wochen).
- Gold: Gold-Token PAXG (Binance) als Näherung für XAU/USD.

Eine Session liegt immer ganz im Archiv oder ganz in den neueren Daten (keine Lücken innerhalb einer Session).
