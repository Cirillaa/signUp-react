import React, { useRef, useState } from 'react';

import classes from './Registration.module.css';

const isEmpty = (value) => value.trim() === '';

const Registration = () => {
  const [submittingState, setSubmittingState] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false)
  const [formValidity, setFormValidity] = useState({
    name: true,
    email: true,
    password: true
  });

  const nameInput = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();


  const lengthPasswordHandler = () => {
    const length = passwordInput.current.value.length;

    if (length <= 6 && length > 3) {
      return `${classes.lessThan6}`;
    } else if (length > 6) {
      return `${classes.moreThan6}`;
    } else if (length <= 3) {
      return  `${classes.lessThan3}`;
    }
  }


const registrationFormHandler = (e) => {
  e.preventDefault();

  const enteredName = nameInput.current.value;
  const enteredEmail = emailInput.current.value;
  const enteredPassword = passwordInput.current.value;

  const nameValid = !isEmpty(enteredName);
  const emailValid = !isEmpty(enteredEmail);
  const passwordValid = enteredPassword.length > 6; 

  setFormValidity({
    name: nameValid,
    email: emailValid,
    password: passwordValid
  })

  const formIsValid = nameValid && emailValid && passwordValid;

  const userData = {
    name: enteredName,
    email: enteredEmail,
    password: enteredPassword
  }

  const sendData = async() => {
    setSubmittingState(true)
    await fetch("https://users-1c18f-default-rtdb.firebaseio.com/Users/users.json", {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    setSubmittingState(false);
    setDidSubmit(true);
  }

  if(!formIsValid) {
    return
  }

  sendData()
}

const submittingContent = <p className={classes.sendMessage}>Sending data...</p>

const didSubmitContent = (
  <p className={classes.sendMessage}>You have successfully registered! </p>
);
const initialContent = (
  <form onSubmit={registrationFormHandler}>
    <div className={formValidity.name ? classes.control : classes.invalid}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" ref={nameInput}></input>
    </div>
    <div className={formValidity.email ? classes.control : classes.invalid}>
      <label htmlFor="email">Email:</label>
      <input type="text" id="email" name="email" ref={emailInput}></input>
    </div>
    <div className={formValidity.password ? classes.control : classes.invalid}>
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        ref={passwordInput}
        onChange={lengthPasswordHandler}
      ></input>
      <div className={{lengthPasswordHandler}}></div>
    </div>
    {!formValidity.name && !formValidity.email && !formValidity.password && (
      <p className={classes.sendMessage}>Enter valid data</p>
    )}
    <button className={classes.button}>Sign up</button>
  </form>
);

    return (
      <section className={classes.sectionForm}>
        {submittingState && submittingContent}
        {didSubmit && !submittingState && didSubmitContent}
        {!didSubmit && !submittingState && initialContent}
      </section>
    );
}

export default Registration;