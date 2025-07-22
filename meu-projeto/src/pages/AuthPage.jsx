import { useState } from 'react';
import logo from '../assets/image/4.png';

export default function AuthPage() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  const isLogin = mode === 'login';

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-cosmic overflow-hidden text-text-primary">
      {/* diagonal light effect */}
      <div className="pointer-events-none absolute -right-1/2 top-0 h-[150%] w-[150%] rotate-45 bg-gradient-to-br from-transparent via-surface to-accent/30" />

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img src={logo} alt="logo" className="h-20" />
        </div>

        {/* Tabs */}
        <div className="mb-8 flex overflow-hidden rounded-md">
          <button
            onClick={() => setMode('login')}
            className={`flex-1 rounded-md px-4 py-2 text-center text-sm font-medium transition-colors ${
              isLogin ? 'bg-primary text-cosmic' : 'text-text-primary hover:bg-surface/40'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setMode('register')}
            className={`flex-1 rounded-md px-4 py-2 text-center text-sm font-medium transition-colors ${
              !isLogin ? 'bg-primary text-cosmic' : 'text-text-primary hover:bg-surface/40'
            }`}
          >
            Cadastro
          </button>
        </div>

        <form className="space-y-4">
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
            className="w-full rounded-md border border-surface bg-surface px-4 py-3 text-sm placeholder-text-secondary focus:border-primary focus:outline-none"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full rounded-md border border-surface bg-surface px-4 py-3 text-sm placeholder-text-secondary focus:border-primary focus:outline-none"
          />
          <button
            type="submit"
            className="w-full rounded-md bg-primary py-3 text-center text-base font-semibold text-cosmic shadow-md transition active:scale-[0.99]"
          >
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-text-secondary">
          {isLogin ? (
            <>
              Não possui conta?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-medium text-primary hover:underline"
              >
                Crie uma
              </button>
            </>
          ) : (
            <>
              Já possui conta?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-medium text-primary hover:underline"
              >
                Faça login
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
