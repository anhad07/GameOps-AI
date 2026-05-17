import Sidebar from "../components/Sidebar"

import {
  Brain,
  AlertTriangle,
  ShieldCheck,
  Activity,
  Cpu,
  ServerCrash
} from "lucide-react"

import {
  useEffect,
  useState
} from "react"

function AIInsights() {

  const [servers, setServers] = useState([])

  useEffect(() => {

    const fetchServers = () => {

      fetch("http://13.60.85.120/servers")

        .then((res) => res.json())

        .then((data) => {

          setServers(data || [])

        })

        .catch((error) => {

          console.log(error)

        })
    }

    fetchServers()

    const interval = setInterval(() => {

      fetchServers()

    }, 3000)

    return () => clearInterval(interval)

  }, [])

  const highCPU = servers.filter(

    (server) =>
      Number(server.cpu?.replace("%", "")) > 80
  )

  const mediumCPU = servers.filter(

    (server) => {

      const cpu = Number(server.cpu?.replace("%", ""))

      return cpu > 50 && cpu <= 80
    }
  )

  const overloadedServers = highCPU.length

  const stableServers = servers.length - overloadedServers

  return (

    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-4xl font-semibold mb-2 flex items-center gap-3">

            <Brain className="text-green-400" />

            AI Infrastructure Insights

          </h1>

          <p className="text-gray-500">
            Real-time AI-powered infrastructure intelligence
          </p>

        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-4">

              <Cpu className="text-red-400" />

              <span className="text-red-400 text-sm">
                Critical
              </span>

            </div>

            <p className="text-gray-500 mb-2">
              High CPU Servers
            </p>

            <h2 className="text-5xl font-semibold">
              {overloadedServers}
            </h2>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-4">

              <ShieldCheck className="text-green-400" />

              <span className="text-green-400 text-sm">
                Stable
              </span>

            </div>

            <p className="text-gray-500 mb-2">
              Stable Servers
            </p>

            <h2 className="text-5xl font-semibold">
              {stableServers}
            </h2>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-4">

              <Activity className="text-blue-400" />

              <span className="text-blue-400 text-sm">
                Monitoring
              </span>

            </div>

            <p className="text-gray-500 mb-2">
              Medium Load
            </p>

            <h2 className="text-5xl font-semibold">
              {mediumCPU.length}
            </h2>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-4">

              <Brain className="text-purple-400" />

              <span className="text-purple-400 text-sm">
                AI Active
              </span>

            </div>

            <p className="text-gray-500 mb-2">
              AI Recommendations
            </p>

            <h2 className="text-5xl font-semibold">
              {servers.length}
            </h2>

          </div>

        </div>

        {/* AI Recommendations */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 mb-6">

          <div className="flex items-center gap-3 mb-6">

            <Brain className="text-green-400" />

            <h2 className="text-2xl font-semibold">
              Live AI Recommendations
            </h2>

          </div>

          <div className="space-y-4">

            {highCPU.map((server, index) => (

              <div
                key={index}
                className="border border-red-500/20 bg-red-500/5 rounded-xl p-5"
              >

                <div className="flex items-center gap-3 mb-2">

                  <AlertTriangle className="text-red-400" />

                  <p className="font-semibold text-red-400">
                    Critical Load Detected
                  </p>

                </div>

                <p className="text-gray-300">

                  {server.name} in {server.region} is experiencing extremely high CPU usage ({server.cpu}).

                </p>

                <p className="text-gray-500 text-sm mt-2">

                  AI Recommendation:
                  Scale infrastructure immediately and enable auto balancing.

                </p>

              </div>

            ))}

            {mediumCPU.map((server, index) => (

              <div
                key={index}
                className="border border-yellow-500/20 bg-yellow-500/5 rounded-xl p-5"
              >

                <div className="flex items-center gap-3 mb-2">

                  <Activity className="text-yellow-400" />

                  <p className="font-semibold text-yellow-400">
                    Elevated Resource Usage
                  </p>

                </div>

                <p className="text-gray-300">

                  {server.name} currently operating at moderate load ({server.cpu} CPU).

                </p>

                <p className="text-gray-500 text-sm mt-2">

                  AI Recommendation:
                  Monitor player traffic and prepare backup scaling nodes.

                </p>

              </div>

            ))}

            {servers.length === 0 && (

              <div className="border border-white/10 rounded-xl p-6 text-center">

                <ServerCrash className="mx-auto mb-4 text-gray-500" size={40} />

                <p className="text-gray-400">
                  No infrastructure data available.
                </p>

              </div>

            )}

          </div>

        </div>

        {/* AI System Status */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <p className="text-gray-500 mb-3">
              AI Threat Detection
            </p>

            <h2 className="text-4xl font-semibold text-green-400">
              Active
            </h2>

            <p className="text-gray-500 mt-3 text-sm">
              Monitoring infrastructure anomalies in real-time.
            </p>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <p className="text-gray-500 mb-3">
              Auto Optimization
            </p>

            <h2 className="text-4xl font-semibold text-blue-400">
              Enabled
            </h2>

            <p className="text-gray-500 mt-3 text-sm">
              AI continuously optimizing server distribution.
            </p>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <p className="text-gray-500 mb-3">
              AI Infrastructure Health
            </p>

            <h2 className="text-4xl font-semibold text-purple-400">
              Stable
            </h2>

            <p className="text-gray-500 mt-3 text-sm">
              All AI systems operating within optimal range.
            </p>

          </div>

        </div>

      </div>

    </div>

  )
}

export default AIInsights