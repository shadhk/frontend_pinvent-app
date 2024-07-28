import React from "react"
import styles from "./auth.module.scss"
import { TiUserAddOutline } from "react-icons/ti"
import Card from "../../components/card/Card"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

const Register = () => {
  return (
    <div className={`container ${styles.auth}`}>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Card>
        <div className={styles.form}>
          <div className="--flex-center">
            <TiUserAddOutline size={35} color="#999" />
          </div>
          <h2>Register</h2>
          <form>
            <input type="text" placeholder="Username" required name="name" />
            <input type="email" placeholder="Email" required name="email" />
            <input type="password" placeholder="Password" required name="password" />
            <input type="password" placeholder="Confirm Password" required name="confirm_password" />
            <button type="submit" className="--btn --btn-primary --btn-block">
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
