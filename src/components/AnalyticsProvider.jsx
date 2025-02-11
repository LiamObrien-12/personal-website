import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export function AnalyticsProvider() {
  return (
    <>
      <Analytics 
        mode="production" // 'production' or 'development'
        debug={false} // Enable debug mode
        beforeSend={(event) => {
          // Filter out sensitive data
          if (event.url) {
            const url = new URL(event.url);
            // Remove sensitive query parameters
            url.searchParams.delete('token');
            url.searchParams.delete('key');
            // Remove any chat history or personal data
            url.searchParams.delete('chat');
            url.searchParams.delete('email');
            event.url = url.toString();
          }
          return event;
        }}
      />
      <SpeedInsights />
    </>
  );
} 