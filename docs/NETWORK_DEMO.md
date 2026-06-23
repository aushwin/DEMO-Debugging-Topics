# Network Demo Setup - React 19 use() Hook

## Running the Demo

You need **two terminals** running simultaneously:

### Terminal 1: Frontend (Vite)
```bash
npm run dev
```
This runs on `http://localhost:5173`

### Terminal 2: Backend (Express)
```bash
npm run server
```
This runs on `http://localhost:3001`

## What the Demo Shows

This demo uses **React 19's new `use()` hook** with **Suspense** to demonstrate the difference between sequential and parallel data fetching.

### Sequential (BAD - Red Button)

**The Problem:**
```javascript
// BAD: Each use() waits for the previous promise to resolve
const user = use(userPromise);        // Waits 1.5s
const posts = use(postsPromise);      // THEN waits 1.2s
const stats = use(statsPromise);      // THEN waits 1.0s
const notifications = use(notifPromise); // THEN waits 0.3s
// Total: ~4 seconds (waterfall)
```

**What happens:**
- Fetches `/api/user` → waits 1.5s
- Then fetches `/api/posts` → waits 1.2s
- Then fetches `/api/stats` → waits 1.0s
- Then fetches `/api/notifications` → waits 0.3s
- **Total: ~4 seconds**

### Parallel (GOOD - Green Button)

**The Solution:**
```javascript
// GOOD: Promise.all() fires all requests at once
const allData = Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchStats(),
    fetchNotifications()
]);

const [user, posts, stats, notifications] = use(allData);
// Total: ~1.5s (only waits for the slowest request)
```

**What happens:**
- Fetches ALL endpoints at once using `Promise.all()`
- Waits for the slowest one (1.5s for user)
- **Total: ~1.5 seconds** ⚡

## How to Present This

1. **Start both servers** before the presentation
2. Navigate to the **Network Secrets** page
3. **Open DevTools:**
   - Network tab (to see the waterfall)
   - Console tab (to see the logs)

### Demo Flow:

#### Part 1: Show the Problem (Sequential)
1. Click **🐌 Sequential (BAD)** button
2. **Point out in Network tab:**
   - Each request waits for the previous one
   - They form a "waterfall" pattern
3. **Point out in Console:**
   - "⏳ Waiting for user..."
   - "⏳ Waiting for posts..." (only after user completes)
4. **Show the total time:** ~4 seconds

#### Part 2: Show the Solution (Parallel)
1. Click **Reset** button
2. Click **🚀 Parallel (GOOD)** button
3. **Point out in Network tab:**
   - All requests fire at the same time
   - They run in parallel (overlapping bars)
4. **Point out in Console:**
   - "🚀 Waiting for ALL data at once..."
5. **Show the total time:** ~1.5 seconds (3x faster!)

## Key Teaching Points

### 1. The use() Hook (React 19)
```javascript
// use() unwraps promises - like await, but for components
const data = use(promise);
```

### 2. Suspense Boundary
```javascript
<Suspense fallback={<Loading />}>
    <DataComponent promise={dataPromise} />
</Suspense>
```
- Shows loading state while promises resolve
- Automatically handles the "pending" state

### 3. Sequential vs Parallel Pattern

**❌ Sequential (Slow):**
```javascript
const user = await fetch('/api/user');
const posts = await fetch('/api/posts');  // Waits for user!
const stats = await fetch('/api/stats');  // Waits for posts!
```

**✅ Parallel (Fast):**
```javascript
const [user, posts, stats] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/posts'),
    fetch('/api/stats')
]);
```

### 4. Real-World Impact
- Sequential: 4 seconds (poor UX, users leave)
- Parallel: 1.5 seconds (3x faster, better UX)
- **This is why seniors use Promise.all()!**

## Code Walkthrough for Students

### Bad Pattern (Sequential):
```javascript
// Creating promises one by one
const user = fetchUser();
user.then(() => {
    const posts = fetchPosts();  // Only starts after user completes
    posts.then(() => {
        const stats = fetchStats();  // Only starts after posts completes
    });
});
```

### Good Pattern (Parallel):
```javascript
// Creating all promises at once
const allData = Promise.all([
    fetchUser(),    // Starts immediately
    fetchPosts(),   // Starts immediately
    fetchStats()    // Starts immediately
]);
```

## Troubleshooting

**Error: "Is the backend running?"**
- Make sure `npm run server` is running in a separate terminal
- Check that port 3001 is not in use
- Verify backend is accessible at `http://localhost:3001/api/user`

**Suspense not working:**
- Make sure you're using React 19 (check `package.json`)
- The `use()` hook only works in React 19+

**Network tab shows nothing:**
- Make sure DevTools is open BEFORE clicking the buttons
- Try refreshing the page with DevTools open
