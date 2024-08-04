import React, { useState } from "react"
import styles from "./auth.module.scss"
import { MdPassword } from "react-icons/md"
import Card from "../../components/card/Card"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Helmet } from "react-helmet"
import { toast } from "react-toastify"
import { resetPassword } from "../../services/authService"

const initialState = {
  password: "",
  confirmPassword: ""
}

const Reset = () => {
  const [formData, setFormData] = useState(initialState)
  const { password, confirmPassword } = formData
  const navigate = useNavigate()

  const { resetToken } = useParams()

  const handleInputChange = e => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleResetSubmit = async e => {
    e.preventDefault()

    if (!password) {
      return toast.error("All fields are required")
    }

    if (password.length < 6) {
      return toast.error("Password must be upto 6 characters")
    }

    if (password !== confirmPassword) {
      return toast.error("Password does not match")
    }

    const userData = { password, confirmPassword }

    try {
      const data = await resetPassword(userData, resetToken)
      toast.success(data.message)
      setTimeout(() => {
        navigate("/login")
      }, 5000)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className={`container ${styles.auth}`}>
      <Helmet>
        <title>Reset Password</title>
      </Helmet>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <MdPassword
              size={35}
              color="#999"
            />
          </div>
          <h2>Reset Password</h2>
          <form onSubmit={handleResetSubmit}>
            <input
              type="password"
              placeholder="New Password"
              required
              name="password"
              value={password}
              autoComplete="off"
              onChange={handleInputChange}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
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
              Reset Password
            </button>
            <div className={styles.links}>
              <p>
                <Link to="/">- Home</Link>
              </p>
              <p>
                <Link to="/login">- Login</Link>
              </p>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default Reset
