# TradeReplay

Replay-Trading-Übung (SMC/ICT): historische Kerzen Schritt für Schritt abspielen, Trades mit Risiko in € oder % eröffnen, Journal und Auswertung.

**Link (läuft auf PC und iPad im Browser):** https://noelpisaroni-cloud.github.io/tradereplay/

## Aufbau
- `index.html` – die komplette App (eine Datei)
- `sym_*.js` – eingebaute Kursdaten pro Markt (12 Krypto-Paare, 28 Forex-Paare, alle Zeitrahmen)
- `x_<Markt>_<Zeitrahmen>_<n>.js` – Langzeit-Archiv (kompakt gespeichert, wird nur bei Bedarf geladen und vor die eingebauten Daten gehängt)
- `manifest.webmanifest`, `icon-*.png` – damit man die Seite auf dem iPad zum Home-Bildschirm hinzufügen kann

## Auf dem iPad
Link in Safari öffnen → Teilen → **Zum Home-Bildschirm**. Dann startet TradeReplay im Vollbild wie eine App.

## Sessions
10 Sessions pro Markt (der Zeitrahmen ist nur die Ansicht). Gespeichert im Browser (localStorage) und – in der Claude-Version – zusätzlich in der Cloud. Zum Übertragen ohne Cloud: **Backup exportieren** / **Backup importieren**.

## Datenquellen Langzeit-Archiv
- EUR/USD, GBP/USD, AUD/USD, USD/CAD, EUR/JPY: OANDA-Minutenkurse 2005–Mai 2020 aus [FutureSharks/financial-data](https://github.com/FutureSharks/financial-data), daraus alle Zeitrahmen gebildet (UTC; Tageskerzen Mo–Fr, 00:00 UTC).
- BTC: Bitstamp-Minutenkurse 2013–2026 aus [ff137/bitstamp-btcusd-minute-data](https://github.com/ff137/bitstamp-btcusd-minute-data) – bis 07.01.2025: „Zielak (mczielinski), Bitcoin Historical Data, Kaggle“, CC BY-SA 4.0; danach Bitstamp-API-Daten, CC BY 4.0.

## Live-Daten
Für Krypto holt die App, wenn möglich, echte Kerzen von Binance (zufälliges Fenster aus der ganzen Historie). Klappt das nicht, nimmt sie die eingebauten Daten.
