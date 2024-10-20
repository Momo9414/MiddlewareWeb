import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target

    if (name === 'password') {
      setPassword(value)
    }
    if (name === 'email') {
      setEmail(value)
    }

    console.log(name)
  }
  const handleSubmit = async (e) => {

    e.preventDefault()
    console.log('je suis dans la fonction handlesubmit')
    await axios.post('http://192.168.252.157:3000/auth/connexion', { email: email, motDePasse: password })
      .then(response => {
        console.log(response)
        if (response) {
          onLogin(response.data.token)
          navigate('/')
        }
      })
      .catch(err => { throw new Error(err) })

  }

  return (
    <div className="auth">
      <h1>Connexion</h1>
      <form className="form-container">
        <label>Email :</label>
        <input value={email} onChange={handleChange} type="email" name="email" required />

        <label>Mot de passe :</label>
        <input value={password} onChange={handleChange} type="password" name="password" required />

        <button onClick={handleSubmit} type="submit">Se connecter</button>
      </form>
    </div>

  );
}

export default Login;
