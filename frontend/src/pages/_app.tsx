import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AnimatedLayout from '../components/layout/AnimatedLayout';
import { LazyMotion, domAnimation } from 'framer-motion';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Global event emitter for route changes
  useEffect(() => {
    const handleRouteChange = () => {
      // Create a custom event for route changes that components can listen to
      window.dispatchEvent(new Event('routeChangeComplete'));
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatedLayout>
        <Component {...pageProps} />
      </AnimatedLayout>
    </LazyMotion>
  );
}

export default MyApp;
