import Script from "next/script"

const GA4_ID = process.env.NEXT_PUBLIC_GA4

export const GoogleAnalytics = () => {
  if (!GA4_ID) {
    return null
  }

  return (
    <>
      <Script
        id="ga"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`}
      />
      <Script
        id="ga-setup"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA4_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
    </>
  )
}
