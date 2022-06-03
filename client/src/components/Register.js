import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import FormRow from "./FormRow";
import Wrapper from "../wrapper/RegisterPage";

const Signup = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
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
        <Wrapper className='full-page'>
                    <form className='form'
                          onSubmit={handleSubmit}>
                        <h1>Registration</h1>
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
                        <FormRow
                            type='password'
                            name='password_confirmation'
                            value={data.password_confirmation}
                            handleChange={handleChange}
                        />
                        {error && <div>{error}</div>}
                        <button type="submit" className='btn btn-block'>
                            Sign in!
                        </button>
                        <p>
                            Welcome back
                            <Link to="/login">
                                <button type="button" className='member-btn'>
                                    Log in!
                                </button>
                            </Link>
                        </p>
                    </form>
        </Wrapper>
    );
};
export default Signup