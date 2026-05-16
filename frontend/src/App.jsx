import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Dashboard from "./pages/Dashboard"
import Servers from "./pages/Servers"
import Analytics from "./pages/Analytics"
import AIInsights from "./pages/AIInsights"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Dashboard />}
        />

        <Route
          path="/servers"
          element={<Servers />}
        />

        <Route
          path="/analytics"
          element={<Analytics />}
        />

        <Route
          path="/ai-insights"
          element={<AIInsights />}
        />

      </Routes>

    </BrowserRouter>

  )
}

export default App