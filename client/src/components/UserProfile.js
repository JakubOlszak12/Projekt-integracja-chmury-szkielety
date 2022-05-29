import React, {useState} from 'react';
import axios from 'axios'
import Wrapper from '../wrapper/DashboardFormPage'
import FormRow from "./FormRow";
import {BsFillTrashFill} from 'react-icons/bs';


const UserProfile = () => {

    var user = JSON.parse(localStorage.getItem('user'));

    const [name, setName] = useState(user.name || '')
    const [email, setEmail] = useState(user.email || '')
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!name || !email) {
            //show blad
            return
        }
        updateUser({name, email})
    }

    const updateUser = async (currentUser) => {
        try {
            const {data} = await axios.patch('/api/updateUser', currentUser)


            const {user, token} = data
            addUserToLocalStorage({user, token})
        } catch (error) {
            if (error.response.status !== 401) {
                //xd
            }
        }
    }

    const addUserToLocalStorage = ({user, token}) => {
        localStorage.setItem('user', JSON.stringify(user))
        localStorage.setItem('token', token)
    }

    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>profile</h3>
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='name'
                        value={name}
                        handleChange={(e) => setName(e.target.value)}
                    />
                    <FormRow
                        type='email'
                        name='email'
                        value={email}
                        handleChange={(e) => setEmail(e.target.value)}
                    />

                    <button className='btn btn-block' type='submit'>
                        save changes
                    </button>
                    <button className='btn btn-danger'>
                        Delete Account <BsFillTrashFill/>
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}
export default UserProfile