# Runtime Error Fixes

## Fixed Issues

### 1. Duplicate Key Warning
**Error**: "Encountered two children with the same key, `welcome-1`"

**Fix**: In `src/contexts/ChatContext.tsx`:
```typescript
// Before:
id: 'welcome-1',

// After:
id: `welcome-${Date.now()}`,
```

This ensures each welcome message has a unique ID using timestamp.

### 2. PreferredModels Undefined Error
**Error**: "Cannot read properties of undefined (reading 'preferredModels')"

**Fix**: In `src/utils/offerGeneration.ts` (lines 276-291):
```typescript
// Added null checks with defaults:
const preferredModels = userProfile.preferences?.preferredModels?.map(mapUserModelToInsuranceModel) || ['standard'];
const preferredFranchise = (userProfile.preferences?.preferredFranchise as FranchiseOption) || 1000;

// Also added null check for maxMonthlyPremium:
if (userProfile.preferences?.maxMonthlyPremium && preferredFranchise < 2500) {
```

## Result
✅ No more duplicate key warnings
✅ Offer generation handles missing preferences gracefully
✅ App should now run without console errors

## Testing
The chat flow should now work properly:
1. Start chat from landing page
2. Answer questions
3. Offers should generate without errors
4. Navigation to offers page should display results