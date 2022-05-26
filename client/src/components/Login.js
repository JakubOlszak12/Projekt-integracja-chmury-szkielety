import { useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import styles from "../index.css"
import FormRow from "./FormRow";
import Wrapper from "../wrapper/RegisterPage";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = "http://localhost:8080/api/auth"
            const { data: res } = await axios.post(url, data)
            localStorage.setItem("token", res.data)
            window.location = "/"
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
        <Wrapper className='full-page'>
            <form className='form'
                          onSubmit={handleSubmit}>
                        <h1>Logowanie</h1>
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
                            onChange={handleChange}
                        />

                        {error && <div
                            className={styles.error_msg}>{error}</div>}
                        <button type="submit"
                                className='btn btn-block'>
                            Zaloguj się
                        </button>
                        <p>
                            <h2>New Here ?</h2>
                            <Link to="/signup">
                                <button type="button"
                                        className='member-btn'>
                                    Sing Up
                                </button>
                            </Link>
                        </p>
                    </form>
                </Wrapper>
    )
}
export default Login;