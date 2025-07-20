import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./responsive.css";

import ThemeProvider from "@/context/ThemeProvider";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer/index";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1124428913034286');
              fbq('track', 'PageView');
            `
          }}
        /> */}
        {/* <link
          rel="preload"
          href="https://www.facebook.com/tr?id=1124428913034286&ev=PageView&noscript=1"
          as="image"
        /> */}
      </head>
      <body>
        {/* <noscript>
          <img height="1" width="1" style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1124428913034286&ev=PageView&noscript=1"
          />
        </noscript> */}
        <ThemeProvider>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
