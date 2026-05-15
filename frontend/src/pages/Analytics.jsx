import Sidebar from "../components/Sidebar"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid
} from "recharts"

const data = [
  { day: "Mon", players: 120, ping: 24 },
  { day: "Tue", players: 210, ping: 22 },
  { day: "Wed", players: 180, ping: 26 },
  { day: "Thu", players: 260, ping: 21 },
  { day: "Fri", players: 320, ping: 20 },
  { day: "Sat", players: 410, ping: 19 },
  { day: "Sun", players: 390, ping: 23 }
]

function Analytics() {

  return (

    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-4xl font-semibold mb-2">
          Analytics
        </h1>

        <p className="text-gray-500 mb-10">
          Real-time gaming infrastructure analytics
        </p>

        {/* Top Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <p className="text-gray-500 mb-3">
              Peak Players
            </p>

            <h2 className="text-5xl font-semibold">
              410
            </h2>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <p className="text-gray-500 mb-3">
              Avg Ping
            </p>

            <h2 className="text-5xl font-semibold">
              21ms
            </h2>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <p className="text-gray-500 mb-3">
              Server Stability
            </p>

            <h2 className="text-5xl font-semibold">
              98%
            </h2>

          </div>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-2 gap-6">

          {/* Players Chart */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <h3 className="text-2xl font-semibold mb-6">
              Weekly Active Players
            </h3>

            <ResponsiveContainer width="100%" height={300}>

              <LineChart data={data}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#222"
                />

                <XAxis
                  dataKey="day"
                  stroke="#666"
                />

                <YAxis
                  stroke="#666"
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111111",
                    border: "1px solid #333",
                    borderRadius: "12px",
                    color: "white"
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="players"
                  stroke="#9ca3af"
                  strokeWidth={3}
                  dot={{
                    fill: "#ffffff",
                    r: 5
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* Ping Chart */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <h3 className="text-2xl font-semibold mb-6">
              Server Ping Analytics
            </h3>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={data}>

                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#222"
                />

                <XAxis
                  dataKey="day"
                  stroke="#666"
                />

                <YAxis
                  stroke="#666"
                />

                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111111",
                    border: "1px solid #333",
                    borderRadius: "12px",
                    color: "white"
                  }}
                />

                <Bar
                  dataKey="ping"
                  fill="#d4d4d8"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Analytics