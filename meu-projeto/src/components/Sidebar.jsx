import { useState } from 'react';
import logo from '../assets/image/4.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';

const menuItems = [
  { id: 'home', label: 'Home', icon: HomeIcon, path: '/home' },
  { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { id: 'conversas', label: 'Conversas', icon: ChatIcon, path: '/conversas' },
  { id: 'configuracoes', label: 'Configurações', icon: SettingsIcon, path: '/configuracoes' },
  { id: 'relatorios', label: 'Relatórios', icon: ReportsIcon, path: '/relatorios' },
  { id: 'financeiro', label: 'Financeiro', icon: DollarIcon, path: '/financeiro' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const toggle = () => setCollapsed((c) => !c);

  return (
    <aside
      className={`h-screen bg-cosmic text-text-primary flex flex-col transition-all duration-300 shadow-lg ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Toggle */}
      <button
        onClick={toggle}
        className="p-4 text-text-secondary hover:text-white focus:outline-none bg-transparent"
      >
        <MenuIcon className="w-[14px] h-[14px]" />
      </button>

      {/* Logo */}
      {!collapsed && (
        <div className="flex flex-col items-center px-4 mb-4">
          <img src={logo} alt="logo" className="w-10 h-10 mb-2" />
        </div>
      )}

      {/* Menu */}
      <nav className="flex-1 px-2 space-y-2 overflow-y-auto">
        {menuItems.map(({ id, label, icon: Icon, path }) => {
          const active = location.pathname.startsWith(path);
          return (
            <Link
              key={id}
              to={path}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-surface ${
                active ? 'bg-secondary text-white' : 'text-text-secondary'
              }`}
            >
              <Icon className="w-6 h-6" />
              {!collapsed && <span>{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="px-2 mb-4">
        <button onClick={handleLogout} className="flex items-center w-full gap-3 rounded-lg px-3 py-3 text-sm text-text-secondary bg-transparent hover:bg-surface focus:outline-none">
          <LogoutIcon className="w-6 h-6" />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </aside>
  );
}

/* Icons as inline SVG components */
function MenuIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 9l9-7 9 7" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}
function DashboardIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
function ChatIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.5 8.5 0 018 8z" />
    </svg>
  );
}
function SettingsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2h-.2a2 2 0 01-2-2v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2v-.2a2 2 0 012-2h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2h.2a2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2v.2a2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}
function ReportsIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="3" y1="3" x2="21" y2="21" />
      <path d="M19 19H5V5" />
    </svg>
  );
}
function DollarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
    </svg>
  );
}
function LogoutIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}
