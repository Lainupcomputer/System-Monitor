# System-Monitor mit Flask und Chart.js

Dieses Projekt ermöglicht es, den Systemstatus eines Hosts über eine Flask-basierte API abzurufen und die Daten anschließend mit Chart.js auf einer Webseite anzuzeigen. Die Webseite wird über einen NGINX-Server bereitgestellt und ist mit einem Token abgesichert.

## Inhaltsverzeichnis

1. [Voraussetzungen](#1-voraussetzungen)
2. [Installation](#2-installation)
3. [Konfiguration](#3-konfiguration)
4. [Verwendung](#4-verwendung)
5. [Lizenz](#5-lizenz)

## 1. Voraussetzungen

- Python (getestet mit Python 3.11)
- NGINX (für das Hosting der Webseite)

## 2. Installation

1. Klone das Repository auf deinen lokalen Rechner:

    ```bash
    git clone https://github.com/Lainupcomputer/System-Monitor.git
    ```

2. Navigiere in das Api-Verzeichnis:

    ```bash
    cd system-monitor/api
    ```

3. Installiere die erforderlichen Python-Pakete:

    ```bash
    pip install -r requirements.txt
    ```
4. Kopiere die Webseiten-Daten in dein Webserver-Verzeichniss.
    ```bash
    cd system-monitor/html
    ```

## 3. Konfiguration

1. Setze die Umgebungsvariable für das API-Token:

    ```bash
    export SYSTEM_MONITOR_API_TOKEN=dein-api-token
    ```

2. Passe die Chart.js-Konfiguration in der `charts.js`-Datei an, um die IP und den Token zu aktualisieren.

## 4. Verwendung

1. Starte die Flask-Anwendung:

2. Starte den NGINX-Server:

3. Öffne einen Webbrowser und gehe zu `http://localhost` (oder der entsprechenden IP-Adresse deines Servers).


## 5. Lizenz

Dieses Projekt ist unter der [MIT-Lizenz](LICENSE) lizenziert.

