import {
  LayoutDashboard,
  Server,
  BarChart3,
  Brain
} from "lucide-react"

import {
  Link,
  useLocation
} from "react-router-dom"

function Sidebar() {

  const location = useLocation()

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/"
    },

    {
      name: "Servers",
      icon: <Server size={18} />,
      path: "/servers"
    },

    {
      name: "Analytics",
      icon: <BarChart3 size={18} />,
      path: "/analytics"
    },

    {
      name: "AI Insights",
      icon: <Brain size={18} />,
      path: "/ai-insights"
    }
  ]

  return (

    <div className="w-64 border-r border-white/10 bg-[#0A0A0A] p-6 min-h-screen">

      <h1 className="text-2xl font-semibold tracking-tight mb-10">
        GameOps AI
      </h1>

      <div className="space-y-2">

        {navItems.map((item, index) => (

          <Link
            key={index}
            to={item.path}
          >

            <div className={`p-3 rounded-xl font-medium flex items-center gap-3 transition-all duration-300

              ${
                location.pathname === item.path

                ? "bg-white text-black"

                : "text-gray-400 hover:bg-white/5 hover:text-white"
              }
            `}>

              {item.icon}

              {item.name}

            </div>

          </Link>

        ))}

      </div>

    </div>

  )
}

export default Sidebar