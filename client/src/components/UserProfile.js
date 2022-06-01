import React, {useState} from 'react';
import axios from 'axios'
import Wrapper from '../wrapper/DashboardFormPage'
import FormRow from "./FormRow";
import {BsFillTrashFill} from 'react-icons/bs';


const UserProfile = () => {

    var user = JSON.parse(localStorage.getItem('user'));

    const [name, setName] = useState(user.name || '')
    const [email, setEmail] = useState(user.email || '')

    const handleDelete = (id, e) => {
        e.preventDefault()
        const url = `http://localhost:8000/api/delete`
        const token = localStorage.getItem("token");

        axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'email': email
            },
        }).then(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user")
            window.location.reload()
        })
    }

    const addUserToLocalStorage = ({user, token}) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }


    return (
        <Wrapper>
            <form className='form'>
                <h3>profile</h3>
                <div className='form-center'>
                    <div className='form-row'>
                        <label className='form-label'>
                            name
                        </label>
                        <input
                            type='text'
                            value={name}
                            name={name}
                            disabled={true}
                            className='form-input'
                        />
                    </div>
                    <div className='form-row'>
                        <label className='form-label'>
                            email
                        </label>
                        <input
                            type='email'
                            value={email}
                            name={email}
                            disabled={true}
                            className='form-input'
                        />
                    </div>
                    {console.log(user)}
                    <button className='btn btn-danger' onClick={(e) => handleDelete(user.id, e)}>
                        Delete Account <BsFillTrashFill/>
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}
export default UserProfile