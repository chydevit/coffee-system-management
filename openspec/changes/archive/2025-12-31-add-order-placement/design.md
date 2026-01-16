# Design: Order Placement System

## Context
The coffee shop app currently has UI for cart management and order display, but lacks the core functionality to create and persist orders. This design addresses how to implement order placement with minimal complexity while maintaining consistency with the existing codebase.

**Constraints:**
- Next.js App Router architecture
- Client-side state management (no backend yet)
- Existing type definitions must be preserved
- Must work with current seller/admin dashboards

**Stakeholders:**
- End users (customers placing orders)
- Sellers (viewing and managing orders)
- Admins (viewing order analytics)

## Goals / Non-Goals

**Goals:**
- Enable users to successfully place orders from their cart
- Persist orders across page navigation and refresh
- Display order confirmation with clear feedback
- Provide order history for users to track their orders
- Integrate seamlessly with existing seller and admin views

**Non-Goals:**
- Backend API integration (future enhancement)
- Payment processing (future enhancement)
- Real-time order updates via WebSockets (future enhancement)
- Email/SMS notifications (future enhancement)
- Multi-user authentication (using mock user for now)

## Decisions

### Decision 1: State Management Approach
**Choice:** React Context API + localStorage for persistence

**Rationale:**
- Lightweight solution without additional dependencies
- Consistent with current app architecture (no Redux/Zustand)
- localStorage provides persistence across sessions
- Context API sufficient for current scale

**Alternatives considered:**
- **Zustand/Redux:** Adds dependency overhead; overkill for current needs
- **Server-side storage:** Requires backend setup; out of scope
- **Session storage only:** Lost on browser close; poor UX

### Decision 2: Order ID Generation
**Choice:** Timestamp-based UUID with prefix (e.g., `ORD-1735622496123-ABC`)

**Rationale:**
- Unique across sessions without server coordination
- Human-readable prefix for debugging
- Sortable by creation time
- Matches existing pattern in `initialOrders` (simple string IDs)

**Alternatives considered:**
- **Sequential numbers:** Requires global counter; collision risk
- **Full UUID v4:** Less readable; unnecessary complexity
- **Random strings:** No temporal ordering

### Decision 3: User Identification
**Choice:** Mock user object stored in localStorage (or hardcoded for MVP)

**Rationale:**
- No authentication system exists yet
- Allows testing full order flow
- Easy to replace with real auth later
- Consistent with existing mock data pattern

**Alternatives considered:**
- **Skip user info:** Breaks order tracking; poor UX
- **Build auth system:** Out of scope for this change
- **Browser fingerprinting:** Privacy concerns; unreliable

### Decision 4: Order Confirmation UX
**Choice:** Modal overlay with order summary, then redirect to order history

**Rationale:**
- Immediate feedback without losing context
- Allows quick "order more" action
- Matches modern e-commerce patterns
- Consistent with app's glassmorphism aesthetic

**Alternatives considered:**
- **Dedicated confirmation page:** Extra navigation step
- **Toast notification only:** Insufficient detail
- **Inline confirmation:** Clutters cart interface

### Decision 5: Data Synchronization
**Choice:** Single source of truth in localStorage, read on component mount

**Rationale:**
- Simple mental model
- No race conditions with single client
- Easy to debug and inspect
- Sufficient for MVP without backend

**Alternatives considered:**
- **Broadcast Channel API:** Overkill for single-tab usage
- **Polling:** Unnecessary complexity
- **Event emitters:** Adds state management complexity

## Architecture

### Data Flow
```
User Cart (State)
    ↓
[Confirm Order Button]
    ↓
OrderContext.createOrder()
    ↓
Generate Order ID + Timestamp
    ↓
Save to localStorage
    ↓
Update Context State
    ↓
Show Confirmation Modal
    ↓
Clear Cart
    ↓
[User Action: View Orders / Order More]
```

### Component Structure
```
OrderProvider (Context)
├── UserDashboard (Cart + Order Button)
├── OrderConfirmation (Modal)
├── OrderHistory (List View)
├── SellerDashboard (Reads from Context)
└── AdminDashboard (Reads from Context)
```

### Data Schema (localStorage)
```typescript
// Key: "coffee-shop-orders"
{
  orders: Order[],
  currentUser: { id: string, name: string, email: string }
}
```

## Risks / Trade-offs

### Risk: Data Loss on localStorage Clear
**Mitigation:** 
- Add export/import functionality in future
- Document localStorage dependency
- Consider IndexedDB migration path

### Risk: No Multi-User Support
**Mitigation:**
- Design with user ID in mind for easy auth integration
- Document limitation in UI
- Plan authentication as next phase

### Risk: Order ID Collisions (Low Probability)
**Mitigation:**
- Use timestamp + random suffix
- Add collision detection on creation
- Log errors if collision occurs

### Trade-off: Client-Side Only
**Benefit:** Fast development, no backend needed
**Cost:** No cross-device sync, data only local
**Acceptable because:** MVP scope, backend planned for later

## Migration Plan

### Phase 1: Initial Implementation (This Change)
1. Create OrderContext and provider
2. Implement order creation in user dashboard
3. Build confirmation modal
4. Create order history page
5. Update seller/admin to read from context

### Phase 2: Future Enhancements (Not in Scope)
1. Replace localStorage with API calls
2. Add authentication system
3. Implement real-time updates
4. Add payment integration
5. Email/SMS notifications

### Rollback Strategy
- No database changes (client-side only)
- Feature flag: Can disable order button if issues arise
- localStorage can be cleared without breaking app
- Existing mock data remains as fallback

## Open Questions
1. **Q:** Should we add order editing/cancellation for users?
   **A:** Defer to future; sellers can cancel for now

2. **Q:** What happens to orders when localStorage is full?
   **A:** Add error handling; show warning to user; implement cleanup of old completed orders

3. **Q:** Should order history paginate?
   **A:** Not needed for MVP; add if users have >20 orders

4. **Q:** How to handle concurrent orders from same user?
   **A:** Not a concern in single-tab usage; each order gets unique ID
