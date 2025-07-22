import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import AuthPage from './pages/AuthPage';
import ChatInterface from './components/ChatInterface';

// Layout com Sidebar fixo
function AppLayout() {
  return (
    <div className="flex h-screen w-screen bg-cosmic text-text-primary">
      <Sidebar />
      <main className="flex-1 overflow-hidden bg-gray-900">
        <Outlet />
      </main>
    </div>
  );
}

// Páginas placeholder
function Placeholder({ title }) {
  return (
    <div className="flex items-center justify-center h-full w-full text-2xl font-semibold">
      {title}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/auth" replace />} />
          <Route path="home" element={<Placeholder title="Home" />} />
          <Route path="dashboard" element={<Placeholder title="Dashboard" />} />
          <Route path="conversas" element={<ChatInterface />} />
          <Route path="configuracoes" element={<Placeholder title="Configurações" />} />
          <Route path="relatorios" element={<Placeholder title="Relatórios" />} />
          <Route path="financeiro" element={<Placeholder title="Financeiro" />} />
        </Route>
                <Route path="auth" element={<AuthPage />} />
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
