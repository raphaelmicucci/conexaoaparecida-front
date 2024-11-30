import React, { useState } from 'react'
import './signup.css'

import logo from '../../assets/ConexAp.png'

export function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        phone: '',
        church: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify(formData);
    
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
    
        fetch("http://localhost:8080/api/auth/signup", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(result);
                alert("Cadastrado com sucesso");
                window.location.href = '/';
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="row mt-page h-100 w-100 m-0 p-0">
            <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
                <form className="form-signin w-75 justify-content-center align-items-center text-center p-0" onSubmit={handleSubmit}>
                    <div className="justify-content-center align-items-center text-center">
                        <img src={logo} className="logo mb-2" />
                        <h4 className="mb-4 w-100">Solicite sua conta.</h4>
                        <h5 className="mb-4 text-secondary">Preencha os campos abaixo.</h5>
                    </div>
                    <div className="mt-2">
                        <input className="w-75" type="text" name="username" placeholder="Nome" value={formData.username} onChange={handleChange} />
                    </div>
                    <div className="mt-2">
                        <input className="w-75" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                    </div>
                    <div className="mt-2">
                        <input className="w-75" type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} />
                    </div>
                    <div className="mt-2">
                        <input className="w-75" type="text" name="church" placeholder="Igreja" value={formData.church} onChange={handleChange} />
                    </div>
                    <div className="mt-2">
                        <input className="w-75" type="phone" name="phone" placeholder="Telefone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="mt-3 mb-5">
                        <button type="submit" className="btn btn-primary w-75">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}