# Modi Navigation Fix

## Problem
Nach Klick auf ein Test-Profil im Modi System wurde der User zu einer leeren Chat-Seite geleitet statt zu den generierten Angeboten.

## Ursache
Der `generatedOffers` State war zwar im ChatContext vorhanden, wurde aber nicht im Context Value exponiert. Dadurch konnte die OffersPage die Angebote nicht finden und leitete zurück zu `/chat`.

## Lösung
In `ChatContext.tsx` wurde das Context Value Object angepasst:

```typescript
// Vorher:
const value: ChatContextValue = {
  ...state,
  sendMessage,
  selectQuickReply,
  resetChat,
  goToStep
};

// Nachher:
const value: ChatContextValue = {
  ...state,
  generatedOffers: state.generatedOffers,
  sendMessage,
  selectQuickReply,
  resetChat,
  goToStep
};
```

## Resultat
✅ Modi Test-Profile funktionieren jetzt korrekt
✅ Offers werden generiert und im State gespeichert
✅ Navigation zu `/offers` zeigt die generierten Angebote an