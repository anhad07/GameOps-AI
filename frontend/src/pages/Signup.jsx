import { useState } from "react"

import {
  useNavigate,
  Link
} from "react-router-dom"

import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff
} from "lucide-react"

function Signup() {

  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)

  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [formData, setFormData] = useState({

    username: "",

    email: "",

    password: "",

    confirmPassword: ""
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    })
  }

  const handleSignup = async () => {

    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {

      alert("Please fill all fields")

      return
    }

    if (
      formData.password !== formData.confirmPassword
    ) {

      alert("Passwords do not match")

      return
    }

    setLoading(true)

    try {

      const response = await fetch(

 "http://13.60.85.120/signup"

        {

          method: "POST",

          headers: {

            "Content-Type": "application/json"
          },

          body: JSON.stringify({

            username: formData.username,

            email: formData.email,

            password: formData.password
          })
        }
      )

      const data = await response.json()

      if (response.ok) {

        alert("Signup successful")

        navigate("/login")
      }

      else {

        alert(data.message)
      }
    }

    catch (error) {

      console.log(error)
    }

    setLoading(false)
  }

  return (

    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-[#111111] border border-white/10 rounded-3xl p-8">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">

          <div className="bg-white text-black p-3 rounded-2xl">

            <ShieldCheck size={28} />

          </div>

          <div>

            <h1 className="text-3xl font-semibold">
              GameOps AI
            </h1>

            <p className="text-gray-500 text-sm mt-1">
              Intelligent Infrastructure Platform
            </p>

          </div>

        </div>

        {/* Heading */}
        <div className="mb-8">

          <h2 className="text-3xl font-semibold mb-2">
            Create Account
          </h2>

          <p className="text-gray-500">
            Start managing infrastructure intelligently
          </p>

        </div>

        {/* Inputs */}
        <div className="space-y-5">

          <div>

            <label className="text-sm text-gray-400 mb-2 block">
              Username
            </label>

            <div className="flex items-center bg-black border border-white/10 rounded-xl px-4 py-3">

              <User className="text-gray-500 mr-3" size={18} />

              <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={formData.username}
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
              />

            </div>

          </div>

          <div>

            <label className="text-sm text-gray-400 mb-2 block">
              Email
            </label>

            <div className="flex items-center bg-black border border-white/10 rounded-xl px-4 py-3">

              <Mail className="text-gray-500 mr-3" size={18} />

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
              />

            </div>

          </div>

          <div>

            <label className="text-sm text-gray-400 mb-2 block">
              Password
            </label>

            <div className="flex items-center bg-black border border-white/10 rounded-xl px-4 py-3">

              <Lock className="text-gray-500 mr-3" size={18} />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >

                {showPassword

                  ? <EyeOff size={18} className="text-gray-500" />

                  : <Eye size={18} className="text-gray-500" />
                }

              </button>

            </div>

          </div>

          <div>

            <label className="text-sm text-gray-400 mb-2 block">
              Confirm Password
            </label>

            <div className="flex items-center bg-black border border-white/10 rounded-xl px-4 py-3">

              <Lock className="text-gray-500 mr-3" size={18} />

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-transparent outline-none w-full"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              >

                {showConfirmPassword

                  ? <EyeOff size={18} className="text-gray-500" />

                  : <Eye size={18} className="text-gray-500" />
                }

              </button>

            </div>

          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-80 transition disabled:opacity-50"
          >

            {loading ? "Creating account..." : "Signup"}

          </button>

        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm mt-8 text-center">

          Already have an account?

          <Link
            to="/login"
            className="text-white ml-2 hover:underline"
          >

            Login

          </Link>

        </p>

      </div>

    </div>
  )
}

export default Signup