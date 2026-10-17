import { lazy, Suspense } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { ROUTES } from './routes'

const routes = {
  [ROUTES.home]: lazy(() => import('./pages/Home-Page/HHS.jsx')),
  [ROUTES.aboutUs]: lazy(() => import('./pages/About-Us-Page/AboutUs.jsx')),
  [ROUTES.candidates]: lazy(() => import('./pages/Candidates/Candidates.jsx')),
  [ROUTES.companies]: lazy(() => import('./pages/Companies/Companies.jsx')),
  [ROUTES.ask]: lazy(() => import('./pages/Ask/Ask.jsx')),
  [ROUTES.login]: lazy(() => import('./pages/Login-Page/Login.jsx')),
}

function App() {
  return (
    <Suspense fallback={<main className="app-loading" aria-label="Loading page" />}>
      <Routes>
        {Object.entries(routes).map(([path, Component]) => (
          <Route key={path} path={path} element={<Component />} />
        ))}

        <Route
          path="*"
          element={
            <main className="not-found">
              <h1>Page not found</h1>
              <Link to={ROUTES.home}>Return home</Link>
            </main>
          }
        />
      </Routes>
    </Suspense>
  )
}

export default App
