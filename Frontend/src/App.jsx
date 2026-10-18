
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import CandidateProfilePage from '../src/features/candidate/pages/CandidateProfilePage'
import Login from '../src/features/public/auth/pages/Login'

import { ROUTES } from '../src/routes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default page
        <Route
          path={ROUTES.home}
          element={<Navigate to={ROUTES.login} replace />}
        /> */}

        {/* Authentication */}
        <Route
          path={ROUTES.login}
          element={<Login />}
        />

        {/* Candidate profile */}
        <Route
          path={ROUTES.candidateProfile}
          element={<CandidateProfilePage />}
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={<Navigate to={ROUTES.login} replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
