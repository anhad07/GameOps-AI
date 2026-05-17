import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Servers from "./pages/Servers"
import Analytics from "./pages/Analytics"
import AIInsights from "./pages/AIInsights"

import Login from "./pages/Login"
import Signup from "./pages/Signup"

function ProtectedRoute({ children }) {

  const token = localStorage.getItem("token")

  return token

    ? children

    : <Navigate to="/login" />
}

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login / Signup */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* Protected Dashboard Routes */}

        <Route
          path="/"
          element={

            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/servers"
          element={

            <ProtectedRoute>

              <Servers />

            </ProtectedRoute>
          }
        />

        <Route
          path="/analytics"
          element={

            <ProtectedRoute>

              <Analytics />

            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-insights"
          element={

            <ProtectedRoute>

              <AIInsights />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App