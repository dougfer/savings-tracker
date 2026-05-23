import type { PropsWithChildren } from 'react';

import { ScrollViewStyleReset } from 'expo-router/html';

export default function Root({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="pt-BR">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

        <ScrollViewStyleReset />

        {/* Hide body until JS hydrates and fonts are ready; avoids FOUT */}
        <style
          dangerouslySetInnerHTML={{
            __html: `body{opacity:0}`,
          }}
        />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: `body{opacity:1}`,
            }}
          />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
