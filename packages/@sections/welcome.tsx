export const WelcomeSection = () => {
  return (
    <>
      <p>Sign in to view videos.</p>
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/api/auth/login">Sign in </a>
    </>
  )
}
