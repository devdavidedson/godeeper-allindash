import { useEffect, useState } from 'react';
import { supabase } from '../supabase';

export default function HomePage() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    async function fetchUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email ?? '');
    }
    fetchUser();
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <h1 className="text-3xl font-bold text-primary">
        Bem-vindo{userEmail ? `, ${userEmail}` : ''}!
      </h1>
    </div>
  );
}
