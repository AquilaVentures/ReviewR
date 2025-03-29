import "./globals.css"
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import localFont from 'next/font/local';
import "../../node_modules/animate.css";
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const myFont = localFont({ src: '../../public/manrope.ttf' });
 const metadata = {
  title: 'ReviewR',
  description: 'A Pipeline Compant',
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
