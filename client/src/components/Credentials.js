import React, { useState} from 'react'

const Credentials = ({ onSubmit, email = false}) => {
    const [credentials, setCredentials] = useState({email:'', password:'', name:''})

    const submitForm = e => {
        e.preventDefault()
        onSubmit(credentials);
    }

    return(
        <form className="credentials" id="credentials-form" onSubmit={e => submitForm(e)}>
            <table className="credentials-form">
                <tbody>
                    <tr className="credentials-form-row">
                        <td>
                            <label htmlFor="login-username">User Name</label>
                        </td>
                        <td>
                        <input required  name="username" id="login-username" value={credentials.name} onChange={e=>setCredentials({...credentials, name: e.target.value })}></input><br />
                        </td>
                    </tr>
                    {email &&
                        <tr className="credentials-form-row">
                            <td>
                                <label htmlFor="login-email">email</label>
                            </td>
                            <td>
                                <input required  name="email" id="login-email" value={credentials.email} onChange={e=>setCredentials({...credentials, email: e.target.value })}></input>
                            </td>
                        </tr>
                    }
                    <tr className="credentials-form-row">
                        <td>
                            <label htmlFor="login-password">password</label>
                        </td>
                        <td>
                            <input required type="password" id="login-password" value={credentials.password} onChange={e=>setCredentials({...credentials, password:e.target.value})}></input>
                        </td>
                    </tr>
                    <tr className="credentials-form-row">
                        <td colSpan="2">
                        <button type="submit" form="credentials-form" value="Submit">Submit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </form>
    )
}

export default Credentials