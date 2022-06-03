import { useState,useEffect } from "react"
import axios from 'axios'
import { Link } from "react-router-dom"
import FormRow from "./FormRow";
import Wrapper from "../wrapper/RegisterPage";

const AddNobelPrize = () => {
    const [data, setData] = useState({ award_year: "", category: "Chemistry", prize: "", prize_adjusted: "", motivation: "", laureate_id: "1"})
    const [error, setError] = useState("")
    const [categories, setCategories] = useState([])
    const [laureates, setLaureates] = useState([])
    const handleChange = ({ target: { name, value } }) => {
        setData({ ...data, [name]: value })
    }

    useEffect(() => {
        async function fetchData(){
            const url = "http://localhost:8000/api/getCategories"
        const token = localStorage.getItem("token");
        await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }}).then(response => {
                setCategories(response.data)
                
            }).catch(error =>{
                console.log("getting categories ERROR")
                console.log(error.message)
            })
        
        }

        async function fetchLaureates(){
            const url = "http://localhost:8000/api/getLaureateName"
            const token = localStorage.getItem("token");
            await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }}).then(response => {
                    setLaureates(response.data)
                    
                }).catch(error =>{
                    console.log("getting laureates ERROR")
                    console.log(error.message)
                })
        }
        fetchLaureates();
        fetchData();
    },[])

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(data)
        const token = localStorage.getItem("token");
        try {
            const url = "http://localhost:8000/api/addNobelPrize"
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
                        <h1>Add Nobel Prize</h1>
                        <label htmlFor="award_Year" className='form-label'>
                            Award year
                        </label>
                        <input name="award_year" type="number" min="1900" max="2099" step="1" onChange={handleChange}/>
                        <label htmlFor="category" className='form-label'>
                            Category
                        </label>
                        <select name="category" onChange={handleChange} >
                         {categories.map((category) => (
                            <option value={category.value}>{category.label}</option>
                            ))} 
                         </select>
                         <label htmlFor="prize" className='form-label'>
                            Prize
                        </label>
                        <input name="prize" type="number" min="1" step="1" onChange={handleChange}/>
                        <label htmlFor="prize_adjusted" className='form-label'>
                            Prize
                        </label>
                        <input name="prize_adjusted" type="number" min="1" step="1" onChange={handleChange}/>
                        <FormRow
                            type='text'
                            name='motivation'
                            value={data.lastname}
                            handleChange={handleChange}
                        />
                         <label htmlFor="laureate_id" className='form-label'>
                            Laureate
                        </label>
                        <select name="laureate_id" onChange={handleChange} >
                         {laureates.map((laureate) => (
                            <option value={laureate.value}>{laureate.label}</option>
                            ))} 
                         </select>
                        {error && <div>{error}</div>}
                        <button type="button" onClick={handleSubmit} className='btn btn-block'>
                            Add
                        </button>
                      
                    </form>
                </Wrapper>
    )
}
export default AddNobelPrize;