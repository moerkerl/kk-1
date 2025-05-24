# Dokumentations-Ordnerstruktur

## Übersicht
Alle Projektdokumentation wird in nummerierten Ordnern im `/conversation` Verzeichnis organisiert.

## Struktur

```
/conversation/
├── 001_projektstart/           # Initiale Projektdefinition
│   ├── 001_Projektauftrag.md
│   ├── 002_Subagents.md
│   └── 003_Ordnerstruktur.md
│
├── 002_react_setup/            # React Setup Agent Berichte
│   └── (Berichte des React Setup Agents)
│
├── 003_ui_design/              # UI Design Agent Berichte
│   └── (Berichte des UI Design Agents)
│
├── 004_data_structure/         # Data Structure Agent Berichte
│   └── (Berichte des Data Structure Agents)
│
├── 005_chat_logic/             # Chat Logic Agent Berichte
│   └── (Berichte des Chat Logic Agents)
│
├── 006_offer_engine/           # Offer Engine Agent Berichte
│   └── (Berichte des Offer Engine Agents)
│
├── 007_integration/            # Integration Agent Berichte
│   └── (Berichte des Integration Agents)
│
├── 008_testing_polish/         # Testing & Polish Agent Berichte
│   └── (Berichte des Testing & Polish Agents)
│
└── Krankenkasse_Bibel.md       # Referenzdokument (bleibt im Root)
```

## Namenskonvention für Berichte

Innerhalb jedes Agent-Ordners:
- `001_initial_analysis.md` - Erste Analyse und Planung
- `002_implementation.md` - Umsetzungsbericht
- `003_results.md` - Ergebnisse und Übergabe
- `004_...` - Weitere Berichte bei Bedarf

## Regeln für Subagents

1. Jeder Subagent arbeitet in seinem zugewiesenen Ordner
2. Berichte werden fortlaufend nummeriert
3. Klare Titel verwenden, die den Inhalt beschreiben
4. Am Ende jedes Berichts: Status und nächste Schritte
5. Bei Übergabe an anderen Agent: Verweis auf relevante Dokumente