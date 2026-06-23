
import React, { useState } from 'react';

const BreakpointMastery: React.FC = () => {
    // Demo for Slide 10: Counter Bug
    const [count, setCount] = useState(0);

    const increment = () => {
        // BREAKPOINT HERE
        // Explain: setCount is async-like. Both access the stale 'count' value.
        setCount(count + 1);
        setCount(count + 1); // This line is effectively ignored
        console.log('Incremented twice... supposedly.');
    };

    const incrementFixed = () => {
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
    }

    // Demo for Slide 7: Conditional Breakpoints logic
    const processUsers = () => {
        const users = Array.from({ length: 50 }, (_, i) => ({
            id: i + 1,
            name: `User ${i + 1}`,
            status: i === 42 ? 'error' : 'ok' // User 43 has an error
        }));

        console.log('Processing 50 users...');
        users.forEach(user => {
            // IMAGINE A BREAKPOINT HERE
            // Condition: user.id === 43
            if (user.status === 'error') {
                console.error(`Error processing User ${user.id}`);
            }
        });
        alert('Check Console! Use conditional breakpoint on line 28 (approx) to catch User 43.');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ borderBottom: '2px solid #e74c3c' }}>Breakpoints & Watch 🛑</h1>
            <p>Mastering the Sources tab and understanding React state bugs.</p>

            <div style={sectionStyle}>
                <h3>Slide 10: The "Two Updates" Bug</h3>
                <p>Clicking "Increment +2 (Buggy)" only adds 1. Why?</p>
                <div style={{ fontSize: '2rem', margin: '1rem 0' }}>Count: {count}</div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button onClick={increment} style={{ ...btnStyle, background: '#e74c3c' }}>Increment +2 (Buggy)</button>
                    <button onClick={incrementFixed} style={{ ...btnStyle, background: '#2ecc71' }}>Increment +2 (Fixed)</button>
                    <button onClick={() => setCount(0)} style={btnStyle}>Reset</button>
                </div>
                <p style={noteStyle}>
                    <strong>Demo:</strong> Breakpoint inside `increment`. Add `count` to <strong>Watch</strong> panel. Step through.
                </p>
            </div>

            <div style={sectionStyle}>
                <h3>Slide 7: Conditional Breakpoints</h3>
                <p>Processing 50 users. Only User #43 has an error. Don't step 43 times!</p>
                <button onClick={processUsers} style={btnStyle}>Process Users</button>
                <p style={noteStyle}>
                    <strong>Demo:</strong> Open Sources. Find `processUsers` loop. Right-click line number -&gt; <em>Add conditional breakpoint</em> -&gt; `user.id === 43`.
                </p>
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

const noteStyle: React.CSSProperties = { fontSize: '0.9rem', color: '#666', marginTop: '5px' };

export default BreakpointMastery;
