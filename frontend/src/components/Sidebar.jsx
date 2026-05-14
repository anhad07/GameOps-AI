import {
  LayoutDashboard,
  Server,
  BarChart3,
  Brain
} from "lucide-react"

function Sidebar() {

  return (

    <div className="w-64 border-r border-white/10 bg-[#0A0A0A] p-6">

      <h1 className="text-2xl font-semibold tracking-tight mb-10">
        GameOps AI
      </h1>

      <div className="space-y-2">

        <div className="bg-white text-black p-3 rounded-xl font-medium flex items-center gap-3">
          <LayoutDashboard size={18} />
          Dashboard
        </div>

        <div className="p-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition cursor-pointer flex items-center gap-3">
          <Server size={18} />
          Servers
        </div>

        <div className="p-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition cursor-pointer flex items-center gap-3">
          <BarChart3 size={18} />
          Analytics
        </div>

        <div className="p-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition cursor-pointer flex items-center gap-3">
          <Brain size={18} />
          AI Insights
        </div>

      </div>

    </div>

  )
}

export default Sidebar