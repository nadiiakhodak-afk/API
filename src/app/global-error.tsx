'use client';

export default function GlobalError({
                                        error,
                                        reset,
                                    }: {
    error: Error;
    reset: () => void;
}) {
    return (
        <html>
        <body style={{fontFamily: 'system-ui, sans-serif', padding: 24}}>
        <h2>Something went wrong</h2>
        <pre style={{whiteSpace: 'pre-wrap'}}>{error?.message}</pre>
        <button onClick={() => reset()} style={{padding: '8px 12px', marginTop: 12}}>
            Try again
        </button>
        </body>
        </html>
    );
}