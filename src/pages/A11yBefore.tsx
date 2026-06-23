import React from 'react';

const A11yBefore: React.FC = () => {
    return (
        <div style={containerStyle}>
            <style>{`
                .action-button-before {
                    background: #3498db;
                    color: white;
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    user-select: none;
                }
                
                /* Hover state - darker blue with scale */
                .action-button-before:hover {
                    background: #2980b9;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
                }
                
                /* Focus state - orange outline */
                .action-button-before:focus {
                    outline: 3px solid #e67e22;
                    outline-offset: 2px;
                    background: #5dade2;
                }
                
                /* Active state - pressed down */
                .action-button-before:active {
                    transform: translateY(0);
                    background: #21618c;
                }
            `}</style>

            {/* Poor heading hierarchy - skipping from h1 to h4 */}
            <h1 style={headingStyle}>Accessibility Demo - Before Fixes</h1>

            {/* Using divs instead of semantic sections */}
            <div style={sectionStyle}>
                <h4 style={subHeadingStyle}>User Profile</h4>
                <div style={cardStyle}>
                    <div style={labelStyle}>Name</div>
                    <div style={valueStyle}>John Doe</div>
                    <div style={labelStyle}>Email</div>
                    <div style={valueStyle}>john.doe@example.com</div>
                    <div style={labelStyle}>Role</div>
                    <div style={valueStyle}>Developer</div>
                </div>
            </div>

            {/* Another section without proper heading hierarchy */}
            <div style={sectionStyle}>
                <h1 style={subHeadingStyle}>Recent Activity</h1>
                <div style={cardStyle}>
                    <div style={activityItemStyle}>
                        <div style={activityIconStyle}>📝</div>
                        <div>
                            <div style={activityTitleStyle}>Updated documentation</div>
                            <div style={activityTimeStyle}>2 hours ago</div>
                        </div>
                    </div>
                    <div style={activityItemStyle}>
                        <div style={activityIconStyle}>🐛</div>
                        <div>
                            <div style={activityTitleStyle}>Fixed bug in login flow</div>
                            <div style={activityTimeStyle}>5 hours ago</div>
                        </div>
                    </div>
                    <div style={activityItemStyle}>
                        <div style={activityIconStyle}>✨</div>
                        <div>
                            <div style={activityTitleStyle}>Added new feature</div>
                            <div style={activityTimeStyle}>1 day ago</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation without semantic nav element or ARIA */}
            <div style={sectionStyle}>
                <h3 style={subHeadingStyle}>Quick Actions</h3>
                <div style={buttonContainerStyle}>
                    <div className="action-button-before" tabIndex={0}>Edit Profile</div>
                    <div className="action-button-before" tabIndex={0}>View Settings</div>
                    <div className="action-button-before" tabIndex={0}>Logout</div>
                </div>
            </div>

            {/* Form without proper labels or ARIA */}
            <div style={sectionStyle}>
                <h5 style={subHeadingStyle}>Send Message</h5>
                <div style={formStyle}>
                    <input
                        type="text"
                        placeholder="Subject"
                        style={inputStyle}
                    />
                    <textarea
                        placeholder="Your message..."
                        style={textareaStyle}
                    />
                    <div style={submitButtonStyle}>Send</div>
                </div>
            </div>

            {/* Contrast issue example - poor contrast */}
            <div style={sectionStyle}>
                <h2 style={subHeadingStyle}>Color Contrast Example</h2>
                <div style={contrastCardStyle}>
                    <div style={poorContrastTextStyle}>
                        This text has poor color contrast (light gray on white background).
                        It's difficult to read, especially for users with visual impairments.
                        The contrast ratio is approximately 2.5:1, which fails WCAG AA standards (requires 4.5:1).
                    </div>
                    <div style={poorContrastButtonStyle}>
                        Click Me
                    </div>
                </div>
            </div>

            {/* Info box without ARIA role or label */}
            <div style={infoBoxStyle}>
                <div style={infoIconStyle}>ℹ️</div>
                <div>
                    This page demonstrates poor accessibility practices.
                    Screen readers will struggle with the heading hierarchy,
                    and there are no semantic HTML elements or ARIA labels.
                </div>
            </div>
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
    alignSelf: 'flex-start'
};

const contrastCardStyle: React.CSSProperties = {
    background: 'white',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #e1e8ed'
};

const poorContrastTextStyle: React.CSSProperties = {
    color: '#bbb', // Very light gray on white - poor contrast
    fontSize: '1rem',
    lineHeight: '1.6',
    marginBottom: '1.5rem'
};

const poorContrastButtonStyle: React.CSSProperties = {
    background: '#f0f0f0', // Light gray background
    color: '#ccc', // Light gray text - very poor contrast
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '500',
    display: 'inline-block'
};

const infoBoxStyle: React.CSSProperties = {
    background: '#fff3cd',
    border: '1px solid #ffc107',
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

export default A11yBefore;
