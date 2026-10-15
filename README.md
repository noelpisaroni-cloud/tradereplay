# TradeReplay

Replay-Trading-Übung (SMC/ICT): historische Kerzen Schritt für Schritt abspielen, Trades mit Risiko in € oder % eröffnen, Journal und Auswertung.

**Link (läuft auf PC und iPad im Browser):** https://noelpisaroni-cloud.github.io/tradereplay/

## Aufbau
- `index.html` – die komplette App (eine Datei)
- `sym_*.js` – eingebaute Kursdaten pro Markt (12 Krypto-Paare, 28 Forex-Paare, alle Zeitrahmen)
- `manifest.webmanifest`, `icon-*.png` – damit man die Seite auf dem iPad zum Home-Bildschirm hinzufügen kann

## Auf dem iPad
Link in Safari öffnen → Teilen → **Zum Home-Bildschirm**. Dann startet TradeReplay im Vollbild wie eine App.

## Wo liegen meine Sessions?
Nur im Browser des jeweiligen Geräts (localStorage). Zum Übertragen zwischen Geräten: **Backup exportieren** und auf dem anderen Gerät **Backup importieren**.

## Live-Daten
Für Krypto holt die App, wenn möglich, echte Kerzen von Binance (zufälliges Fenster aus der ganzen Historie). Klappt das nicht, nimmt sie die eingebauten Daten.
