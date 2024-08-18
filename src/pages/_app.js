import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/globals.css';
import { APP_NAME } from '../utils/constants';

/**
 * MyApp is the custom App component for the Next.js application.
 * It is used to initialize pages and includes global CSS and context providers.
 * The component wraps all other components, providing them with common functionality and layout elements like the Navbar.
 * It also integrates the SessionProvider for managing authentication sessions.
 * Here you can define a Header and a Footer
 *
 * @param {object} Component - The active page component to render.
 * @param {object} pageProps - The initial props preloaded for the page component, including the session data.
 */
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
      return (
            <SessionProvider session={session}>
                  <Head>
                        <title>{APP_NAME}</title>
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                        <link rel="icon" href="/logo.png" />
                  </Head>
                  <Navbar/>
                  <div className='min-h-80vh'><Component {...pageProps} /></div>
                  
                  <Footer/>
            </SessionProvider>
      );
}

export default MyApp;
