import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css';
import '@pickleballinc/react-ui/stylesheets/bundle.css';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line import/no-extraneous-dependencies
import { config } from '@fortawesome/fontawesome-svg-core';
import QueryProvider from '@lib/components/Wrappers/QueryProvider';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

config.autoAddCss = false;

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        <QueryProvider>
          <main className="box-border flex min-h-screen items-center justify-between p-6 sm:p-4">
            <ToastContainer theme="light" position="bottom-left" />
            {children}
          </main>
        </QueryProvider>
      </body>
    </html>
  );
}
