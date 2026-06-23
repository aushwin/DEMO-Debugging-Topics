import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Simulate slow endpoints for demo purposes
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Endpoint 1: Get user data (slow)
app.get('/api/user', async (req: Request, res: Response) => {
    await delay(1500); // 1.5 second delay
    res.json({
        id: 1,
        name: 'Alice Johnson',
        email: 'alice@example.com',
        role: 'Developer'
    });
});

// Endpoint 2: Get user posts (slow)
app.get('/api/posts', async (req: Request, res: Response) => {
    await delay(1200); // 1.2 second delay
    res.json([
        { id: 1, title: 'My First Post', likes: 42 },
        { id: 2, title: 'React Tips', likes: 128 },
        { id: 3, title: 'Debugging Guide', likes: 95 }
    ]);
});

// Endpoint 3: Get user stats (slow)
app.get('/api/stats', async (req: Request, res: Response) => {
    await delay(1000); // 1 second delay
    res.json({
        followers: 1234,
        following: 567,
        totalPosts: 89
    });
});

// Endpoint 4: Get notifications (fast)
app.get('/api/notifications', async (req: Request, res: Response) => {
    await delay(300); // 0.3 second delay
    res.json({
        unread: 5,
        total: 42
    });
});

// Endpoint 5: Large payload (for timing breakdown demo)
app.get('/api/large-data', async (req: Request, res: Response) => {
    await delay(500); // Simulate processing time
    
    // Generate a large JSON payload (~5MB)
    const largeArray = Array.from({ length: 50000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        description: `This is a description for item ${i}. It contains some text to make the payload larger.`,
        metadata: {
            created: new Date().toISOString(),
            tags: ['tag1', 'tag2', 'tag3'],
            nested: {
                level1: { level2: { level3: 'deep data' } }
            }
        }
    }));
    
    res.json({
        total: largeArray.length,
        data: largeArray
    });
});

// Endpoint 6: Slow endpoint with custom headers (for timing breakdown)
app.get('/api/slow-with-headers', async (req: Request, res: Response) => {
    // Simulate DNS lookup delay
    await delay(200);
    
    // Simulate SSL handshake delay
    await delay(300);
    
    // Simulate server processing
    await delay(1000);
    
    res.setHeader('X-Custom-Header', 'Demo-Value');
    res.setHeader('X-Processing-Time', '1500ms');
    res.setHeader('X-Server', 'Demo-Backend');
    
    res.json({
        message: 'This request has custom headers and timing delays',
        timestamp: new Date().toISOString()
    });
});

// Endpoint 7: Simulate 500 error
app.get('/api/error-500', async (req: Request, res: Response) => {
    await delay(500);
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Something went wrong on the server',
        code: 'SERVER_ERROR'
    });
});

// Endpoint 8: Simulate timeout (very slow)
app.get('/api/timeout', async (req: Request, res: Response) => {
    await delay(30000); // 30 seconds - will likely timeout
    res.json({ message: 'If you see this, you waited 30 seconds!' });
});

// Endpoint 9: POST endpoint with payload inspection
app.post('/api/submit', async (req: Request, res: Response) => {
    await delay(800);
    
    console.log('📨 Received POST data:', req.body);
    
    res.json({
        success: true,
        received: req.body,
        timestamp: new Date().toISOString(),
        message: 'Data received successfully'
    });
});

// Endpoint 10: Multiple redirects (for redirect chain demo)
app.get('/api/redirect-1', (req: Request, res: Response) => {
    res.redirect('/api/redirect-2');
});

app.get('/api/redirect-2', (req: Request, res: Response) => {
    res.redirect('/api/redirect-3');
});

app.get('/api/redirect-3', (req: Request, res: Response) => {
    res.json({ message: 'You followed 3 redirects to get here!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Demo backend running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  - GET /api/user');
    console.log('  - GET /api/posts');
    console.log('  - GET /api/stats');
    console.log('  - GET /api/notifications');
    console.log('  - GET /api/large-data (5MB payload)');
    console.log('  - GET /api/slow-with-headers (timing breakdown)');
    console.log('  - GET /api/error-500 (server error)');
    console.log('  - GET /api/timeout (30s delay)');
    console.log('  - POST /api/submit (inspect payload)');
    console.log('  - GET /api/redirect-1 (redirect chain)');
});
