import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../supabase';
import logo from '../assets/image/4.png';

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  const isLogin = mode === 'login';
  const [password, setPassword] = useState('');
  const showCreateAccount = password === 'agenciagodeeperadm';
  // States for create-account form
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [loginEmail, setLoginEmail] = useState('');

  async function handleCreateAccount() {
    if (!regName || !regEmail || !regPass || !regConfirm) {
      toast.warn('Preencha todos os campos');
      return;
    }
    if (regPass !== regConfirm) {
      toast.warn('As senhas não coincidem');
      return;
    }

    // Cria usuário de autenticação
    const {
      data: { user },
      error: signUpError,
    } = await supabase.auth.signUp({ email: regEmail, password: regPass });

    if (signUpError) {
      toast.error(signUpError.message);
      return;
    }

    if (!user) {
      toast.error('Erro ao obter usuário recém-criado.');
      return;
    }

    // Insere na tabela attendants
    const { error: insertError } = await supabase.from('attendants').insert({
      name: regName,
      email: regEmail,
      id_users: user.id,
    });

    if (insertError) {
      toast.error(insertError.message);
      return;
    }

    toast.success('Conta criada com sucesso!');
    navigate('/home');
  }

  async function handleLogin(e) {
    e.preventDefault();
    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Login efetuado com Sucesso');
    navigate('/home');
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-cosmic overflow-hidden text-text-primary">
      {/* diagonal light effect */}
      <div className="pointer-events-none absolute -right-1/2 top-0 h-[150%] w-[150%] rotate-45 bg-gradient-to-br from-transparent via-surface to-accent/30" />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src={logo} alt="logo" className="h-40" />
        </div>


        <form onSubmit={handleLogin} className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Nome completo"
              className="w-full rounded-md border border-surface bg-surface px-4 py-3 text-sm placeholder-text-secondary focus:border-primary focus:outline-none"
            />
          )}
          <input
            type="email"
            placeholder="E-mail"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full rounded-md border border-surface bg-surface px-4 py-3 text-sm placeholder-text-secondary focus:border-primary focus:outline-none"
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-surface bg-surface px-4 py-3 text-sm placeholder-text-secondary focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-primary py-3 text-center text-base font-semibold text-cosmic shadow-md transition active:scale-[0.99]"
          >
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        {showCreateAccount && (
          <div className="mt-6 space-y-4 rounded-md bg-surface p-6 shadow-md">
            <input
              type="text"
              placeholder="Nome completo"
              value={regName}
              onChange={(e) => setRegName(e.target.value)}
              className="w-full rounded-md border border-surface bg-cosmic/20 px-4 py-3 text-sm placeholder-text-secondary focus:border-primary focus:outline-none"
            />
            <input
              type="email"
              placeholder="E-mail"
              value={regEmail}
              onChange={(e) => setRegEmail(e.target.value)}
              className="w-full rounded-md border border-surface bg-cosmic/20 px-4 py-3 text-sm placeholder-text-secondary focus:border-primary focus:outline-none"
            />
            <input
              type="password"
              placeholder="Senha"
              value={regPass}
              onChange={(e) => setRegPass(e.target.value)}
              className="w-full rounded-md border border-surface bg-cosmic/20 px-4 py-3 text-sm placeholder-text-secondary focus:border-primary focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirmar senha"
              value={regConfirm}
              onChange={(e) => setRegConfirm(e.target.value)}
              className="w-full rounded-md border border-surface bg-cosmic/20 px-4 py-3 text-sm placeholder-text-secondary focus:border-primary focus:outline-none"
            />
            <button
              type="button"
              onClick={handleCreateAccount}
              className="w-full rounded-md bg-primary py-3 text-center text-base font-semibold text-cosmic shadow-md transition active:scale-[0.99]"
            >
              Criar Conta
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
