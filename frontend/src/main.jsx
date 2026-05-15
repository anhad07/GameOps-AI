import React from "react"
import ReactDOM from "react-dom/client"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import "./index.css"

import App from "./App"
import Servers from "./pages/Servers"
import Analytics from "./pages/Analytics"
import AIInsights from "./pages/AIInsights"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<App />} />

        <Route path="/servers" element={<Servers />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/ai-insights" element={<AIInsights />} />

      </Routes>

    </BrowserRouter>

  </React.StrictMode>
)