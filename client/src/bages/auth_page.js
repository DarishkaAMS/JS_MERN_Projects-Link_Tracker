import React, { useState } from 'react';
import { useHttp } from '../hooks/http.hook.js';

export const AuthPage = () => {
    const { loading, error, request } = useHttp() 

    const [form, setForm] = useState({
        email: "", password: ""
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            console.log("DATA", data);
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2> Prettify the Link </h2>
                <div class="card blue darken-1">
                    <div class="card-content white-text">
                    <span class="card-title">Authorization</span>
                        <div>
                            <div class="input-field">
                                <input placeholder="Your email please" id="email" type="text" name="email" className="yellow-input" onChange={ changeHandler }/>
                                <label htmlFor="email"> Email </label>
                            </div>
                            <div class="input-field">
                                <input placeholder="You password please" id="password" type="password" name="password" className="yellow-input" onChange={ changeHandler }/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div class="card-action">
                        <button className="btn yellow darken-4" style={{ marginRight:10 }}> Login </button>
                        <button className="btn grey lighten-1 black-text" onClick={ registerHandler } disabled={ loading }> Register </button>
                    </div>
                </div>
            </div>
        </div>
    )
};