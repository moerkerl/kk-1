# Offer Engine Agent - Completed Work

## Übersicht
Ein umfassendes System zur Berechnung und Generierung von Versicherungsangeboten wurde implementiert.

## Implementierte Module

### 1. Prämienberechnung (`/src/utils/premiumCalculation.ts`)
- Basisprämienkalkulation nach Alter und Kanton
- Franchise-Rabatte (bis zu 44% bei 2500 CHF)
- Modell-Rabatte (HMO: 25%, Hausarzt: 20%, etc.)
- Unfalldeckungs-Anpassung (-7% ohne)

### 2. Angebotsgenerierung (`/src/utils/offerGeneration.ts`)
- Generiert 3-5 optimierte Angebote pro User
- Berücksichtigt Präferenzen
- Automatische Zusatzversicherungs-Empfehlungen
- Unterschiedliche Strategien (Budget, Balanced, Premium)

### 3. Vergleichsfunktionen (`/src/utils/offerComparison.ts`)
- Detaillierte Vergleichstabellen
- Sortierung nach verschiedenen Kriterien
- Vor-/Nachteile-Analyse
- Einsparungsberechnung

### 4. Empfehlungsengine (`/src/utils/recommendationEngine.ts`)
- Scoring-System basierend auf:
  - Preis-Leistung (40%)
  - Deckungsumfang (30%)
  - Provider-Rating (20%)
  - Flexibilität (10%)
- Personalisierte Empfehlungen

## Berechnungslogik

### Basisprämien-Faktoren:
- **Alter**: 
  - 0-18: Faktor 0.3
  - 19-25: Faktor 0.7
  - 26-60: Faktor 1.0
  - 61+: Faktor 1.2-1.5

- **Kantone** (Beispiele):
  - Günstig: AI, UR (Faktor 0.85)
  - Mittel: BE, SG (Faktor 1.0)
  - Teuer: GE, BS (Faktor 1.25)

### Zusatzversicherungen:
- Automatische Empfehlungen basierend auf Profil
- Paket-Rabatte bei mehreren Zusätzen
- Altersabhängige Preisgestaltung

## Integration
- Nahtlose Integration mit Chat-Flow
- Echtzeitberechnung möglich
- Skalierbar für echte Daten