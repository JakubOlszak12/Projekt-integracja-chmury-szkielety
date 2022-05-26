import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "../index.css"
import FormRow from "./FormRow";

const Signup = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8000/api/auth/register"
            const { data: res } = await axios.post(url, data)
            navigate("/login")
            console.log(res.message)
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }
    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>

                <div className={styles.right}>
                    <form className={styles.form_container}
                          onSubmit={handleSubmit}>
                        <h1>Zakładanie konta</h1>
                        <FormRow
                            type='text'
                            name='name'
                            value={data.name}
                            handleChange={handleChange}
                        />
                        <FormRow
                            type='email'
                            name='email'
                            value={data.email}
                            handleChange={handleChange}
                        />
                        <FormRow
                            type='password'
                            name='password'
                            value={data.password}
                            handleChange={handleChange}
                        />
                        {error && <div
                            className={styles.error_msg}>{error}</div>}
                        <button type="submit"
                                className={styles.green_btn}>
                            Zaloguj się
                        </button>
                    </form>
                </div>
                <div className={styles.left}>
                    <h1>Witaj z powrotem</h1>
                    <Link to="/login">
                        <button type="button"
                                className={styles.white_btn}>
                            Sing in
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default Signup