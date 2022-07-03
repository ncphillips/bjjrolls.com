import { useUser } from "@auth0/nextjs-auth0"
import Head from "next/head"
import styled from "styled-components"
import css from "@styled-system/css"

const PAGE_PADDING = 3

type DefaultLayoutProps = {
  title?: string
  children: React.ReactNode
}

export const DefaultLayout = ({ title, children }: DefaultLayoutProps) => {
  const { user } = useUser()
  if (title) {
    title = `${title} | `
  }
  return (
    <>
      <Head>
        <title>{title}BJJ Rolls</title>
        <meta name="description" content="BJJ Rolls" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav>
        <NavSection>BJJ Rolls</NavSection>
        <NavSection>
          {user ? (
            <>
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/api/auth/logout">Logout</a>
              {"|"}
              <div>
                <strong>{user.nickname || user.name || user.email}</strong>
              </div>
            </>
          ) : (
            // eslint-disable-next-line @next/next/no-html-link-for-pages
            <a href="/api/auth/login">Login</a>
          )}
        </NavSection>
      </Nav>
      <Main>{children}</Main>
    </>
  )
}

const Main = styled.main`
  ${css({ paddingX: PAGE_PADDING })}
`

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${css({
    padding: PAGE_PADDING,
    borderBottom: "1px solid",
    borderBottomColor: "gray.border",
  })}
`

const NavSection = styled.div`
  display: flex;
  gap: 8px;
`
