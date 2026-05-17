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
  CartesianGrid,
  PieChart,
  Pie,
  Cell
} from "recharts"

import {
  useEffect,
  useState
} from "react"

function Analytics() {

  const [servers, setServers] = useState([])

  useEffect(() => {

    const fetchServers = () => {

      fetch("http://
http://13.60.85.120:5000/servers")

        .then((res) => res.json())

        .then((data) => {

          setServers(data)
        })
    }

    fetchServers()

    const interval = setInterval(() => {

      fetchServers()

    }, 3000)

    return () => clearInterval(interval)

  }, [])

  const playerData = servers.length

    ? servers.map((server) => ({

        day: server.name,

        players: Number(server.maxPlayers || 0)
      }))

    : [

        {

          day: "Empty",

          players: 0
        }
      ]

  const cpuData = servers.length

    ? servers.map((server) => ({

        day: server.name,

        ping: Number(server.cpu?.replace("%", "")) || 0
      }))

    : [

        {

          day: "Empty",

          ping: 0
        }
      ]

  const regionCounts = {}

  servers.forEach((server) => {

    regionCounts[server.region] =

      (regionCounts[server.region] || 0) + 1
  })

  const regionData = Object.keys(regionCounts).length

    ? Object.keys(regionCounts).map((region) => ({

        name: region,

        value: regionCounts[region]
      }))

    : [

        {

          name: "No Data",

          value: 1
        }
      ]

  const COLORS = [
    "#22c55e",
    "#3b82f6",
    "#facc15",
    "#ef4444",
    "#a855f7"
  ]

  const totalPlayers = servers.reduce(

    (acc, server) => acc + Number(server.maxPlayers || 0),

    0
  )

  const averageCPU = servers.length

    ? Math.floor(

        servers.reduce(

          (acc, server) =>
            acc + Number(server.cpu?.replace("%", "") || 0),

          0
        ) / servers.length
      )

    : 0

  const stability = averageCPU > 80

    ? "74%"

    : averageCPU > 60

    ? "86%"

    : "98%"

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <p className="text-gray-500 mb-3">
              Total Players
            </p>

            <h2 className="text-5xl font-semibold">
              {totalPlayers}
            </h2>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <p className="text-gray-500 mb-3">
              Avg CPU Usage
            </p>

            <h2 className="text-5xl font-semibold">
              {averageCPU}%
            </h2>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <p className="text-gray-500 mb-3">
              Server Stability
            </p>

            <h2 className="text-5xl font-semibold">
              {stability}
            </h2>

          </div>

        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

          {/* Players Chart */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <h3 className="text-2xl font-semibold mb-6">
              Live Player Capacity
            </h3>

            <ResponsiveContainer width="100%" height={300}>

              <LineChart data={playerData}>

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

          {/* CPU Chart */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <h3 className="text-2xl font-semibold mb-6">
              CPU Usage Analytics
            </h3>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={cpuData}>

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

        {/* Region Distribution */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 mt-6">

          <h3 className="text-2xl font-semibold mb-6">
            Region Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={regionData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
                label
              >

                {regionData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  )
}

export default Analytics