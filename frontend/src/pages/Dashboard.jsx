import { motion } from "framer-motion"
import { Brain } from "lucide-react"

function Dashboard() {

  const cards = [
    {
      title: "Active Servers",
      value: "12"
    },
    {
      title: "Live Players",
      value: "248"
    },
    {
      title: "Average Ping",
      value: "24ms"
    }
  ]

  return (

    <div className="flex-1 p-8">

      {/* Top Navbar */}
      <div className="flex items-center justify-between mb-10">

        <div>

          <h2 className="text-4xl font-semibold tracking-tight">
            Dashboard
          </h2>

          <p className="text-gray-500 mt-2">
            Monitor and optimize gaming infrastructure
          </p>

        </div>

        <div className="flex items-center gap-4">

          <input
            type="text"
            placeholder="Search servers..."
            className="bg-[#111111] border border-white/10 rounded-xl px-4 py-3 outline-none text-sm w-64 focus:border-white/20"
          />

          <div className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center font-semibold">
            A
          </div>

        </div>

      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">

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

      {/* Bottom Grid */}
      <div className="grid grid-cols-2 gap-6">

        {/* Server Card */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h3 className="text-2xl font-semibold">
                Valorant Mumbai #1
              </h3>

              <p className="text-gray-500 mt-1">
                Asia Region
              </p>

            </div>

            <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm">
              Online
            </div>

          </div>

          <div className="space-y-4">

            <div>

              <div className="flex justify-between mb-2">

                <span className="text-gray-400">
                  CPU Usage
                </span>

                <span>
                  72%
                </span>

              </div>

              <div className="w-full bg-white/10 rounded-full h-2">

                <div className="bg-white h-2 rounded-full w-[72%]"></div>

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-2">

                <span className="text-gray-400">
                  RAM Usage
                </span>

                <span>
                  61%
                </span>

              </div>

              <div className="w-full bg-white/10 rounded-full h-2">

                <div className="bg-white h-2 rounded-full w-[61%]"></div>

              </div>

            </div>

            <div className="pt-4 flex gap-3">

              <button className="bg-white text-black px-4 py-2 rounded-xl text-sm font-medium hover:opacity-80 transition">
                Restart
              </button>

              <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm hover:bg-white/10 transition">
                Optimize
              </button>

            </div>

          </div>

        </div>

        {/* AI Insights */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

          <div className="flex items-center gap-3 mb-6">

            <Brain />

            <h3 className="text-2xl font-semibold">
              AI Infrastructure Insights
            </h3>

          </div>

          <div className="space-y-4">

            <div className="border border-white/10 rounded-xl p-4">

              <p className="font-medium mb-2">
                High Traffic Detected
              </p>

              <p className="text-gray-500 text-sm">
                Valorant Mumbai server is experiencing elevated player load.
              </p>

            </div>

            <div className="border border-white/10 rounded-xl p-4">

              <p className="font-medium mb-2">
                Optimization Recommended
              </p>

              <p className="text-gray-500 text-sm">
                Reduce inactive instances to optimize AWS cost.
              </p>

            </div>

            <div className="border border-white/10 rounded-xl p-4">

              <p className="font-medium mb-2">
                Latency Stable
              </p>

              <p className="text-gray-500 text-sm">
                Current average response latency remains within optimal range.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Live Activity */}
      <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 mt-6">

        <h3 className="text-2xl font-semibold mb-6">
          Live Infrastructure Activity
        </h3>

        <div className="space-y-5">

          <div className="flex items-center justify-between border-b border-white/5 pb-4">

            <div>

              <p className="font-medium">
                Jenkins deployment completed
              </p>

              <p className="text-gray-500 text-sm mt-1">
                Production server updated successfully
              </p>

            </div>

            <span className="text-gray-500 text-sm">
              2 min ago
            </span>

          </div>

          <div className="flex items-center justify-between border-b border-white/5 pb-4">

            <div>

              <p className="font-medium">
                AWS instance auto optimized
              </p>

              <p className="text-gray-500 text-sm mt-1">
                Resource balancing completed
              </p>

            </div>

            <span className="text-gray-500 text-sm">
              10 min ago
            </span>

          </div>

          <div className="flex items-center justify-between">

            <div>

              <p className="font-medium">
                High latency warning resolved
              </p>

              <p className="text-gray-500 text-sm mt-1">
                Mumbai region ping normalized
              </p>

            </div>

            <span className="text-gray-500 text-sm">
              22 min ago
            </span>

          </div>

        </div>

      </div>

    </div>

  )
}

export default Dashboard