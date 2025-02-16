// _app.js or a similar file
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { supabase } from '../contexts/Authcontext';

function MyApp({ Component, pageProps }) {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default MyApp;