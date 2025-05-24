# Projektauftrag: KrankenkassenAssistent Schweiz

## Zusammenfassung
Entwicklung einer React-Applikation, die als AI-Assistent Nutzern hilft, die ideale Krankenkassenkonfiguration in der Schweiz zusammenzustellen. Die App bietet eine intuitive Chat-Schnittstelle kombiniert mit einer visuellen Angebotsdarstellung.

## Hauptziele
- Testbare und vorführbare Applikation (Prototyp)
- Klare und funktionale UX/UI
- Keine echten Backend-Anbindungen (Mock-Daten)
- Fokus auf User Experience und Prozessablauf

## Ablauf der Applikation

### 1. Landingpage
- Ansprechende Startseite mit klarem Call-to-Action
- Kurze Erklärung des Services
- Start-Button zum Chat-Assistenten

### 2. Chat-Interface (Informationsaufnahme)
Der AI-Assistent führt den Nutzer durch folgende Schritte:
- Begrüßung und Erklärung des Prozesses
- Systematische Abfrage relevanter Informationen:
  - Persönliche Daten (Alter, Wohnkanton, Familienstand)
  - Gesundheitszustand und Bedürfnisse
  - Budget und Präferenzen
  - Gewünschte Zusatzleistungen
- Selbstständige Prüfung auf Vollständigkeit der Informationen
- Bei Bedarf Nachfragen stellen

### 3. Angebotsdarstellung (Zweigeteilt)
**Chat-Bereich:**
- Kurze Zusammenfassung des Angebots
- Empfehlungen und Begründungen
- Interaktive Optionen (weitere Angebote, Änderungen)

**Visueller Angebotsbereich:**
- Detaillierte Aufschlüsselung der Bausteine:
  - Grundversicherung (Anbieter, Modell, Franchise, Prämie)
  - Zusatzversicherungen (einzeln aufgelistet)
  - Gesamtkosten
- Interaktive Elemente zum Anpassen
- Vergleichsansicht bei mehreren Angeboten

## Technische Umsetzung

### Frontend (React)
- **Framework:** React mit TypeScript
- **Styling:** Tailwind CSS für modernes, responsives Design
- **State Management:** React Context API
- **Routing:** React Router
- **UI Components:** Shadcn/ui oder Material-UI

### Mock-Funktionalitäten
- **Chat-Engine:** Vordefinierte Antworten basierend auf Nutzerinput
- **Datenbank:** Lokale JSON-Dateien mit Krankenkassen-Daten
- **Berechnungslogik:** Clientseitige Berechnung der Prämien

### Screens und Komponenten
1. **LandingPage**
   - Hero Section
   - Feature-Übersicht
   - CTA-Button

2. **ChatAssistant**
   - Chat-Nachrichten-Liste
   - Input-Feld
   - Quick-Reply-Buttons
   - Progress-Indicator

3. **OfferDisplay**
   - Angebots-Cards
   - Baustein-Komponenten
   - Konfigurations-Panel
   - Vergleichs-Tabelle

4. **SharedComponents**
   - Navigation
   - Loading States
   - Error Boundaries
   - Tooltips für Erklärungen

## Modi-System für Entwicklung
- Floating Button für Entwickler-Modus
- Verschiedene User-Personas zum Testen
- Möglichkeit, verschiedene Szenarien durchzuspielen

## Designprinzipien
- **Vertrauenswürdig:** Professionelles, seriöses Design
- **Einfach:** Klare Struktur, keine Überforderung
- **Hilfreich:** Kontextuelle Hilfe und Erklärungen
- **Responsiv:** Mobile-first Ansatz

## Nächste Schritte
1. React-Projekt initialisieren
2. Basis-Komponenten erstellen
3. Chat-Logik implementieren
4. Mock-Daten vorbereiten
5. Angebotsberechnung entwickeln
6. UI/UX verfeinern