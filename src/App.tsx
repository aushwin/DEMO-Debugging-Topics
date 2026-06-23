import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import ConsoleLevels from './pages/ConsoleLevels';
import BreakpointMastery from './pages/BreakpointMastery';
import NetworkSecrets from './pages/NetworkSecrets';
import A11yBefore from './pages/A11yBefore';
import A11yAfter from './pages/A11yAfter';
import './App.css'

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', background: '#34495e', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>🏠 Home</Link>
        <Link to="/console" style={{ color: '#dfe6e9', textDecoration: 'none' }}>Console</Link>
        <Link to="/breakpoints" style={{ color: '#dfe6e9', textDecoration: 'none' }}>Breakpoints</Link>
        <Link to="/network" style={{ color: '#dfe6e9', textDecoration: 'none' }}>Network</Link>
        <Link to="/a11y-before" style={{ color: '#dfe6e9', textDecoration: 'none' }}>A11y Before</Link>
        <Link to="/a11y-after" style={{ color: '#dfe6e9', textDecoration: 'none' }}>A11y After</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/console" element={<ConsoleLevels />} />
        <Route path="/breakpoints" element={<BreakpointMastery />} />
        <Route path="/network" element={<NetworkSecrets />} />
        <Route path="/a11y-before" element={<A11yBefore />} />
        <Route path="/a11y-after" element={<A11yAfter />} />
      </Routes>
    </Router>
  )
}

export default App
