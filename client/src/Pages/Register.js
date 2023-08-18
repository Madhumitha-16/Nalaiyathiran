import React, {useRef, useState} from 'react';
import './Styles/register.css';
import register from "../Assets/Images/regsiteration.png";
import {auth} from "../firebaseConfig";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Register()
{

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [curpassword, setCurPassword] = useState("");
  const [regnum,setRegNo] = useState("");
  const [selectedOption, setSelectedOption] = useState('');
  const [email,setemail]=useState("");
  const[password,setPassword]=useState("");
  const[userId,setUserId]=useState("");

  const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
    
    useEffect(() => {
      if (userId) { 
        navigate(`/team-registration/${userId}`); 
      }
    }, [userId, navigate]);

   const signup=(e)=>
    {
        e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    setUserId(user.uid)
  })
  
  .catch((error) => {
    const errorMessage = error.message;
    console.log(errorMessage);
  });
};

  return (<div className="bodyWrap">
    <div className="contentRegisterWrap">
    <form className="registerForm" onSubmit={signup}>
      <div className="RegisterSide">
        <div className="loginWrap">
          <h1>Register</h1>
          <div className="input-row">
            <div className="input-group">
                <input type="text" className="input" onChange={e => setFirstName(e.target.value)} required/>
                <label className={`input-label ${firstName.length > 0 ? "focusLabel" : ""}`}>First Name</label>
            </div>
            <div className="input-group">
                <input type="text" className="input" onChange={e => setLastName(e.target.value)}  required />
                <label className={`input-label ${lastName.length > 0 ? "focusLabel" : ""}`}>Last Name</label>
            </div>
            </div>
            <div className="input-row">

        <div className="input-group">
        <input type="email" className="input" onChange={e => setemail(e.target.value)} required/>
        <label className={`input-label ${email.length > 0 ? "focusLabel" : ""}`}>Email</label>
        </div>
        </div>
        <div className="input-group">
        <input
        type="text"
        className="input"
        onChange={e => setRegNo(e.target.value)}
        required
        pattern="[0-9]*"
        inputMode="numeric"
        />
        <label className={`input-label ${regnum.length > 0 ? "focusLabel" : ""}`}>Register No. [Only numbers]</label>
        </div>
        <div className="input-group">
        <label>Course</label>
        <input type="radio" className="input-radio"  required value="BE" name="course"/>BE
        <input type="radio" className="input-radio"  required value="BTech" name="course"/>BTech
        </div>
        <div className='input-group'>
        <label>Department</label>
        <select className='select' id="dropdown"  value={selectedOption} onChange={handleSelectChange} > <option value="IT">IT</option>
            <option value="CSE">CSE</option>
            <option value="ADS">ADS</option>
            <option value="CSBS">CSBS</option>
        </select>
        
        </div>
        </div>
        <div className="input-row">
            <div className="input-group">
                <input type="password" className="input"  onChange={e => setPassword(e.target.value)}  required/>
                <label className={`input-label ${password.length > 0 ? "focusLabel" : ""}`}>Password</label>
            </div>
            <div className="input-group">
                <input type="password" className="input" onChange={e => setCurPassword(e.target.value)} required />
                <label className={`input-label ${curpassword.length > 0 ? "focusLabel" : ""}`}>Confirm Password</label>
            </div>
            </div>
        <div>
        <input type='submit' className='button'  value="Register"/>
        {/* <button onClick={login}>Register</button> */}
        </div>
       
        </div>
        </form>
      </div>
      <div className="infoSide">
        <div className="loginWrap">
          <h2>Nalaiyathiran</h2>
          <hr></hr>
          <p>Log in, collaborate with your team and submit your innovations here!  .</p>
          <img src={register} />
        </div>
      </div>
    </div>
  )
}
