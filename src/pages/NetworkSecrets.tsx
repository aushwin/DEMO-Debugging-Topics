
import React, { useState, Suspense, use } from 'react';

interface UserData {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Post {
    id: number;
    title: string;
    likes: number;
}

interface Stats {
    followers: number;
    following: number;
    totalPosts: number;
}

interface Notifications {
    unread: number;
    total: number;
}

const API_BASE = 'http://localhost:3001/api';

// Fetch functions that return promises
const fetchUser = (): Promise<UserData> =>
    fetch(`${API_BASE}/user`).then(res => res.json());

const fetchPosts = (): Promise<Post[]> =>
    fetch(`${API_BASE}/posts`).then(res => res.json());

const fetchStats = (): Promise<Stats> =>
    fetch(`${API_BASE}/stats`).then(res => res.json());

const fetchNotifications = (): Promise<Notifications> =>
    fetch(`${API_BASE}/notifications`).then(res => res.json());

// Component that uses the new use() hook - Sequential
function SequentialData({ userPromise, postsPromise, statsPromise, notifPromise }: {
    userPromise: Promise<UserData>;
    postsPromise: Promise<Post[]>;
    statsPromise: Promise<Stats>;
    notifPromise: Promise<Notifications>;
}) {
    // BAD: Sequential - each use() waits for the previous one
    console.log('⏳ Waiting for user...');
    const user = use(userPromise);

    console.log('⏳ Waiting for posts...');
    const posts = use(postsPromise);

    console.log('⏳ Waiting for stats...');
    const stats = use(statsPromise);

    console.log('⏳ Waiting for notifications...');
    const notifications = use(notifPromise);

    return (
        <div style={dataDisplayStyle}>
            <h3>📊 Data Loaded (Sequential)</h3>
            <div style={{ marginBottom: '10px' }}>
                <strong>User:</strong> {user.name} ({user.email})
            </div>
            <div style={{ marginBottom: '10px' }}>
                <strong>Posts:</strong> {posts.length} posts loaded
            </div>
            <div style={{ marginBottom: '10px' }}>
                <strong>Stats:</strong> {stats.followers} followers, {stats.following} following
            </div>
            <div>
                <strong>Notifications:</strong> {notifications.unread} unread
            </div>
        </div>
    );
}

// Component that uses the new use() hook - Parallel
function ParallelData({ allDataPromise }: {
    allDataPromise: Promise<[UserData, Post[], Stats, Notifications]>;
}) {
    // GOOD: Parallel - all data fetched at once
    console.log('🚀 Waiting for ALL data at once...');
    const [user, posts, stats, notifications] = use(allDataPromise);

    return (
        <div style={dataDisplayStyle}>
            <h3>📊 Data Loaded (Parallel)</h3>
            <div style={{ marginBottom: '10px' }}>
                <strong>User:</strong> {user.name} ({user.email})
            </div>
            <div style={{ marginBottom: '10px' }}>
                <strong>Posts:</strong> {posts.length} posts loaded
            </div>
            <div style={{ marginBottom: '10px' }}>
                <strong>Stats:</strong> {stats.followers} followers, {stats.following} following
            </div>
            <div>
                <strong>Notifications:</strong> {notifications.unread} unread
            </div>
        </div>
    );
}

const NetworkSecrets: React.FC = () => {
    const [status, setStatus] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [mode, setMode] = useState<'idle' | 'sequential' | 'parallel'>('idle');
    const [startTime, setStartTime] = useState<number>(0);

    // Promises for sequential mode
    const [userPromise, setUserPromise] = useState<Promise<UserData> | null>(null);
    const [postsPromise, setPostsPromise] = useState<Promise<Post[]> | null>(null);
    const [statsPromise, setStatsPromise] = useState<Promise<Stats> | null>(null);
    const [notifPromise, setNotifPromise] = useState<Promise<Notifications> | null>(null);

    // Promise for parallel mode
    const [allDataPromise, setAllDataPromise] = useState<Promise<[UserData, Post[], Stats, Notifications]> | null>(null);

    // BAD: Sequential - Create promises one by one
    const loadSequential = () => {
        setMode('sequential');
        setStatus('� Loading sequentially (SLOW)...');
        setStartTime(performance.now());

        console.clear();
        console.log('❌ SEQUENTIAL MODE: Each request waits for the previous one');

        // Create promises sequentially (this is the BAD pattern)
        const user = fetchUser();
        setUserPromise(user);

        user.then(() => {
            const posts = fetchPosts();
            setPostsPromise(posts);

            posts.then(() => {
                const stats = fetchStats();
                setStatsPromise(stats);

                stats.then(() => {
                    const notif = fetchNotifications();
                    setNotifPromise(notif);
                });
            });
        });
    };

    // GOOD: Parallel - Create all promises at once
    const loadParallel = () => {
        setMode('parallel');
        setStatus('🚀 Loading in parallel (FAST)...');
        setStartTime(performance.now());

        console.clear();
        console.log('✅ PARALLEL MODE: All requests fire at once');

        // Create all promises at once using Promise.all (this is the GOOD pattern)
        const allData = Promise.all([
            fetchUser(),
            fetchPosts(),
            fetchStats(),
            fetchNotifications()
        ]);

        setAllDataPromise(allData);
    };

    const reset = () => {
        setMode('idle');
        setUserPromise(null);
        setPostsPromise(null);
        setStatsPromise(null);
        setNotifPromise(null);
        setAllDataPromise(null);
        setStatus('');
    };

    // Slide 17: CORS Error
    const fetchCors = async () => {
        setLoading(true);
        setStatus('Attempting blocked fetch...');
        try {
            await fetch('https://google.com');
            setStatus('Success?? That is weird.');
        } catch (e) {
            console.error('CORS Error caught:', e);
            setStatus('Failed! Check Console for CORS error.');
        } finally {
            setLoading(false);
        }
    };

    // Slide 18: 404 Case Sensitive
    const fetch404 = async () => {
        setLoading(true);
        setStatus('Fetching incorrect path...');

        const response = await fetch('https://jsonplaceholder.typicode.com/Postss');
        if (!response.ok) {
            console.error('404 Not Found:', response.status);
            setStatus(`Error 404: ${response.statusText}. Check Network tab.`);
        }
        setLoading(false);
    };

    return (
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ borderBottom: '2px solid #27ae60' }}>Network Secrets 🌐</h1>
            <p>The source of truth for all frontend bugs.</p>

            <div style={{ ...sectionStyle, background: '#fff3cd', borderLeft: '4px solid #ffc107' }}>
                <h3>🎯 Sequential vs Parallel with React 19's use() Hook</h3>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    <strong>Before you start:</strong> Make sure the backend is running with <code>npm run server</code>
                </p>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                    <button
                        onClick={loadSequential}
                        disabled={mode !== 'idle'}
                        style={{ ...btnStyle, background: '#e74c3c' }}
                    >
                        🐌 Sequential (BAD)
                    </button>
                    <button
                        onClick={loadParallel}
                        disabled={mode !== 'idle'}
                        style={{ ...btnStyle, background: '#27ae60' }}
                    >
                        🚀 Parallel (GOOD)
                    </button>
                    <button
                        onClick={reset}
                        disabled={mode === 'idle'}
                        style={{ ...btnStyle, background: '#95a5a6' }}
                    >
                        Reset
                    </button>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#555', marginTop: '10px' }}>
                    💡 <strong>What to watch:</strong> Open Network tab and Console. Sequential waits for each request. Parallel fires all at once!
                </p>

                <div style={{
                    marginTop: '15px',
                    padding: '12px',
                    background: '#e8f5e9',
                    borderRadius: '4px',
                    fontSize: '0.85rem'
                }}>
                    <strong>🎓 Teaching Point:</strong> The <code>use()</code> hook unwraps promises.
                    Sequential = waterfall (slow). Parallel = all at once (fast).
                </div>
            </div>

            {/* Data Display with Suspense */}
            {mode === 'sequential' && userPromise && postsPromise && statsPromise && notifPromise && (
                <Suspense fallback={
                    <div style={loadingStyle}>
                        <div className="spinner" style={spinnerStyle}></div>
                        <p>⏳ Loading data sequentially... (Watch Network tab!)</p>
                        <p style={{ fontSize: '0.85rem', color: '#666' }}>
                            Time elapsed: {((performance.now() - startTime) / 1000).toFixed(2)}s
                        </p>
                    </div>
                }>
                    <SequentialData
                        userPromise={userPromise}
                        postsPromise={postsPromise}
                        statsPromise={statsPromise}
                        notifPromise={notifPromise}
                    />
                    <div style={{ marginTop: '10px', padding: '10px', background: '#ffebee', borderRadius: '4px' }}>
                        ⏱️ Total time: {((performance.now() - startTime) / 1000).toFixed(2)}s
                    </div>
                </Suspense>
            )}

            {mode === 'parallel' && allDataPromise && (
                <Suspense fallback={
                    <div style={loadingStyle}>
                        <div className="spinner" style={spinnerStyle}></div>
                        <p>🚀 Loading data in parallel... (Watch Network tab!)</p>
                        <p style={{ fontSize: '0.85rem', color: '#666' }}>
                            Time elapsed: {((performance.now() - startTime) / 1000).toFixed(2)}s
                        </p>
                    </div>
                }>
                    <ParallelData allDataPromise={allDataPromise} />
                    <div style={{ marginTop: '10px', padding: '10px', background: '#e8f5e9', borderRadius: '4px' }}>
                        ⏱️ Total time: {((performance.now() - startTime) / 1000).toFixed(2)}s
                    </div>
                </Suspense>
            )}

            {/* Advanced Network Tab Techniques */}
            <div style={{ ...sectionStyle, background: '#e8f5e9', borderLeft: '4px solid #27ae60', marginTop: '2rem' }}>
                <h2 style={{ marginTop: 0 }}>🔥 Advanced Network Tab Techniques</h2>
                <p style={{ fontSize: '0.9rem', color: '#666' }}>
                    These are the techniques that separate juniors from seniors. Open Network tab for all of these!
                </p>
            </div>

            {/* 1. Request Timing Breakdown */}
            <div style={sectionStyle}>
                <h3>1️⃣ Request Timing Breakdown - See Where Time Is Spent</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    Click this button, then in Network tab → Click the request → Go to <strong>Timing</strong> tab
                </p>
                <button
                    onClick={async () => {
                        setLoading(true);
                        setStatus('Fetching slow endpoint with timing delays...');
                        console.clear();
                        console.log('📊 TIMING BREAKDOWN DEMO');
                        console.log('Open Network tab → Click /slow-with-headers → Timing tab');
                        console.log('You will see:');
                        console.log('  - Queueing: Time waiting in browser queue');
                        console.log('  - Stalled: Time waiting for connection');
                        console.log('  - DNS Lookup: Time to resolve domain');
                        console.log('  - Initial connection: TCP handshake');
                        console.log('  - SSL: TLS/SSL negotiation');
                        console.log('  - Request sent: Time to send request');
                        console.log('  - Waiting (TTFB): Time to First Byte');
                        console.log('  - Content Download: Time to download response');

                        try {
                            const res = await fetch(`${API_BASE}/slow-with-headers`);
                            const data = await res.json();
                            console.log('✅ Response:', data);
                            setStatus('✅ Check Network → Timing tab to see the breakdown!');
                        } catch (e) {
                            setStatus('❌ Error! Is backend running?');
                        } finally {
                            setLoading(false);
                        }
                    }}
                    disabled={loading}
                    style={{ ...btnStyle, background: '#8e44ad' }}
                >
                    Timing Breakdown Demo
                </button>
                <div style={{ marginTop: '10px', padding: '10px', background: '#f0f0f0', borderRadius: '4px', fontSize: '0.85rem' }}>
                    💡 <strong>What to look for:</strong> TTFB (Time to First Byte) is usually the bottleneck.
                    If it's high, your backend is slow!
                </div>
            </div>

            {/* 2. Large Payload / Size vs Transfer */}
            <div style={sectionStyle}>
                <h3>2️⃣ Large Payload - Size vs Transfer Size</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    Fetches ~5MB of data. In Network tab, compare <strong>Size</strong> vs <strong>Transfer</strong> columns.
                </p>
                <button
                    onClick={async () => {
                        setLoading(true);
                        setStatus('Downloading 5MB payload...');
                        console.clear();
                        console.log('📦 LARGE PAYLOAD DEMO');
                        console.log('In Network tab, look at the /large-data request:');
                        console.log('  - Size: Actual uncompressed size (~5MB)');
                        console.log('  - Transfer: Compressed size sent over network');
                        console.log('  - The difference shows gzip compression savings!');

                        const startTime = performance.now();
                        try {
                            const res = await fetch(`${API_BASE}/large-data`);
                            const data = await res.json();
                            const endTime = performance.now();
                            const time = ((endTime - startTime) / 1000).toFixed(2);
                            console.log(`✅ Downloaded ${data.total} items in ${time}s`);
                            setStatus(`✅ Downloaded 5MB in ${time}s. Check Size vs Transfer in Network tab!`);
                        } catch (e) {
                            setStatus('❌ Error! Is backend running?');
                        } finally {
                            setLoading(false);
                        }
                    }}
                    disabled={loading}
                    style={{ ...btnStyle, background: '#e67e22' }}
                >
                    Fetch Large Payload (5MB)
                </button>
                <div style={{ marginTop: '10px', padding: '10px', background: '#fff3cd', borderRadius: '4px', fontSize: '0.85rem' }}>
                    ⚠️ <strong>Teaching Point:</strong> If Size = Transfer, compression is OFF. Always enable gzip!
                </div>
            </div>

            {/* 3. Request Headers & Custom Headers */}
            <div style={sectionStyle}>
                <h3>3️⃣ Inspect Request & Response Headers</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    Click request in Network tab → <strong>Headers</strong> tab to see custom headers
                </p>
                <button
                    onClick={async () => {
                        setLoading(true);
                        setStatus('Fetching with custom headers...');
                        console.clear();
                        console.log('📋 HEADERS INSPECTION DEMO');
                        console.log('In Network tab → Click /slow-with-headers → Headers tab');
                        console.log('Look for Response Headers:');
                        console.log('  - X-Custom-Header: Demo-Value');
                        console.log('  - X-Processing-Time: 1500ms');
                        console.log('  - X-Server: Demo-Backend');
                        console.log('Also check Request Headers to see what your browser sends!');

                        try {
                            const res = await fetch(`${API_BASE}/slow-with-headers`);
                            const data = await res.json();
                            console.log('✅ Custom headers received!');
                            console.log('Response headers:', {
                                customHeader: res.headers.get('X-Custom-Header'),
                                processingTime: res.headers.get('X-Processing-Time'),
                                server: res.headers.get('X-Server')
                            });
                            setStatus('✅ Check Network → Headers tab for custom headers!');
                        } catch (e) {
                            setStatus('❌ Error!');
                        } finally {
                            setLoading(false);
                        }
                    }}
                    disabled={loading}
                    style={{ ...btnStyle, background: '#16a085' }}
                >
                    Inspect Headers
                </button>
            </div>

            {/* 4. POST Request with Payload */}
            <div style={sectionStyle}>
                <h3>4️⃣ POST Request - Inspect Request Payload</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    In Network tab → Click request → <strong>Payload</strong> tab to see what was sent
                </p>
                <button
                    onClick={async () => {
                        setLoading(true);
                        setStatus('Sending POST request...');
                        console.clear();
                        console.log('📤 POST REQUEST DEMO');
                        console.log('In Network tab → Click /submit → Payload tab');
                        console.log('You will see the JSON data we sent:');

                        const payload = {
                            username: 'alice',
                            email: 'alice@example.com',
                            action: 'demo',
                            timestamp: new Date().toISOString()
                        };

                        console.log('Sending:', payload);

                        try {
                            const res = await fetch(`${API_BASE}/submit`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(payload)
                            });
                            const data = await res.json();
                            console.log('✅ Server received:', data.received);
                            setStatus('✅ POST sent! Check Network → Payload tab!');
                        } catch (e) {
                            setStatus('❌ Error!');
                        } finally {
                            setLoading(false);
                        }
                    }}
                    disabled={loading}
                    style={{ ...btnStyle, background: '#2980b9' }}
                >
                    Send POST Request
                </button>
                <div style={{ marginTop: '10px', padding: '10px', background: '#e8f5e9', borderRadius: '4px', fontSize: '0.85rem' }}>
                    💡 <strong>Pro Tip:</strong> Right-click request → "Copy as fetch" to replay it in Console!
                </div>
            </div>

            {/* 5. Redirect Chain */}
            <div style={sectionStyle}>
                <h3>5️⃣ Redirect Chain - Follow the Bounces</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    Enable <strong>Preserve log</strong> in Network tab to see all redirects
                </p>
                <button
                    onClick={async () => {
                        setLoading(true);
                        setStatus('Following redirects...');
                        console.clear();
                        console.log('🔄 REDIRECT CHAIN DEMO');
                        console.log('IMPORTANT: Enable "Preserve log" checkbox in Network tab!');
                        console.log('You will see:');
                        console.log('  1. /redirect-1 → 302 redirect');
                        console.log('  2. /redirect-2 → 302 redirect');
                        console.log('  3. /redirect-3 → 200 OK (final destination)');

                        try {
                            const res = await fetch(`${API_BASE}/redirect-1`);
                            const data = await res.json();
                            console.log('✅ Final destination:', data.message);
                            setStatus('✅ Followed 3 redirects! Check Network tab (Preserve log must be ON)');
                        } catch (e) {
                            setStatus('❌ Error!');
                        } finally {
                            setLoading(false);
                        }
                    }}
                    disabled={loading}
                    style={{ ...btnStyle, background: '#9b59b6' }}
                >
                    Trigger Redirect Chain
                </button>
            </div>

            {/* 6. 500 Server Error */}
            <div style={sectionStyle}>
                <h3>6️⃣ 500 Server Error - Red in Network Tab</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    Request will show in <strong style={{ color: 'red' }}>RED</strong> in Network tab
                </p>
                <button
                    onClick={async () => {
                        setLoading(true);
                        setStatus('Triggering server error...');
                        console.clear();
                        console.log('❌ 500 ERROR DEMO');
                        console.log('In Network tab, this request will be RED');
                        console.log('Click it → Response tab to see error details');

                        try {
                            const res = await fetch(`${API_BASE}/error-500`);
                            const data = await res.json();
                            if (!res.ok) {
                                console.error('Server error:', data);
                                setStatus(`❌ 500 Error: ${data.message}. Check Network tab!`);
                            }
                        } catch (e) {
                            console.error('Fetch error:', e);
                            setStatus('❌ Server error! Check Network tab (red request)');
                        } finally {
                            setLoading(false);
                        }
                    }}
                    disabled={loading}
                    style={{ ...btnStyle, background: '#c0392b' }}
                >
                    Trigger 500 Error
                </button>
            </div>

            {/* 7. Copy as cURL / Fetch */}
            <div style={sectionStyle}>
                <h3>7️⃣ Copy as cURL / Fetch - Replay Requests</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    <strong>Manual Demo:</strong> After clicking any button above:
                </p>
                <ol style={{ fontSize: '0.85rem', lineHeight: '1.6', paddingLeft: '20px' }}>
                    <li>Right-click any request in Network tab</li>
                    <li>Select <strong>"Copy" → "Copy as fetch"</strong></li>
                    <li>Paste in Console and press Enter</li>
                    <li>Modify the code and replay!</li>
                </ol>
                <div style={{ marginTop: '10px', padding: '10px', background: '#fff3cd', borderRadius: '4px', fontSize: '0.85rem' }}>
                    💡 <strong>Use Case:</strong> Test different payloads, headers, or auth tokens without changing your code!
                </div>
            </div>

            {/* 8. Network Throttling */}
            <div style={sectionStyle}>
                <h3>8️⃣ Network Throttling - Test on Slow Connections</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    <strong>Manual Demo:</strong> In Network tab:
                </p>
                <ol style={{ fontSize: '0.85rem', lineHeight: '1.6', paddingLeft: '20px' }}>
                    <li>Click the dropdown that says <strong>"No throttling"</strong></li>
                    <li>Select <strong>"Slow 3G"</strong></li>
                    <li>Click any demo button above</li>
                    <li>Watch how SLOW it becomes!</li>
                    <li>Switch back to "No throttling" when done</li>
                </ol>
                <div style={{ marginTop: '10px', padding: '10px', background: '#e8f5e9', borderRadius: '4px', fontSize: '0.85rem' }}>
                    💡 <strong>Why this matters:</strong> Your users might be on slow networks. Always test!
                </div>
            </div>

            {/* Real-World API Handshake Demo */}
            <div style={{ ...sectionStyle, background: '#fff3cd', borderLeft: '4px solid #f39c12' }}>
                <h3>🌍 Real-World API - See Actual Handshakes!</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    Localhost doesn't show DNS/SSL. Let's call a REAL API to see the full timing breakdown!
                </p>
                <button
                    onClick={async () => {
                        setLoading(true);
                        setStatus('Calling real API (JSONPlaceholder)...');
                        console.clear();
                        console.log('🌍 REAL-WORLD API DEMO');
                        console.log('This calls https://jsonplaceholder.typicode.com');
                        console.log('In Network tab → Click the request → Timing tab');
                        console.log('You will NOW see:');
                        console.log('  ✅ DNS Lookup: ~20-50ms (resolving domain)');
                        console.log('  ✅ Initial Connection: ~50-100ms (TCP handshake)');
                        console.log('  ✅ SSL: ~50-150ms (TLS handshake)');
                        console.log('  ✅ Waiting (TTFB): Server processing time');
                        console.log('  ✅ Content Download: Response download time');
                        console.log('\n💡 Compare this to localhost - HUGE difference!');

                        const startTime = performance.now();
                        try {
                            const res = await fetch('https://jsonplaceholder.typicode.com/posts/1');
                            const data = await res.json();
                            const endTime = performance.now();
                            const time = ((endTime - startTime) / 1000).toFixed(2);
                            console.log('✅ Response:', data);
                            console.log(`Total time: ${time}s`);
                            setStatus(`✅ Real API called in ${time}s. Check Timing tab for DNS/SSL/TCP!`);
                        } catch (e) {
                            setStatus('❌ Error calling external API');
                        } finally {
                            setLoading(false);
                        }
                    }}
                    disabled={loading}
                    style={{ ...btnStyle, background: '#f39c12' }}
                >
                    Call Real API (See Handshakes)
                </button>
                <div style={{ marginTop: '10px', padding: '10px', background: '#e8f5e9', borderRadius: '4px', fontSize: '0.85rem' }}>
                    <strong>💡 The Problem:</strong> DNS + TCP + SSL can add 200-400ms BEFORE your server even processes the request!
                    <br /><br />
                    <strong>🔧 The Fixes (What YOU can control):</strong>
                    <ol style={{ marginTop: '8px', marginBottom: '0', paddingLeft: '20px', lineHeight: '1.6' }}>
                        <li><strong>Use a CDN</strong> (Cloudflare, Vercel, AWS CloudFront) - Brings servers closer to users, reduces DNS/TCP time</li>
                        <li><strong>Enable HTTP/2</strong> - Reuses connections, no handshake for every request (most hosting does this automatically)</li>
                        <li><strong>Use Keep-Alive</strong> - Browser reuses TCP connections instead of opening new ones</li>
                        <li><strong>Prefetch DNS</strong> - Add <code>&lt;link rel="dns-prefetch" href="//api.example.com"&gt;</code> to your HTML</li>
                        <li><strong>Reduce API Calls</strong> - Batch requests, use GraphQL, cache aggressively</li>
                    </ol>
                    <div style={{ marginTop: '8px', padding: '8px', background: '#fff3cd', borderRadius: '4px' }}>
                        ⚡ <strong>Quick Win:</strong> If you control the backend, enable HTTP/2 and connection pooling.
                        If you don't, use a CDN. Both are usually one-click in production!
                    </div>
                </div>
            </div>

            {/* Payload Size Comparison */}
            <div style={sectionStyle}>
                <h3>📦 Payload Size Analysis - Big vs Small</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    Compare a tiny request vs a huge one. Watch the Content Download time!
                </p>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <button
                        onClick={async () => {
                            setLoading(true);
                            setStatus('Fetching SMALL payload...');
                            console.clear();
                            console.log('📦 SMALL PAYLOAD DEMO');
                            console.log('Fetching 1 notification (~100 bytes)');

                            const startTime = performance.now();
                            try {
                                const res = await fetch(`${API_BASE}/notifications`);
                                const data = await res.json();
                                const endTime = performance.now();
                                const time = ((endTime - startTime) / 1000).toFixed(2);
                                const size = JSON.stringify(data).length;
                                console.log(`✅ Downloaded ${size} bytes in ${time}s`);
                                setStatus(`✅ Small payload: ${size} bytes in ${time}s`);
                            } catch (e) {
                                setStatus('❌ Error!');
                            } finally {
                                setLoading(false);
                            }
                        }}
                        disabled={loading}
                        style={{ ...btnStyle, background: '#27ae60' }}
                    >
                        Tiny Payload (~100 bytes)
                    </button>
                    <button
                        onClick={async () => {
                            setLoading(true);
                            setStatus('Fetching HUGE payload...');
                            console.clear();
                            console.log('📦 HUGE PAYLOAD DEMO');
                            console.log('Fetching 50,000 items (~5MB)');
                            console.log('Watch the Content Download time in Timing tab!');

                            const startTime = performance.now();
                            try {
                                const res = await fetch(`${API_BASE}/large-data`);
                                const data = await res.json();
                                const endTime = performance.now();
                                const time = ((endTime - startTime) / 1000).toFixed(2);
                                const size = JSON.stringify(data).length;
                                const sizeMB = (size / 1024 / 1024).toFixed(2);
                                console.log(`✅ Downloaded ${sizeMB}MB in ${time}s`);
                                setStatus(`✅ Huge payload: ${sizeMB}MB in ${time}s (${(parseFloat(sizeMB) / parseFloat(time)).toFixed(2)} MB/s)`);
                            } catch (e) {
                                setStatus('❌ Error!');
                            } finally {
                                setLoading(false);
                            }
                        }}
                        disabled={loading}
                        style={{ ...btnStyle, background: '#e74c3c' }}
                    >
                        Huge Payload (~5MB)
                    </button>
                </div>
                <div style={{ marginTop: '10px', padding: '10px', background: '#fff3cd', borderRadius: '4px', fontSize: '0.85rem' }}>
                    💡 <strong>Compare:</strong> Tiny = instant. Huge = noticeable delay.
                    In Network tab, check "Content Download" time - that's the payload size impact!
                </div>
            </div>

            {/* Slow Request Identification */}
            <div style={sectionStyle}>
                <h3>🐌 Spot the Slow Request - Performance Killer</h3>
                <p style={{ fontSize: '0.9rem', marginBottom: '10px' }}>
                    Fire multiple requests. One is SLOW. Can you spot it in the waterfall?
                </p>
                <button
                    onClick={async () => {
                        setLoading(true);
                        setStatus('Firing multiple requests (one is SLOW)...');
                        console.clear();
                        console.log('🐌 SLOW REQUEST DEMO');
                        console.log('Firing 4 requests:');
                        console.log('  1. /notifications - FAST (300ms)');
                        console.log('  2. /stats - Medium (1000ms)');
                        console.log('  3. /posts - Medium (1200ms)');
                        console.log('  4. /user - SLOW (1500ms) ← This is the bottleneck!');
                        console.log('\nIn Network tab waterfall:');
                        console.log('  - Look for the LONGEST bar');
                        console.log('  - That request is blocking your app!');
                        console.log('  - Click it → Timing tab → See where time is spent');

                        const startTime = performance.now();
                        try {
                            await Promise.all([
                                fetch(`${API_BASE}/notifications`),
                                fetch(`${API_BASE}/stats`),
                                fetch(`${API_BASE}/posts`),
                                fetch(`${API_BASE}/user`) // This is the slowest
                            ]);
                            const endTime = performance.now();
                            const time = ((endTime - startTime) / 1000).toFixed(2);
                            console.log(`✅ All requests done in ${time}s`);
                            console.log('💡 The slowest request determined the total time!');
                            setStatus(`✅ Check Network waterfall - /user is the slow one (1.5s)!`);
                        } catch (e) {
                            setStatus('❌ Error!');
                        } finally {
                            setLoading(false);
                        }
                    }}
                    disabled={loading}
                    style={{ ...btnStyle, background: '#9b59b6' }}
                >
                    Fire Multiple Requests
                </button>
                <div style={{ marginTop: '10px', padding: '10px', background: '#e8f5e9', borderRadius: '4px', fontSize: '0.85rem' }}>
                    💡 <strong>Pro Tip:</strong> In the waterfall, the longest bar is your bottleneck.
                    Sort by "Time" column to find slow requests instantly!
                </div>
            </div>

            <div style={sectionStyle}>
                <h3>Slide 17: The Dreaded CORS Error</h3>
                <p>Attempt to fetch from a domain that blocks cross-origin requests (e.g., google.com).</p>
                <button onClick={fetchCors} disabled={loading} style={{ ...btnStyle, background: '#c0392b' }}>
                    Trigger CORS Error
                </button>
            </div>

            <div style={sectionStyle}>
                <h3>Slide 18: 404 & Typos</h3>
                <p>Fetch <code>/Postss</code> instead of <code>/posts</code>.</p>
                <button onClick={fetch404} disabled={loading} style={{ ...btnStyle, background: '#f39c12' }}>
                    Trigger 404
                </button>
            </div>

            <div style={statusStyle}>
                {status || 'Network Status: Idle'}
            </div>
        </div>
    );
};

const sectionStyle: React.CSSProperties = {
    background: '#f9f9f9', padding: '1.5rem', marginBottom: '1rem', borderRadius: '8px', border: '1px solid #eee'
};

const btnStyle: React.CSSProperties = {
    padding: '10px 15px', background: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', transition: 'background 0.2s', marginRight: '5px'
};

const statusStyle: React.CSSProperties = {
    marginTop: '20px', padding: '10px', background: '#ecf0f1', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold'
};

const dataDisplayStyle: React.CSSProperties = {
    background: '#f9f9f9',
    padding: '1.5rem',
    marginTop: '1rem',
    borderRadius: '8px',
    border: '2px solid #27ae60'
};

const loadingStyle: React.CSSProperties = {
    background: '#f9f9f9',
    padding: '2rem',
    marginTop: '1rem',
    borderRadius: '8px',
    border: '2px dashed #3498db',
    textAlign: 'center'
};

const spinnerStyle: React.CSSProperties = {
    width: '40px',
    height: '40px',
    margin: '0 auto 15px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
};

export default NetworkSecrets;
