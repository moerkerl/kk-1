# User Flow Documentation

## Main User Journey

### 1. Landing Page Entry
- User arrives at the landing page
- Sees value proposition and features
- Two main CTAs:
  - "Kostenlose Beratung starten" → Chat
  - "Angebote ansehen" → Redirects to Chat (no offers yet)

### 2. Chat Interaction
- Welcome message with quick reply options
- Progressive data collection:
  1. Age input
  2. Canton selection
  3. Current insurance details
  4. Doctor model preference
  5. Health conditions
  6. Supplementary needs
- Real-time validation with error messages
- Quick reply buttons for common answers

### 3. Offer Generation
- Automatic trigger after all data collected
- "Generating offers" message with 2s delay
- Offers created based on:
  - User demographics (age, canton)
  - Current premium for savings calculation
  - Doctor model preference
  - Supplementary insurance needs
- Success message with CTA to view offers

### 4. Offers Page
- Displays 3 personalized basic insurance offers
- Dynamic supplementary insurance based on needs
- Interactive selection:
  - Click to select primary offer
  - Toggle supplementary insurances
- Real-time total calculation
- Savings banner if applicable
- Two main CTAs:
  - "Beratung anfordern"
  - "Angebot speichern"

## Modi System Flow

### Quick Testing
1. Click floating settings button
2. Select test profile:
   - Young Professional (Zürich)
   - Family with Kids (Bern)
   - Senior (Geneva)
   - Student (Basel)
3. Automatically:
   - Resets chat
   - Applies test data
   - Generates offers
   - Shows completion message

### Modi Features
- Reset chat option
- Hide Modi system option
- Instant scenario switching

## Navigation Patterns

### Forward Navigation
- Landing → Chat → Offers
- Each step validates before proceeding
- Context maintains state across pages

### Backward Navigation
- Back buttons maintain state
- Chat history preserved
- Offers remain generated

### Error States
- Invalid chat input → Error message in chat
- No offers → Redirect to chat
- Generation failure → Error message with retry hint

## Loading States

1. **Message Processing**
   - Typing indicator (3 dots animation)
   - Send button shows spinner
   - Input disabled during processing

2. **Offer Generation**
   - Explicit "generating" message
   - 2-second processing time
   - Success message on completion

3. **Page Transitions**
   - Instant navigation
   - Context preserves state
   - No loading screens needed

## Data Persistence

- All data stored in ChatContext
- Survives navigation between pages
- Reset only via:
  - Modi system reset
  - Page refresh
  - resetChat() function