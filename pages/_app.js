import "@/styles/globals.css";
import { Montserrat } from 'next/font/google';
import '../styles/globals.css';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export default function App({ Component, pageProps }) {
  return (
    <content className={montserrat.className}>
      <Component {...pageProps} />
    </content>
  )
  // return <Component {...pageProps} />;
}
