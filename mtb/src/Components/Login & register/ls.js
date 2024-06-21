import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './ls.css';

const LS = () => {
  const [Login, setLogin] = useState({ email: '', password: '' });
  const [detail, setDetail] = useState({ name: '', city : '', email: '', password: '' });
  const navi = useNavigate();

  const handelLogin = async (e) => {
    e.preventDefault();
    const responce = await fetch("http://localhost:8000/admin/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(Login)
    });
    const json = await responce.json();
    if (responce.ok) {
      document.cookie = `adminAuthToken=${json.data.adminAuthToken}; path=/;`
      localStorage.setItem('aid', json.data.a_id);
      navi('/admin');
      console.log(document.cookie.adminAuthToken, "login successfully");
    }
    console.log(json.data);
  }


  const handelSubmit = async (e) => {
    const formData = new FormData();

    const responce = await fetch("http://localhost:8000/admin/register", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      credentials: "include",
      body: JSON.stringify(detail),
    })
      .then((res) => { res.json() })
      .then((res) => { console.log("sign up successfully.");});
  } 

  // ############# for javascript
  useEffect(() => {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }, []);

  // #############################

  return (
    <>
      <div class="container" id="container">
        <div class="form-container sign-up-container">
          <form className="ls-form" action="/">
            <div><img className="logo-ls" src="/assets/image-1.png" alt="image-1" /></div>
            <h1>Create Account</h1>
            {/* <div class="social-container">
              <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
              <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
            </div> */}
            <input className="ls-input-text" type="text" placeholder="Name" onChange={(e) => {
              setDetail({ ...detail, name: e.target.value });
            }} required />
            <input className="ls-input-text" type="text" placeholder="City" onChange={(e) => {
              setDetail({ ...detail, city: e.target.value });
            }} required />
            <input className="ls-input-text" type="email" placeholder="Email" onChange={(e) => {
              setDetail({ ...detail, email: e.target.value });
            }} required />
            <input className="ls-input-text" type="password" placeholder="Password" onChange={(e) => {
              setDetail({ ...detail, password: e.target.value })
            }} required />
            <button className="ls-btn" onClick={handelSubmit}>Sign Up</button>
          </form>
        </div>
        <div class="form-container sign-in-container">
          <form className="ls-form" action="#">
            <div><img className="logo-ls" src="/assets/image-1.png" alt="image-1" /></div>
            <h1>Sign in</h1>
            <input className="ls-input-text" type="email" placeholder="Email" onChange={(e) => {
              setLogin({ ...Login, email: e.target.value });
            }} required />
            <input className="ls-input-text" type="password" placeholder="Password" onChange={(e) => {
              setLogin({ ...Login, password: e.target.value });
            }} required />
            <a href="#">Forgot your password?</a>
            <button className="ls-btn" onClick={handelLogin}>Sign In</button>
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button class="ls-btn ghost" id="signIn">Sign In</button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Hello, Admin!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button class="ls-btn ghost" id="signUp">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LS