import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Cria o JSON com os valores de email e senha
        const user = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('https://api-virtual-trainer.vercel.app/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                // Sucesso no login, pode redirecionar para outra página ou mostrar uma mensagem de sucesso
                const data = await response.json();
                // Faça algo com os dados de resposta, como armazenar o token de autenticação
                navigate('/menu');
                alert('Login realizado com sucesso');
            } else {
                const errorData = await response.json();
                alert(`Erro ao fazer login: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Erro ao fazer login: ${error.message}`);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                <div className='font-bold text-3xl text-center mb-5'>
                    Login
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email"
                        type="email"
                        placeholder="Insira seu Email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Senha
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="Insira sua senha"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-16 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Login
                    </button>
                </div>
                <div className='text-center mt-4'><Link to={'/'}>Não possui uma conta? <br />Cadastre-se</Link></div>
            </form>
        </div>
    );
};

export default Login;