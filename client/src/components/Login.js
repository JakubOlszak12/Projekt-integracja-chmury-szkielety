import { useState } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
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
            const url = "http://localhost:8000/api/auth/login"
            const { data: res } = await axios.post(url, data)
            localStorage.setItem("token", res.token)
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
                            handleChange={handleChange}
                        />
                        {error && <div>{error}</div>}
                        <button type="submit" className='btn btn-block'>
                            Zaloguj się
                        </button>
                        <p>
                            New Here ?
                            <Link to="/signup">
                                <button type="button" className='member-btn'>
                                    Sing Up
                                </button>
                            </Link>
                        </p>
                    </form>
                </Wrapper>
    )
}
export default Login;