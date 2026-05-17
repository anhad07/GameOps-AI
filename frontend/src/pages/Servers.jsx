import Sidebar from "../components/Sidebar"

import {
  useEffect,
  useState
} from "react"

function Servers() {

  const [servers, setServers] = useState([

    {

      name: "COD #1",

      region: "India",

      status: "Online",

      cpu: "95%",

      ram: "90%",

      maxPlayers: "500",

      mode: "Performance"
    },

    {

      name: "PUBG",

      region: "Singapore",

      status: "Online",

      cpu: "60%",

      ram: "55%",

      maxPlayers: "300",

      mode: "Balanced"
    }

  ])

  const [showPopup, setShowPopup] = useState(false)

  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({

    name: "",
    region: "",
    maxPlayers: "",
    mode: "Normal"
  })

  const fetchServers = () => {

    fetch("http://
http://13.60.85.120/servers")

      .then((res) => res.json())

      .then((data) => {

        if (data.length > 0) {

          setServers(data)
        }
      })

      .catch((err) => {

        console.log(err)
      })
  }

  useEffect(() => {

    fetchServers()

    const interval = setInterval(() => {

      fetchServers()

    }, 3000)

    return () => clearInterval(interval)

  }, [])

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    })
  }

  const createServer = async () => {

    if (
      !formData.name ||
      !formData.region ||
      !formData.maxPlayers
    ) {

      alert("Please fill all fields")

      return
    }

    setLoading(true)

    let cpu = "15%"

    let ram = "20%"

    const players = Number(formData.maxPlayers)

    if (formData.mode === "Performance") {

      if (players >= 500) {

        cpu = "95%"
        ram = "90%"
      }

      else if (players >= 200) {

        cpu = "70%"
        ram = "65%"
      }

      else if (players >= 100) {

        cpu = "45%"
        ram = "40%"
      }

      else {

        cpu = "25%"
        ram = "30%"
      }
    }

    else if (formData.mode === "Balanced") {

      if (players >= 500) {

        cpu = "80%"
        ram = "75%"
      }

      else if (players >= 200) {

        cpu = "55%"
        ram = "50%"
      }

      else if (players >= 100) {

        cpu = "35%"
        ram = "40%"
      }

      else {

        cpu = "20%"
        ram = "25%"
      }
    }

    else {

      if (players >= 500) {

        cpu = "65%"
        ram = "60%"
      }

      else if (players >= 200) {

        cpu = "40%"
        ram = "45%"
      }

      else if (players >= 100) {

        cpu = "25%"
        ram = "30%"
      }

      else {

        cpu = "15%"
        ram = "20%"
      }
    }

    const serverData = {

      ...formData,

      status: "Online",

      cpu,

      ram
    }

    try {

      await fetch("http://
http://13.60.85.120/create-server", {

        method: "POST",

        headers: {

          "Content-Type": "application/json"
        },

        body: JSON.stringify(serverData)
      })

      fetchServers()

      setShowPopup(true)

      setTimeout(() => {

        setShowPopup(false)

      }, 2500)

      setFormData({

        name: "",
        region: "",
        maxPlayers: "",
        mode: "Normal"
      })
    }

    catch (error) {

      console.log(error)
    }

    setLoading(false)
  }

  return (

    <div className="min-h-screen bg-black text-white flex">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* Popup */}
        {showPopup && (

          <div className="fixed top-6 right-6 bg-green-500 text-black px-6 py-3 rounded-xl font-semibold shadow-lg z-50">

            Server Created Successfully 🚀

          </div>
        )}

        <h1 className="text-4xl font-semibold mb-2">
          Servers
        </h1>

        <p className="text-gray-500 mb-10">
          Monitor and manage global gaming infrastructure
        </p>

        {/* Create Server Form */}
        <div className="bg-[#111111] border border-white/10 rounded-2xl p-6 mb-8">

          <h2 className="text-2xl font-semibold mb-6">
            Deploy New Game Server
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              type="text"
              name="name"
              placeholder="Game Server Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none"
            />

            <input
              type="text"
              name="region"
              placeholder="Region"
              value={formData.region}
              onChange={handleChange}
              className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none"
            />

            <input
              type="number"
              name="maxPlayers"
              placeholder="Max Players"
              value={formData.maxPlayers}
              onChange={handleChange}
              className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none"
            />

            <select
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="bg-black border border-white/10 rounded-xl px-4 py-3 outline-none"
            >

              <option>Normal</option>

              <option>Balanced</option>

              <option>Performance</option>

            </select>

          </div>

          <button
            onClick={createServer}
            disabled={loading}
            className="mt-6 bg-white text-black px-6 py-3 rounded-xl font-medium hover:opacity-80 transition disabled:opacity-50"
          >

            {loading ? "Deploying..." : "Deploy Server"}

          </button>

        </div>

        {/* Server Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {servers.map((server, index) => (

            <div
              key={index}
              className="bg-[#111111] border border-white/10 rounded-2xl p-6 overflow-hidden"
            >

              <div className="flex items-center justify-between mb-6">

                <div className="pr-4 max-w-[70%]">

                  <h2 className="text-2xl font-semibold break-words">
                    {server.name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {server.region}
                  </p>

                </div>

                <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm whitespace-nowrap">

                  {server.status}

                </div>

              </div>

              <div className="space-y-5">

                <div>

                  <div className="flex justify-between mb-2">

                    <span className="text-gray-400">
                      CPU Usage
                    </span>

                    <span>
                      {server.cpu}
                    </span>

                  </div>

                  <div className="w-full bg-white/10 rounded-full h-2">

                    <div
                      className="bg-white h-2 rounded-full"
                      style={{ width: server.cpu }}
                    ></div>

                  </div>

                </div>

                <div>

                  <div className="flex justify-between mb-2">

                    <span className="text-gray-400">
                      RAM Usage
                    </span>

                    <span>
                      {server.ram}
                    </span>

                  </div>

                  <div className="w-full bg-white/10 rounded-full h-2">

                    <div
                      className="bg-gray-400 h-2 rounded-full"
                      style={{ width: server.ram }}
                    ></div>

                  </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="bg-black/40 border border-white/5 rounded-xl p-4">

                    <p className="text-gray-500 text-sm mb-1">
                      Max Players
                    </p>

                    <h3 className="text-2xl font-semibold">
                      {server.maxPlayers || "500"}
                    </h3>

                  </div>

                  <div className="bg-black/40 border border-white/5 rounded-xl p-4">

                    <p className="text-gray-500 text-sm mb-1">
                      Mode
                    </p>

                    <h3 className="text-lg font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
                      {server.mode || "Normal"}
                    </h3>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  )
}

export default Servers