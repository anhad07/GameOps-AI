import Sidebar from "../components/Sidebar"

import {
  useEffect,
  useState
} from "react"

function AIInsights() {

  const [insights, setInsights] = useState([])

  useEffect(() => {

    fetch("http://127.0.0.1:5000/ai-insights")

      .then((res) => res.json())

      .then((data) => {

        setInsights(data)

      })

  }, [])

  return (

    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* Header */}
        <div className="mb-10">

          <h1 className="text-4xl font-semibold mb-2">
            AI Infrastructure Insights
          </h1>

          <p className="text-gray-500">
            Intelligent cloud optimization and infrastructure analysis
          </p>

        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <p className="text-gray-500 mb-3">
              Infrastructure Stability
            </p>

            <h2 className="text-5xl font-semibold">
              92%
            </h2>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <p className="text-gray-500 mb-3">
              Optimization Score
            </p>

            <h2 className="text-5xl font-semibold">
              84%
            </h2>

          </div>

          <div className="bg-[#111111] border border-white/10 rounded-2xl p-6">

            <p className="text-gray-500 mb-3">
              Deployment Risk
            </p>

            <h2 className="text-5xl font-semibold">
              LOW
            </h2>

          </div>

        </div>

        {/* AI Cards */}
        <div className="space-y-6">

          {insights.map((item, index) => (

            <div
              key={index}
              className="bg-[#111111] border border-white/10 rounded-2xl p-6"
            >

              <div className="flex items-center justify-between mb-4">

                <h2 className="text-2xl font-semibold">
                  {item.title}
                </h2>

                <div className={`px-3 py-1 rounded-full text-sm ${
                  item.status === "Critical"

                    ? "bg-red-500/20 text-red-400"

                    : item.status === "Recommended"

                    ? "bg-yellow-500/20 text-yellow-400"

                    : "bg-green-500/20 text-green-400"
                }`}>

                  {item.status}

                </div>

              </div>

              <p className="text-gray-400 leading-7">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}

export default AIInsights