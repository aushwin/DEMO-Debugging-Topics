
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif', textAlign: 'center' }}>
            <h1 style={{ color: '#2c3e50', marginBottom: '1rem' }}>Debugging Like a Senior 🕵️‍♂️</h1>
            <p style={{ color: '#7f8c8d', fontSize: '1.2rem', marginBottom: '2rem' }}>
                Interactive Demo Environment
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <Link to="/console" style={cardStyle}>
                    <h2>🖥️ Console Mastery</h2>
                    <p>Level up from console.log to console.table, group, and time.</p>
                </Link>

                <Link to="/breakpoints" style={cardStyle}>
                    <h2>🛑 Breakpoints & State</h2>
                    <p>Debug the "Counter Bug" and master conditional breakpoints.</p>
                </Link>

                <Link to="/network" style={cardStyle}>
                    <h2>🌐 Network Secrets</h2>
                    <p>Waterfalls, slow 3G simulation, CORS errors, and 404s.</p>
                </Link>

                <Link to="/a11y-before" style={cardStyle}>
                    <h2>❌ A11y Before</h2>
                    <p>Poor accessibility: broken heading hierarchy, no semantic HTML.</p>
                </Link>

                <Link to="/a11y-after" style={cardStyle}>
                    <h2>✅ A11y After</h2>
                    <p>Proper accessibility: correct headings, ARIA labels, semantic HTML.</p>
                </Link>
            </div>

            <div style={{ marginTop: '3rem', padding: '1rem', background: '#ecf0f1', borderRadius: '8px' }}>
                <h3>🎤 Speaker Notes</h3>
                <p>Open <code>presentation_guide.md</code> for the full script!</p>
            </div>
        </div>
    );
};

const cardStyle: React.CSSProperties = {
    display: 'block',
    padding: '2rem',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    textDecoration: 'none',
    color: '#2c3e50',
    transition: 'transform 0.2s',
    border: '1px solid #eee'
};

export default Home;
