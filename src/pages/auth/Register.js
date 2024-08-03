import React, { useState } from "react"
import styles from "./auth.module.scss"
import { TiUserAddOutline } from "react-icons/ti"
import Card from "../../components/card/Card"
import { Link, useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
import { toast } from "react-toastify"
import { registerUser, validateEmail } from "../../services/authService"
import { useDispatch } from "react-redux"
import { SET_LOGIN, SET_NAME } from "../../redux/features/auth/authSlice"
import Loader from "../../components/loader/Loader"

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const { name, email, password, confirmPassword } = formData

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const registerForm = async e => {
    e.preventDefault()

    if (!name || !email || !password) {
      return toast.error("All fields are required")
    }

    if (password.length < 6) {
      return toast.error("Password must be upto 6 characters")
    }

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email")
    }

    if (password !== confirmPassword) {
      return toast.error("Password does not match")
    }

    const userData = {
      name,
      email,
      password
    }

    setIsLoading(true)
    try {
      const data = await registerUser(userData)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate("/dashboard")
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.error(error.message)
    }
  }

  return (
    <div className={`container ${styles.auth}`}>
      <Helmet>
        <title>Register</title>
      </Helmet>
      {isLoading && <Loader />}
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline
              size={35}
              color="#999"
            />
          </div>
          <h2>Register</h2>
          <form onSubmit={registerForm}>
            <input
              type="text"
              placeholder="Username"
              required
              name="name"
              value={name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              placeholder="Email"
              required
              name="email"
              value={email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Password"
              required
              name="password"
              value={password}
              autoComplete="off"
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              required
              name="confirmPassword"
              value={confirmPassword}
              autoComplete="off"
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="--btn --btn-primary --btn-block"
            >
              Register
            </button>
          </form>
          <span className={styles.register}>
            <Link to="/">Home</Link>
            <p> &nbsp; Already have an account? &nbsp;</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
    </div>
  )
}

export default Register
