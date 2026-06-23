import React from 'react';

const A11yAfter: React.FC = () => {
    return (
        <div style={containerStyle}>
            <style>{`
                .action-button-after {
                    background: #3498db;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    border: none;
                    font-size: 1rem;
                    font-family: inherit;
                }
                
                /* Hover state - darker blue with scale and shadow */
                .action-button-after:hover {
                    background: #2980b9;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
                }
                
                /* Focus state - green outline for better visibility */
                .action-button-after:focus {
                    outline: 3px solid #27ae60;
                    outline-offset: 2px;
                    background: #5dade2;
                }
                
                /* Active state - pressed down effect */
                .action-button-after:active {
                    transform: translateY(0);
                    background: #21618c;
                }
            `}</style>

            {/* Proper heading hierarchy starting with h1 */}
            <h1 style={headingStyle}>Accessibility Demo - After Fixes</h1>

            {/* Using semantic section with ARIA label */}
            <section aria-label="User Profile" style={sectionStyle}>
                <h2 style={subHeadingStyle}>User Profile</h2>
                <div style={cardStyle}>
                    <div style={labelStyle}>Name</div>
                    <div style={valueStyle}>John Doe</div>
                    <div style={labelStyle}>Email</div>
                    <div style={valueStyle}>john.doe@example.com</div>
                    <div style={labelStyle}>Role</div>
                    <div style={valueStyle}>Developer</div>
                </div>
            </section>

            {/* Proper heading hierarchy h2 */}
            <section aria-label="Recent Activity" style={sectionStyle}>
                <h2 style={subHeadingStyle}>Recent Activity</h2>
                <div style={cardStyle}>
                    <ul style={activityListStyle} aria-label="Activity timeline">
                        <li style={activityItemStyle}>
                            <div style={activityIconStyle} aria-hidden="true">📝</div>
                            <div>
                                <div style={activityTitleStyle}>Updated documentation</div>
                                <div style={activityTimeStyle}>2 hours ago</div>
                            </div>
                        </li>
                        <li style={activityItemStyle}>
                            <div style={activityIconStyle} aria-hidden="true">🐛</div>
                            <div>
                                <div style={activityTitleStyle}>Fixed bug in login flow</div>
                                <div style={activityTimeStyle}>5 hours ago</div>
                            </div>
                        </li>
                        <li style={activityItemStyle}>
                            <div style={activityIconStyle} aria-hidden="true">✨</div>
                            <div>
                                <div style={activityTitleStyle}>Added new feature</div>
                                <div style={activityTimeStyle}>1 day ago</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* Semantic nav element with ARIA label and proper heading */}
            <section aria-label="Quick Actions" style={sectionStyle}>
                <h2 style={subHeadingStyle}>Quick Actions</h2>
                <nav aria-label="User actions navigation">
                    <div style={buttonContainerStyle}>
                        <button className="action-button-after" aria-label="Edit your profile">Edit Profile</button>
                        <button className="action-button-after" aria-label="View account settings">View Settings</button>
                        <button className="action-button-after" aria-label="Logout from your account">Logout</button>
                    </div>
                </nav>
            </section>

            {/* Form with proper labels and ARIA */}
            <section aria-label="Send Message Form" style={sectionStyle}>
                <h2 style={subHeadingStyle}>Send Message</h2>
                <form style={formStyle} aria-label="Contact form">
                    <label htmlFor="message-subject" style={formLabelStyle}>
                        Subject
                        <input
                            id="message-subject"
                            type="text"
                            placeholder="Enter subject"
                            style={inputStyle}
                            aria-required="true"
                        />
                    </label>
                    <label htmlFor="message-content" style={formLabelStyle}>
                        Message
                        <textarea
                            id="message-content"
                            placeholder="Type your message here..."
                            style={textareaStyle}
                            aria-required="true"
                        />
                    </label>
                    <button
                        type="submit"
                        style={submitButtonStyle}
                        aria-label="Send message"
                    >
                        Send
                    </button>
                </form>
            </section>

            {/* Contrast example - good contrast */}
            <section aria-label="Color Contrast Example" style={sectionStyle}>
                <h2 style={subHeadingStyle}>Color Contrast Example</h2>
                <div style={contrastCardStyle}>
                    <p style={goodContrastTextStyle}>
                        This text has proper color contrast (dark gray on white background).
                        It's easy to read for all users, including those with visual impairments.
                        The contrast ratio is approximately 12:1, which exceeds WCAG AAA standards (requires 7:1).
                    </p>
                    <button style={goodContrastButtonStyle} aria-label="Example action button">
                        Click Me
                    </button>
                </div>
            </section>

            {/* Info box with proper ARIA role and label */}
            <aside
                role="note"
                aria-label="Accessibility information"
                style={infoBoxStyle}
            >
                <div style={infoIconStyle} aria-hidden="true">ℹ️</div>
                <div>
                    This page demonstrates proper accessibility practices.
                    It uses correct heading hierarchy (h1→h2), semantic HTML elements
                    (section, nav, aside), and ARIA labels for screen readers.
                </div>
            </aside>
        </div>
    );
};

const containerStyle: React.CSSProperties = {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '2rem',
    fontFamily: 'Inter-Black, Arial, sans-serif', // Inter-Black won't load, falls back to Arial
    backgroundColor: '#f5f7fa',
    minHeight: '100vh'
};

const headingStyle: React.CSSProperties = {
    color: '#2c3e50',
    marginBottom: '2rem',
    fontSize: '2.5rem',
    fontWeight: 'bold'
};

const subHeadingStyle: React.CSSProperties = {
    color: '#34495e',
    marginBottom: '1rem',
    fontSize: '1.5rem',
    fontWeight: '600'
};

const sectionStyle: React.CSSProperties = {
    marginBottom: '2rem'
};

const cardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed'
};

const labelStyle: React.CSSProperties = {
    color: '#7f8c8d',
    fontSize: '0.875rem',
    marginTop: '0.75rem',
    fontWeight: '500'
};

const valueStyle: React.CSSProperties = {
    color: '#2c3e50',
    fontSize: '1rem',
    marginTop: '0.25rem',
    marginBottom: '0.5rem'
};

const activityListStyle: React.CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0
};

const activityItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    padding: '1rem 0',
    borderBottom: '1px solid #ecf0f1'
};

const activityIconStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ecf0f1',
    borderRadius: '50%'
};

const activityTitleStyle: React.CSSProperties = {
    color: '#2c3e50',
    fontWeight: '500',
    marginBottom: '0.25rem'
};

const activityTimeStyle: React.CSSProperties = {
    color: '#95a5a6',
    fontSize: '0.875rem'
};

const buttonContainerStyle: React.CSSProperties = {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap'
};

const formStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
};

const formLabelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    color: '#2c3e50',
    fontWeight: '500'
};

const inputStyle: React.CSSProperties = {
    padding: '0.75rem',
    border: '1px solid #dfe6e9',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'inherit'
};

const textareaStyle: React.CSSProperties = {
    padding: '0.75rem',
    border: '1px solid #dfe6e9',
    borderRadius: '6px',
    fontSize: '1rem',
    fontFamily: 'inherit',
    minHeight: '120px',
    resize: 'vertical'
};

const submitButtonStyle: React.CSSProperties = {
    background: '#27ae60',
    color: 'white',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'flex-start',
    border: 'none',
    fontSize: '1rem',
    fontFamily: 'inherit'
};

const contrastCardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed'
};

const goodContrastTextStyle: React.CSSProperties = {
    color: '#333', // Dark gray on white - excellent contrast
    fontSize: '1rem',
    lineHeight: '1.6',
    margin: 0,
    marginBottom: '1.5rem'
};

const goodContrastButtonStyle: React.CSSProperties = {
    background: '#2c3e50', // Dark background
    color: '#ffffff', // White text - excellent contrast
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    border: 'none',
    fontSize: '1rem',
    fontFamily: 'inherit'
};

const infoBoxStyle: React.CSSProperties = {
    background: '#d1ecf1',
    border: '1px solid #17a2b8',
    borderRadius: '8px',
    padding: '1rem',
    display: 'flex',
    gap: '1rem',
    alignItems: 'flex-start',
    marginTop: '2rem'
};

const infoIconStyle: React.CSSProperties = {
    fontSize: '1.5rem'
};

export default A11yAfter;
