# Chat Logic Usage Guide

## How the Chat System Works

### User Journey

1. **Starting the Chat**
   - User clicks "Chat starten" on landing page
   - Navigates to `/chat` route
   - Welcome message appears with age question

2. **Answering Questions**
   - User can type answers in input field
   - Quick reply buttons available for common answers
   - Validation provides immediate feedback
   - Progress saved in component state

3. **Viewing Offers**
   - After completing all questions
   - System generates personalized offers
   - User clicks "Angebote ansehen" 
   - Navigates to offers page with data

### Code Structure

```
/src/utils/
  chatFlow.ts         - Main chat flow logic and steps
  chatValidation.ts   - Input validation utilities

/src/pages/
  ChatPage.tsx        - Chat interface component
  OffersPage.tsx      - Personalized offers display

/src/types/
  chat.ts            - TypeScript interfaces
```

### Adding New Questions

To add a new question to the chat flow:

1. Add new step to `ChatStep` type in `/src/types/chat.ts`
2. Add field to `ChatFormData` interface
3. Add step configuration in `/src/utils/chatFlow.ts`
4. Update next step logic in relevant steps

Example:
```typescript
'income-level': {
  step: 'income-level',
  getMessage: () => 'Was ist Ihr jährliches Einkommen?',
  getQuickReplies: () => [
    { id: 'low', text: 'Unter 50k', value: 'low' },
    { id: 'medium', text: '50k-100k', value: 'medium' },
    { id: 'high', text: 'Über 100k', value: 'high' }
  ],
  processInput: (input) => ({ incomeLevel: input }),
  nextStep: () => 'next-question'
}
```

### Customizing Messages

Messages can be customized based on collected data:

```typescript
getMessage: (data) => {
  if (data.age < 26) {
    return 'Als junger Erwachsener haben Sie spezielle Optionen...';
  }
  return 'Standard message...';
}
```

### Validation Examples

The validation system supports:

- Numbers: `parseNumber(input, min, max)`
- Yes/No: `parseYesNo(input)` (multi-language)
- Dates: `parseDate(input)` (multiple formats)
- Selections: `parseMultipleSelections(input, maxOption)`

### Quick Reply Configuration

Quick replies provide better UX:

```typescript
getQuickReplies: () => [
  { 
    id: 'unique-id',
    text: 'Display Text',
    value: 'actual-value' // Can be string, number, or boolean
  }
]
```

### Error Handling

Validation errors show helpful messages:

```typescript
validateInput: (input) => {
  const age = parseInt(input);
  if (isNaN(age)) {
    return { 
      valid: false, 
      error: 'Bitte geben Sie eine gültige Zahl ein.' 
    };
  }
  return { valid: true };
}
```

### Testing the Chat

1. Start development server: `npm run dev`
2. Navigate to chat page
3. Test various input combinations
4. Verify validation works correctly
5. Check offer generation with different data

### Common Customizations

1. **Change welcome message**: Edit in `chatFlow.ts` welcome step
2. **Add insurance providers**: Update `INSURANCE_PROVIDERS` array
3. **Modify pricing logic**: Edit `generateOffers()` in OffersPage
4. **Add languages**: Extend validation mappings
5. **Change styling**: Update Tailwind classes in components