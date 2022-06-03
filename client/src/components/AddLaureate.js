import { useState,useEffect } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import FormRow from "./FormRow";
import Wrapper from "../wrapper/RegisterPage";

const AddLaureate = () => {
    const [data, setData] = useState({ firstname: "", lastname: "", gender: "male", birth_date: "", country: "", wikipedia_address: ""})
    const [error, setError] = useState("")
    const [countries, setCountries] = useState([])

    const handleChange = ({ target: { name, value } }) => {
        setData({ ...data, [name]: value })
    }

    useEffect(() => {
        async function fetchData(){
            const url = "http://localhost:8000/api/getCountries"
        const token = localStorage.getItem("token");
        await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }}).then(response => {
                setCountries(response.data)
                
            }).catch(error =>{
                console.log("getting countries ERROR")
                console.log(error.message)
            })
        
        }
        fetchData();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
        const token = localStorage.getItem("token");
        try {
            const url = "http://localhost:8000/api/addLaureate"
            const { data: res } = await axios.post(url, data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
            }})    
            window.location.reload();  
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
                        <h1>Add laureate</h1>
                        <FormRow
                            type='text'
                            name='firstname'
                            value={data.firstname}
                            handleChange={handleChange}
                        />
                        <FormRow
                            type='text'
                            name='lastname'
                            value={data.lastname}
                            handleChange={handleChange}
                        />
                        <label htmlFor="gender" className='form-label'>
                            Gender
                        </label>
                         <select name="gender" onChange={handleChange}>
                                <option value="male">male</option>
                                <option value="female">female</option>
                         </select>
                         <label htmlFor="gender" className='form-label'>
                           birth_date
                        </label>
                         <input name="birth_date" type="date" onChange={handleChange}/>
                         <label htmlFor="country" className='form-label'>
                            Country
                        </label>
                         <select name="country" onChange={handleChange} >
                         {countries.map((country) => (
                            <option value={country.value}>{country.label}</option>
                            ))} 
                         </select>
                         <FormRow
                            type='text'
                            name='wikipedia_address'
                            value={data.wikipedia_address}
                            handleChange={handleChange}
                        />
                        {error && <div>{error}</div>}
                        <button type="button" onClick={handleSubmit} className='btn btn-block'>
                            Add
                        </button>
                      
                    </form>
                </Wrapper>
    )
}
export default AddLaureate;