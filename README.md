# TradeReplay

Replay-Trading-Übung (SMC/ICT): historische Kerzen Schritt für Schritt abspielen, Trades mit Risiko in € oder % eröffnen, Journal und Auswertung.

**Link (läuft auf PC und iPad im Browser):** https://noelpisaroni-cloud.github.io/tradereplay/

## Aufbau
- `index.html` – die komplette App (eine Datei)
- `sym_EURUSD.js`, `sym_PAXGUSDT.js` – eingebaute neuere Kursdaten der zwei Märkte EUR/USD und Gold (XAU/USD), alle Zeitrahmen
- `x_<Markt>_<Zeitrahmen>_<n>.js` – Langzeit-Archiv (kompakt gespeichert, wird nur bei Bedarf geladen und vor die eingebauten Daten gehängt)
- `manifest.webmanifest`, `icon-*.png` – damit man die Seite auf dem iPad zum Home-Bildschirm hinzufügen kann

## Auf dem iPad (als App)
**https://noelpisaroni-cloud.github.io/tradereplay/** in **Safari** öffnen (nicht in der Claude-App) → Teilen → **Zum Home-Bildschirm**. Dann startet TradeReplay im Vollbild wie eine App, ohne Claude. Oder `ipad-qr.png` mit der iPad-Kamera scannen.

Die App merkt sich Seite und Kursdaten (`sw.js`): einmal mit Internet geöffnet, startet sie auch ohne Internet – mit allen schon angesehenen Zeitrahmen. Updates kommen beim nächsten Öffnen mit Internet automatisch.

## Sessions
10 Sessions pro Markt (der Zeitrahmen ist nur die Ansicht). Gespeichert im Browser (localStorage) und – in der Claude-Version – zusätzlich in der Cloud. Zum Übertragen ohne Cloud: **Backup exportieren** / **Backup importieren**.

## Datenquellen Langzeit-Archiv
- EUR/USD und Gold (XAU/USD): OANDA-Minutenkurse (EUR/USD 2005–Mai 2020, Gold 2006–Mai 2020) aus [FutureSharks/financial-data](https://github.com/FutureSharks/financial-data), daraus alle Zeitrahmen gebildet (UTC; Tageskerzen Mo–Fr, 00:00 UTC). Alle Zeitrahmen (1m bis 1T) ab 2005 bzw. 2006. 1m liegt in Monats-Stücken (`x_<Markt>_1m_c<JJJJMM>.js`), 5m in Halbjahres-Stücken (`x_<Markt>_5m_c<JJJJMM>.js`); die App lädt nur die Stücke rund um den Replay-Moment.

## Neuere Daten
- EUR/USD: Yahoo Finance (1h/4h/1T ab Ende 2023, kürzere Zeitrahmen die letzten Wochen).
- Gold: Gold-Token PAXG (Binance) als Näherung für XAU/USD.

Eine Session liegt immer ganz im Archiv oder ganz in den neueren Daten (keine Lücken innerhalb einer Session).
