
import React, { useState } from 'react';

const ConsoleLevels: React.FC = () => {
    const [status, setStatus] = useState<string>('');

    // Demo for Slide 5: Level Up Your Console Game
    const demoConsoleTable = () => {
        const users = [
            { id: 101, name: 'Alice', role: 'Dev', points: 1205 },
            { id: 102, name: 'Bob', role: 'Design', points: 980 },
            { id: 103, name: 'Charlie', role: 'Mgr', points: 750 },
            { id: 104, name: 'Dave', role: 'Dev', points: 1400 },
        ];
        console.clear();
        console.log('--- Basic: Typical Log ---');
        console.log('users:', users);
        console.log('user:', users[0]);

        console.log('--- Advanced: console.table(users) ---');
        console.table(users);
        console.log('%c User Data Loaded', 'background: #12d061; color: white; padding: 4px;', users.length);
        setStatus('Console: Table & Styles');
    };

    // Demo for Slide 6: Console Methods
    const demoConsoleGroup = async () => {
        console.clear();
        setStatus('Running Async Group Demo (Wait for it)...');

        const mockFetch = (id: number) => new Promise(resolve => {
            setTimeout(() => resolve({ id, name: `User ${id}`, role: 'Admin', meta: { attempts: 3 } }), 800);
        });

        console.log('❌ WITHOUT Groups (Flat & Hard to Read):');
        console.log('Starting Process for ID 101...');
        console.log('Validating request...');
        // We simulate sequential awaiting to show the "flat" nature of logs appearing over time
        const data1 = await mockFetch(101);
        console.log('Data received for 101:', data1);
        console.log('Starting Process for ID 102...');
        console.log('Validating request...');
        const data2 = await mockFetch(102);
        console.log('Data received for 102:', data2);

        console.log('\n\n✨ WITH Groups (Logical blocks):');

        console.group('🚀 Processing User 101');
        console.log('Status: Validating...');
        console.time('Fetch 101');
        const d1 = await mockFetch(101);
        console.timeEnd('Fetch 101');
        console.log('Result:', d1);
        console.groupEnd();

        console.group('🚀 Processing User 102');
        console.log('Status: Validating...');
        console.time('Fetch 102');
        const d2 = await mockFetch(102);
        console.timeEnd('Fetch 102');
        console.log('Result:', d2);
        console.groupEnd();

        setStatus('Console: Async flows finished. Check the groups!');
    };

    const demoConsoleDir = () => {
        console.clear();
        console.log('❌ console.log(element): Shows HTML string (on some browsers) or element ref');
        const btn = document.getElementById('magic-btn');
        console.log(btn);

        console.log('\n✨ console.dir(element): Force Object Properties view');
        console.dir(btn);

        setStatus('Console: Compare log (HTML) vs dir (Object Props)');
    };

    const demoConsoleTime = () => {
        console.clear();
        console.time('ExpensiveLoop');
        setStatus('Running expensive loop...');
        let x = 0;
        for (let i = 0; i < 500000; i++) x += Math.random();
        console.timeEnd('ExpensiveLoop');
        setStatus('Loop finished! Check console time.');
    };

    const demoConsoleAssert = () => {
        console.clear();
        const isLoggedIn = false;
        console.log('Is user logged in?', isLoggedIn);
        console.assert(isLoggedIn, 'User is NOT logged in! (This only logs if condition is false)');
        setStatus('Assert demo triggered (failed intentionally if !loggedIn)');
    };

    // Demo for Advanced: console.trace()
    const demoConsoleTrace = () => {
        console.clear();

        const levelThree = () => {
            console.trace('🔍 How did we get here?');
        };

        const levelTwo = () => {
            levelThree();
        };

        const levelOne = () => {
            levelTwo();
        };

        console.log('Calling nested functions...');
        levelOne();
        setStatus('Trace: Check the call stack in console!');
    };

    // Demo for Advanced: console.count()
    const demoConsoleCount = () => {
        console.clear();

        const processItem = (item: string) => {
            console.count(`Processing: ${item}`);
        };

        console.log('Processing items...');
        processItem('apple');
        processItem('banana');
        processItem('apple'); // This will show count: 2
        processItem('banana');
        processItem('apple'); // This will show count: 3

        console.log('\nResetting apple counter...');
        console.countReset('Processing: apple');
        processItem('apple'); // Back to count: 1

        setStatus('Count: See how many times each item was processed!');
    };

    // Demo for Advanced: Conditional Logging
    const demoConditionalLogging = () => {
        console.clear();

        const DEBUG = true;
        const VERBOSE = false;

        console.log('--- Without Conditional Logging (Always logs) ---');
        console.log('This always appears');
        console.log('So does this');
        console.log('And this...');

        console.log('\n--- With Conditional Logging (Smart) ---');
        DEBUG && console.log('✅ DEBUG is ON: This appears');
        VERBOSE && console.log('❌ VERBOSE is OFF: This will NOT appear');

        console.log('\n--- Real-World Example ---');
        const user = { id: 123, name: 'Alice' };
        DEBUG && console.log('User object:', user);
        DEBUG && console.table([user]);

        setStatus('Conditional: Check how DEBUG flag controls logging!');
    };

    // Demo for Advanced: Reading Stack Traces
    const demoReadStackTrace = () => {
        console.clear();

        console.log('📚 LESSON: How to Read Stack Traces\n');

        // Example 1: Simple Error with Stack
        console.log('--- Example 1: TypeError (Most Common) ---');
        try {
            const obj: any = null;
            obj.someMethod(); // This will throw
        } catch (error: any) {
            console.error('❌ Error caught:', error.message);
            console.log('\n📖 Reading the stack:');
            console.log(error.stack);
            console.log('\n💡 TIP: Read from BOTTOM to TOP to see the execution flow!');
        }

        // Example 2: Nested Function Error
        console.log('\n--- Example 2: Error in Nested Functions ---');

        const deepFunction = () => {
            throw new Error('Something broke in the deepest level!');
        };

        const middleFunction = () => {
            deepFunction();
        };

        const topFunction = () => {
            middleFunction();
        };

        try {
            topFunction();
        } catch (error: any) {
            console.error('❌ Error:', error.message);
            console.log('\n📖 Stack trace shows the path:');
            console.log(error.stack);
            console.log('\n💡 You can see: topFunction → middleFunction → deepFunction');
        }

        // Example 3: console.trace() vs Error Stack
        console.log('\n--- Example 3: console.trace() for Non-Errors ---');
        console.log('Use console.trace() when you want a stack WITHOUT throwing an error:');

        const suspiciousFunction = () => {
            console.trace('🔍 How did we get here? (No error, just curious)');
        };

        suspiciousFunction();

        console.log('\n--- Key Differences ---');
        console.log('• Error.stack: Only when something breaks');
        console.log('• console.trace(): Anytime you want to see the call path');
        console.log('• Both show: File name, line number, function name');

        setStatus('Stack Trace: Check console for the full lesson!');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
            <h1 style={{ borderBottom: '2px solid #3498db' }}>Console Mastery 🖥️</h1>
            <p className="lead">Open DevTools (F12 or Cmd+Option+I) to see the magic.</p>

            <div className="card-container">
                <div style={sectionStyle}>
                    <h3>Slide 5: Level Up (Table & Style)</h3>
                    <button onClick={demoConsoleTable} style={btnStyle}>Run console.table()</button>
                    <p style={noteStyle}>Compare `console.log` vs `console.table` vs Styled logs (`%c`)</p>
                </div>

                <div style={sectionStyle}>
                    <h3>Slide 6: Grouping & Timing</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button onClick={demoConsoleGroup} style={btnStyle}>console.group() (Async Demo)</button>
                        <button onClick={demoConsoleTime} style={btnStyle}>console.time()</button>
                        <button onClick={demoConsoleAssert} style={btnStyle}>console.assert()</button>
                    </div>
                </div>

                <div style={sectionStyle}>
                    <h3>Slide 9: Hidden Gems ($0 & dir)</h3>
                    <p>Select this button in Elements panel, type <code>$0</code> in console.</p>
                    <button id="magic-btn" style={{ ...btnStyle, background: '#e74c3c' }}>Inspect Me!</button>
                    <p style={noteStyle}>Try: <code>$0.style.transform = 'rotate(180deg)'</code></p>

                    <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid #ddd' }} />

                    <p>Compare logging an element vs. dir-ing it:</p>
                    <button onClick={demoConsoleDir} style={btnStyle}>Run console.dir(btn)</button>
                </div>

                <div style={{ ...sectionStyle, background: '#fff3cd', borderLeft: '4px solid #ffc107' }}>
                    <h3>🎓 Advanced Techniques (Senior Level)</h3>
                    <p style={noteStyle}>These are techniques that separate juniors from seniors:</p>

                    <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '10px 0 5px 0', fontSize: '1rem' }}>console.trace() - See the Call Stack</h4>
                        <button onClick={demoConsoleTrace} style={{ ...btnStyle, background: '#8e44ad' }}>
                            Run console.trace()
                        </button>
                        <p style={noteStyle}>Shows exactly how the code got to that point. Perfect for understanding execution flow.</p>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '10px 0 5px 0', fontSize: '1rem' }}>console.count() - Track Function Calls</h4>
                        <button onClick={demoConsoleCount} style={{ ...btnStyle, background: '#e67e22' }}>
                            Run console.count()
                        </button>
                        <p style={noteStyle}>Count how many times a function runs. Great for finding infinite loops or performance issues.</p>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '10px 0 5px 0', fontSize: '1rem' }}>Conditional Logging - Production-Ready</h4>
                        <button onClick={demoConditionalLogging} style={{ ...btnStyle, background: '#16a085' }}>
                            Run Conditional Logging
                        </button>
                        <p style={noteStyle}>Use DEBUG flags to control logging. This is how real apps avoid console spam in production.</p>
                    </div>

                    <div style={{ marginBottom: '15px' }}>
                        <h4 style={{ margin: '10px 0 5px 0', fontSize: '1rem' }}>📚 Reading Stack Traces - Critical Skill</h4>
                        <button onClick={demoReadStackTrace} style={{ ...btnStyle, background: '#c0392b' }}>
                            Learn to Read Stack Traces
                        </button>
                        <p style={noteStyle}>Understand error stacks and console.trace(). Shows TypeError, nested errors, and how to read them bottom-to-top.</p>
                    </div>
                </div>
            </div>

            {status && <div style={statusStyle}>Latest Action: {status}</div>}
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

const statusStyle: React.CSSProperties = {
    marginTop: '20px', padding: '10px', background: '#dff9fb', borderRadius: '4px', textAlign: 'center'
};

export default ConsoleLevels;
