import Sidebar from "../components/Sidebar"

import { motion } from "framer-motion"

import {
  Brain,
  Activity,
  ShieldCheck,
  ServerCrash
} from "lucide-react"

import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

function Dashboard() {

  const navigate = useNavigate()

  const [servers, setServers] = useState([])

  const [activities, setActivities] = useState([])

  useEffect(() => {

    const fetchData = () => {

      fetch("http://127.0.0.1:5000/servers")

        .then((res) => res.json())

        .then((data) => {

          setServers(data)
        })

      fetch("http://127.0.0.1:5000/activities")

        .then((res) => res.json())

        .then((data) => {

          setActivities(data)
        })
    }

    fetchData()

    const interval = setInterval(() => {

      fetchData()

    }, 3000)

    return () => clearInterval(interval)

  }, [])

  const handleSearch = (e) => {

    const value = e.target.value.toLowerCase()

    const serversKeywords = [
      "server",
      "servers",
      "valorant",
      "fortnite",
      "cs2",
      "mumbai",
      "players",
      "deployment",
      "deploy",
      "ram",
      "cpu",
      "infrastructure",
      "cluster",
      "pubg",
      "cod",
      "call of duty",
      "battle royale",
      "warzone",
      "ping"
    ]

    const analyticsKeywords = [
      "analytics",
      "traffic",
      "aws",
      "performance",
      "stats",
      "monitoring",
      "usage",
      "graphs",
      "charts",
      "data"
    ]

    const aiKeywords = [
      "ai",
      "optimization",
      "latency",
      "machine learning",
      "prediction",
      "recommendation",
      "automation",
      "scaling"
    ]

    if (
      serversKeywords.some((keyword) =>
        value.includes(keyword)
      )
    ) {

      navigate("/servers")
    }

    else if (
      analyticsKeywords.some((keyword) =>
        value.includes(keyword)
      )
    ) {

      navigate("/analytics")
    }

    else if (
      aiKeywords.some((keyword) =>
        value.includes(keyword)
      )
    ) {

      navigate("/ai-insights")
    }
  }

  const totalServers = servers.length

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

  const health = averageCPU > 80

    ? "74%"

    : averageCPU > 60

    ? "86%"

    : "98%"

  const cards = [
    {
      title: "Active Servers",
      value: totalServers
    },
    {
      title: "Live Players",
      value: totalPlayers
    },
    {
      title: "Infrastructure Health",
      value: health
    },
    {
      title: "Average CPU",
      value: `${averageCPU}%`
    }
  ]

  return (

    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* Top Navbar */}
        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-4xl font-semibold tracking-tight">
              Dashboard
            </h2>

            <p className="text-gray-500 mt-2">
              Intelligent gaming infrastructure command center
            </p>

          </div>

          <div className="flex items-center gap-4">

            <input
              type="text"
              placeholder="Search infrastructure..."
              onKeyDown={(e) => {

                if (e.key === "Enter") {

                  handleSearch(e)
                }
              }}
              className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3 outline-none text-sm w-64 focus:border-white/20"
            />

            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-2 rounded-xl">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-sm font-medium">
                Systems Operational
              </span>

            </div>

            <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center font-semibold">
              A
            </div>

          </div>

        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

          {cards.map((card, index) => (

            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-[#111111] border border-white/10 rounded-2xl p-6"
            >

              <p className="text-gray-500 mb-3">
                {card.title}
              </p>

              <h3 className="text-5xl font-semibold">
                {card.value}
              </h3>

            </motion.div>

          ))}

        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* Infrastructure */}
          <div className="xl:col-span-2 bg-[#111111] border border-white/10 rounded-2xl p-6">

            <div className="flex items-center justify-between mb-8">

              <div>

                <h3 className="text-2xl font-semibold">
                  Infrastructure Overview
                </h3>

                <p className="text-gray-500 mt-1">
                  Real-time AI managed infrastructure status
                </p>

              </div>

              <Activity className="text-green-400" />

            </div>

            <div className="space-y-6">

              <div>

                <div className="flex items-center justify-between mb-2">

                  <span className="text-gray-400">
                    Valorant Mumbai Cluster
                  </span>

                  <span>
                    72%
                  </span>

                </div>

                <div className="w-full bg-white/10 rounded-full h-3">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "72%" }}
                    transition={{ duration: 1 }}
                    className="bg-green-400 h-3 rounded-full"
                  ></motion.div>

                </div>

              </div>

              <div>

                <div className="flex items-center justify-between mb-2">

                  <span className="text-gray-400">
                    Fortnite Singapore Cluster
                  </span>

                  <span>
                    54%
                  </span>

                </div>

                <div className="w-full bg-white/10 rounded-full h-3">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "54%" }}
                    transition={{ duration: 1.2 }}
                    className="bg-blue-400 h-3 rounded-full"
                  ></motion.div>

                </div>

              </div>

              <div>

                <div className="flex items-center justify-between mb-2">

                  <span className="text-gray-400">
                    CS2 Frankfurt Cluster
                  </span>

                  <span>
                    91%
                  </span>

                </div>

                <div className="w-full bg-white/10 rounded-full h-3">

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "91%" }}
                    transition={{ duration: 1.5 }}
                    className="bg-red-400 h-3 rounded-full"
                  ></motion.div>

                </div>

              </div>

            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">

              <div className="bg-black/40 border border-white/5 rounded-xl p-4">

                <ShieldCheck className="mb-3 text-green-400" />

                <p className="text-gray-500 text-sm">
                  Security Status
                </p>

                <h4 className="text-xl font-semibold mt-1">
                  Protected
                </h4>

              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-4">

                <Brain className="mb-3 text-blue-400" />

                <p className="text-gray-500 text-sm">
                  AI Optimizations
                </p>

                <h4 className="text-xl font-semibold mt-1">
                  128
                </h4>

              </div>

              <div className="bg-black/40 border border-white/5 rounded-xl p-4">

                <ServerCrash className="mb-3 text-red-400" />

                <p className="text-gray-500 text-sm">
                  Critical Alerts
                </p>

                <h4 className="text-xl font-semibold mt-1">
                  2
                </h4>

              </div>

            </div>

          </div>

          {/* AI Insights */}
          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <div className="flex items-center gap-3 mb-6">

              <Brain />

              <h3 className="text-2xl font-semibold">
                AI Recommendations
              </h3>

            </div>

            <div className="space-y-4">

              <div className="border border-green-500/20 bg-green-500/5 rounded-xl p-4">

                <p className="font-medium mb-2 text-green-400">
                  Optimization Recommended
                </p>

                <p className="text-gray-400 text-sm">
                  Reduce inactive Singapore instances to improve AWS efficiency.
                </p>

              </div>

              <div className="border border-yellow-500/20 bg-yellow-500/5 rounded-xl p-4">

                <p className="font-medium mb-2 text-yellow-400">
                  High Load Detected
                </p>

                <p className="text-gray-400 text-sm">
                  CS2 Frankfurt nearing infrastructure threshold.
                </p>

              </div>

              <div className="border border-blue-500/20 bg-blue-500/5 rounded-xl p-4">

                <p className="font-medium mb-2 text-blue-400">
                  Latency Stable
                </p>

                <p className="text-gray-400 text-sm">
                  AI routing system stabilized Mumbai region latency.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Live Activity Feed */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 mt-6">

          <div className="flex items-center justify-between mb-6">

            <h3 className="text-2xl font-semibold">
              Live Infrastructure Activity
            </h3>

            <div className="flex items-center gap-2 text-green-400">

              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>

              <span className="text-sm">
                Live
              </span>

            </div>

          </div>

          <div className="space-y-5">

            {activities.map((activity, index) => (

              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center justify-between border-b border-white/5 pb-4"
              >

                <div>

                  <p className="font-medium">
                    {activity.title}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    {activity.desc}
                  </p>

                </div>

                <span className="text-gray-500 text-sm whitespace-nowrap">
                  {activity.time}
                </span>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </div>

  )
}

export default Dashboard