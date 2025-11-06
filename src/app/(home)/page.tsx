'use client';

import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    // relative redirect so basePath is preserved on GitHub Pages
    window.location.replace('./docs/');
  }, []);

  return (
    <div className="flex flex-1 items-center justify-center p-6 text-center">
      <p className="text-sm text-muted-foreground">
        Redirecting to documentation…
        <noscript>
          <meta httpEquiv="refresh" content="0; url=docs/" />
        </noscript>
      </p>
    </div>
  );
}
