# Testing Guide

## How to Test the Integration

### 1. Normal User Flow Test
1. Start at `/` (landing page)
2. Click "Kostenlose Beratung starten"
3. Complete the chat flow:
   - Enter age: 35
   - Select canton: Zürich
   - Enter current provider: CSS
   - Enter monthly premium: 400
   - Select accident insurance: Yes
   - Choose doctor model: Family doctor
   - Answer health questions
4. Wait for offer generation
5. Click "Angebote ansehen"
6. Verify offers display correctly
7. Test offer selection and total calculation

### 2. Modi System Test
1. Click the settings button (bottom-right)
2. Try each test profile:
   - Young Professional: Low premium, fitness focus
   - Family: Higher premium, comprehensive needs
   - Senior: Highest premium, health conditions
   - Student: Lowest premium, basic needs
3. Verify offers update for each profile
4. Test "Reset Chat" function
5. Test "Hide Modi System"

### 3. Error Handling Test
1. **Invalid Input**:
   - Enter text for age
   - Enter negative numbers
   - Leave required fields empty
   - Verify error messages appear

2. **Navigation Errors**:
   - Go directly to `/offers` without chat
   - Verify redirect to chat

### 4. UI Component Test
1. **Buttons**:
   - Hover states
   - Disabled states during loading
   - Click feedback

2. **Cards**:
   - Hover effects on offer cards
   - Selection states
   - Shadow transitions

3. **Loading States**:
   - Typing indicator in chat
   - Button spinner during send
   - Smooth animations

### 5. Responsive Design Test
1. Test on mobile viewport (375px)
2. Test on tablet (768px)
3. Test on desktop (1440px)
4. Verify:
   - Chat layout adapts
   - Offers grid responds
   - Buttons stack on mobile
   - Text remains readable

### 6. State Persistence Test
1. Complete chat halfway
2. Navigate back to landing
3. Return to chat
4. Verify conversation preserved
5. Generate offers
6. Navigate away and back
7. Verify offers still displayed

### 7. Performance Test
1. Rapid message sending
2. Quick navigation between pages
3. Multiple offer selections
4. Verify no lag or freezing

## Expected Results

### Chat Page
- ✅ Messages appear instantly
- ✅ Typing indicator shows during processing
- ✅ Error messages in red with ❌
- ✅ Quick replies work correctly
- ✅ Back button returns to landing

### Offers Page
- ✅ 3 basic insurance offers displayed
- ✅ Supplementary insurance based on needs
- ✅ Total updates on selection
- ✅ Savings banner if applicable
- ✅ Sticky summary sidebar on desktop

### Modi System
- ✅ Floating button always visible
- ✅ Modal opens with profiles
- ✅ Instant data application
- ✅ Offers generate automatically
- ✅ Can be hidden permanently

## Common Issues & Solutions

1. **Offers not showing**
   - Ensure all chat questions answered
   - Check browser console for errors
   - Verify offer generation succeeded

2. **Modi system not working**
   - Check if hidden (refresh to restore)
   - Ensure on chat page for best results
   - Look for console errors

3. **Navigation issues**
   - Clear browser cache
   - Check for route typos
   - Ensure ChatProvider wraps app

4. **Styling problems**
   - Verify Tailwind CSS loaded
   - Check for CSS conflicts
   - Inspect element classes