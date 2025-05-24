# Subagent-Definitionen für KrankenkassenAssistent

## Übersicht
Für die Umsetzung des Projekts werden folgende spezialisierte Subagents eingesetzt:

## 1. React Setup Agent
**Aufgabe:** Initialisierung und Konfiguration des React-Projekts
- React-App mit TypeScript erstellen
- Tailwind CSS einrichten
- Ordnerstruktur definieren
- Basis-Dependencies installieren
- Git-Repository konfigurieren
**Output:** Lauffähiges React-Projekt mit grundlegender Struktur

## 2. UI Design Agent
**Aufgabe:** Erstellung des visuellen Designs und der Komponenten
- Farbschema und Typografie definieren
- Landing Page gestalten
- Chat-Interface designen
- Angebots-Cards erstellen
- Responsive Design sicherstellen
**Output:** Komplettes UI-Kit mit allen visuellen Komponenten

## 3. Chat Logic Agent
**Aufgabe:** Implementierung der Chat-Funktionalität
- Frage-Antwort-Logik entwickeln
- Validierung der Nutzereingaben
- Fortschrittsanzeige implementieren
- Quick-Reply-Optionen erstellen
- Gesprächsfluss steuern
**Output:** Funktionierender Chat-Assistent mit intelligentem Dialog

## 4. Data Structure Agent
**Aufgabe:** Datenmodelle und Mock-Daten erstellen
- JSON-Struktur für Krankenkassen definieren
- Berechnungsformeln implementieren
- Mock-Datenbank aufbauen
- Testdaten generieren
**Output:** Vollständige Datenstruktur mit realistischen Testdaten

## 5. Offer Engine Agent
**Aufgabe:** Angebotserstellung und -darstellung
- Berechnungslogik für Prämien
- Angebotsvergleich implementieren
- Konfigurations-Optionen
- Export-Funktionalität (PDF/Print)
**Output:** Dynamische Angebotserstellung mit Anpassungsmöglichkeiten

## 6. Integration Agent
**Aufgabe:** Zusammenführung aller Komponenten
- Routing implementieren
- State Management einrichten
- Komponenten verbinden
- Error Handling
- Performance-Optimierung
**Output:** Vollständig integrierte, funktionierende Applikation

## 7. Testing & Polish Agent
**Aufgabe:** Qualitätssicherung und Feinschliff
- User Flow testen
- Edge Cases behandeln
- Loading States optimieren
- Accessibility prüfen
- Browser-Kompatibilität
**Output:** Produktionsreife Demo-Applikation

## Arbeitsreihenfolge
1. **Phase 1:** React Setup Agent
2. **Phase 2:** Data Structure Agent + UI Design Agent (parallel)
3. **Phase 3:** Chat Logic Agent + Offer Engine Agent (parallel)
4. **Phase 4:** Integration Agent
5. **Phase 5:** Testing & Polish Agent

## Koordination
- Jeder Agent dokumentiert seinen Fortschritt in separaten Markdown-Files
- Regelmäßige Commits nach Abschluss wichtiger Teilaufgaben
- Klare Schnittstellen zwischen den Komponenten definieren
- Code-Reviews zwischen Agenten bei kritischen Komponenten