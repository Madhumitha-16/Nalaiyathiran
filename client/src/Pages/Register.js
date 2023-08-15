import React, {useRef, useState} from 'react';
//import axios from 'axios';
import './Styles/register.css';
import register from "../Assets/Images/regsiteration.png";
import {db, firebase} from "../firebaseConfig"
import {addDoc,collection} from "@firebase/firestore";
import { use } from 'passport';


export default function Register() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")

  const [selectedOption, setSelectedOption] = useState('');
  
  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  //sending data from xxfield to db 
const fname=useRef();
const lname=useRef();
const mailid=useRef();
const regnum=useRef();
const course=useRef();
const dept=useRef();
const psw=useRef();

const ref=collection(db,"test2"); 


const login=async(e)=>
{
e.preventDefault();
console.log(fname.current.value);
console.log(lname.current.value);
console.log(mailid.current.value);
console.log(regnum.current.value);
console.log(course.current.value);
console.log(dept.current.value);
console.log(psw.current.value);

let data={
    First_name:fname.current.value,
    Last_name:lname.current.value,
    Email:mailid.current.value,
    Register_number:regnum.current.value,
    Course: course.current.value,
    Department:dept.current.value,
    Password:psw.current.value
    
}
try
{
    addDoc(ref,data);
}
catch(e)
{
    console.log(e);
}

};    



  return (<div className="bodyWrap">
    <div className="contentRegisterWrap">
    
      <div className="loginSide">
        <div className="loginWrap">
          <h1>Register</h1>
          <div className="input-row">
            <div className="input-group">
                <input type="text" className="input"  onChange={e => setFirstName(e.target.value)} ref={fname} required="required"/>
                <label className={`input-label ${firstName.length > 0 ? "focusLabel" : ""}`}>First Name</label>
            </div>
            <div className="input-group">
                <input type="text" className="input" onChange={e => setLastName(e.target.value)} ref={lname} required="required" />
                <label className={`input-label ${lastName.length > 0 ? "focusLabel" : ""}`}>Last Name</label>
            </div>
            </div>
        <div className="input-group">
        <input type="email" className="input"  ref={mailid} required="required"/>
        <label >Email</label>
        </div>
        <div className="input-group">
        <input type="text" className="input" ref={regnum}  required="required"/>
        <label >Register No.</label>
        </div>
        <div className="input-row">
        <div className="input-group">
        <label>Course</label>
        <input type="radio" className="input-radio" ref={course} required="required" value="BE" name="course"/>BE
        <input type="radio" className="input-radio"  required="required" value="BTech" name="course"/>BTech
        </div>
        <div className='input-group'>
        <label>Department</label>
        <select className='select' id="dropdown" ref={dept} value={selectedOption} onChange={handleSelectChange}> <option value="IT">IT</option>
            <option value="CSE">CSE</option>
            <option value="ADS">ADS</option>
            <option value="CSBS">CSBS</option>
        </select>
        </div>
        </div>
        
          <div className="input-group">
            <input type="password" className="input password" ref={psw} onChange={e => setPassword(e.target.value)} required="required"/>
            <label className={`${password.length > 0 ? "focusLabel" : ""}`}>Password</label>
          </div>
          <div className="input-group">
            <input type="password" className="input password" onChange={e => setPassword(e.target.value)} required="required"/>
            <label className={`${password.length > 0 ? "focusLabel" : ""}`}>Confirm Password</label>
          </div>
          <button onClick={login}>Register</button>
        </div>
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
  </div>
  )
}
