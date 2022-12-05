import React, { useState } from 'react';

import classes from './UserProfile.module.css';
import Auth from './Auth.js';
import Registration from './Registration';



const UserProfile = () => {
  const activeClasses = classes.buttonActive;
  const unactiveClasses = classes.buttonUnactive;

  const [login, setLogin] = useState(activeClasses);
  const [registration, setRegistration] = useState(unactiveClasses)

  const changeLoginHandler = () => {
    if(login === activeClasses) {
      return
    }

    setLogin(activeClasses);
    setRegistration(unactiveClasses);
  }
  const changeRegistrationHandler = () => {
    if(registration === unactiveClasses) {
      setLogin(unactiveClasses);
      setRegistration(activeClasses);
    } else {
      return
    }
  }

  return (
    <main className={classes.profile}>
      <div className={classes.buttons}>
        <div className={login} onClick={changeLoginHandler}>
          <p>Login</p>
        </div>
        <div className={registration} onClick={changeRegistrationHandler}>
          <p>Registration</p>
        </div>
      </div>
      {login === activeClasses && <Auth />}
      {registration === activeClasses && <Registration />}
    </main>
  );
};

export default UserProfile;
