
import React, { useState } from 'react';

const DebuggingDemo: React.FC = () => {
    const [networkStatus, setNetworkStatus] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [photos, setPhotos] = useState<any[]>([]);
    const [buttonColor, setButtonColor] = useState('#3498db');

    // --- 1. Console Mastery Demos ---
    const demoConsoleTable = () => {
        const users = [
            { id: 1, name: 'Alice', role: 'Dev', points: 1205 },
            { id: 2, name: 'Bob', role: 'Design', points: 980 },
            { id: 3, name: 'Charlie', role: 'Manager', points: 750 },
            { id: 4, name: 'David', role: 'Dev', points: 1400 },
            { id: 5, name: 'Eve', role: 'QA', points: 890 }
        ];
        console.log('--- Traditional array log ---');
        console.log(users);
        console.log('--- Structured table ---');
        console.table(users);
        alert('Check your Console! (Cmd+Option+J or F12)');
    };

    const demoConsoleGroup = () => {
        console.group('Fetching Profile Data...');
        console.log('Looking up user ID: 123');
        console.warn('API Warning: Deprecated field "legacy_name" used');
        console.error('API Error: 404 Not Found (simulated)');
        console.info('Retrying with backup...');
        console.groupEnd();

        console.groupCollapsed('Click to expand hidden group');
        console.log('Secret details only visible when expanded!');
        console.log({ detailed: true, hidden: 'yes' });
        console.groupEnd();
        alert('Groups created in Console!');
    };

    const demoConsoleTime = () => {
        console.time('Expensive Calculation');
        // Simulate work
        let x = 0;
        for (let i = 0; i < 1000000; i++) {
            x += Math.random();
        }
        console.timeEnd('Expensive Calculation');
        alert('Timer finished! Check the time in Console.');
    };

    // --- 2. Element Magic Demo ---
    const handleColorChange = () => {
        const newColor = buttonColor === 'red' ? '#3498db' : 'red';
        setButtonColor(newColor);
        console.log(`Button color changed to ${newColor}. Try selecting the button in Elements tab and typing $0.style.transform = "rotate(10deg)"`);
    };

    // --- 3. Network & Throttling Demo ---
    const fetchLargeData = async () => {
        setLoading(true);
        setNetworkStatus('Fetching large dataset (5000 items)...');

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/photos');
            const data = await response.json();

            console.log(`Received ${data.length} photos.`);
            console.table(data.slice(0, 5));

            setPhotos(data.slice(0, 5)); // Just store 5 for UI
            setNetworkStatus(`Success! Fetched ${data.length} items. Check network tab for size/timing.`);
        } catch (error) {
            console.error('Fetch failed:', error);
            setNetworkStatus('Fetch failed. Open console for details.');
        } finally {
            setLoading(false);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const username = (form.elements.namedItem('username') as HTMLInputElement).value;

        console.log('Submitting form for:', username);
        setNetworkStatus('Submitting form...');

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: 'New Submission',
                    body: `User ${username} submitted this.`,
                    userId: 1,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });

            const json = await response.json();
            console.log('Server response:', json);
            setNetworkStatus(`Submission successful! ID: ${json.id}`);

            alert('Form submitted! Now go to Network tab -> Find POST request -> Right-click -> "Copy as fetch" -> Paste in Console -> Edit body -> Enter!');
        } catch (error) {
            console.error('Submission error:', error);
            setNetworkStatus('Submission failed.');
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
            <h1 style={{ borderBottom: '2px solid #3498db', paddingBottom: '10px', color: '#2c3e50' }}>
                Debugging Like a Senior - React Demo
            </h1>

            {/* Section 1: Console */}
            <div className="card" style={cardStyle}>
                <h2>1. Console Mastery</h2>
                <p>Open the console to see the output when you click these.</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={btnStyle} onClick={demoConsoleTable}>console.table()</button>
                    <button style={btnStyle} onClick={demoConsoleGroup}>console.group()</button>
                    <button style={btnStyle} onClick={demoConsoleTime}>console.time()</button>
                </div>
            </div>

            {/* Section 2: Element Reference ($0) */}
            <div className="card" style={cardStyle}>
                <h2>2. Element Magic ($0)</h2>
                <p>Inspect the button below! Select it in 'Elements' tab and type <code>$0</code> in console.</p>
                <button
                    onClick={handleColorChange}
                    style={{ ...btnStyle, backgroundColor: buttonColor }}
                >
                    Change My Color
                </button>
            </div>

            {/* Section 3: Network */}
            <div className="card" style={cardStyle}>
                <h2>3. Network Requests & Throttling</h2>
                <p>Test network speeds and request modification.</p>

                <div style={{ marginBottom: '15px' }}>
                    <button style={btnStyle} onClick={fetchLargeData} disabled={loading}>
                        {loading ? 'Loading...' : 'Fetch Large Data (Photos)'}
                    </button>
                </div>

                <div style={{ marginTop: '20px', borderTop: '1px solid #eee', paddingTop: '15px' }}>
                    <h3>Submitting Data (for 'Copy as Fetch')</h3>
                    <form onSubmit={handleFormSubmit} style={{ display: 'flex', gap: '10px' }}>
                        <input
                            name="username"
                            placeholder="Enter User (e.g. admin)"
                            required
                            style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                        <button type="submit" style={btnStyle}>Submit Data</button>
                    </form>
                </div>

                {networkStatus && (
                    <div style={{ marginTop: '10px', padding: '10px', background: '#f0f0f0', borderRadius: '4px' }}>
                        <strong>Status:</strong> {networkStatus}
                    </div>
                )}

                {photos.length > 0 && (
                    <div style={{ marginTop: '10px' }}>
                        <p>Preview of fetched data:</p>
                        <ul style={{ maxHeight: '100px', overflowY: 'auto', background: '#fff', padding: '10px', border: '1px solid #ddd' }}>
                            {photos.map(p => <li key={p.id}>{p.title.substring(0, 30)}...</li>)}
                        </ul>
                    </div>
                )}
            </div>

            {/* Section 4: Local Overrides */}
            <div className="card" style={cardStyle}>
                <h2>4. Local Overrides</h2>
                <p>
                    Try using <strong>Sources -&gt; Overrides</strong> to make permanent changes to this text or the background color of this card.
                </p>
            </div>
        </div>
    );
};

// Simple inline styles for the demo
const cardStyle: React.CSSProperties = {
    background: 'white',
    padding: '20px',
    marginBottom: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    color: '#333'
};

const btnStyle: React.CSSProperties = {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
};

export default DebuggingDemo;
