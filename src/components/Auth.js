import { useState, useRef, useCallback} from 'react';

import classes from './Auth.module.css';

const Auth = () => {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [wrongData,setWrongData] = useState(false)


  const emailInput = useRef()
  const passwordInput = useRef();

  const fetchUser = useCallback(async () => {
    setError(null);

    try {
      const response = await fetch(
        "https://users-1c18f-default-rtdb.firebaseio.com/Users/users.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const Loaduser = [];

      for (const key in data) {
        Loaduser.push({
          id: key,
          name: data[key].name,
          email: data[key].email,
          password: data[key].password,
        });
      }
      setUsers(Loaduser);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  const loginFormHandler = (e) => {
    e.preventDefault()

    fetchUser()

    const enteredEmail = emailInput.current.value;
    const enteredPassword = passwordInput.current.value;

    const checkUser = users.filter(user => {
      return user.email === enteredEmail && user.password === enteredPassword
    })

    if(checkUser.length === 1) {
      setLogin(true);
      setUser(checkUser[0])
    }

    if(checkUser.length === 0) {
      setWrongData(true);
    }
  }

  const closeHandler = () => {
    setLogin(false)
  }

  return (
    <section className={classes.sectionForm}>
      {error && <p>{error}</p>}
      {login && (
        <div>
          <p className={classes.sendMessage}>Hello, {user.name}</p>
          <button className={classes.button} onClick={closeHandler}>
            Quit
          </button>
        </div>
      )}
      {!error && !login && (
        <form onSubmit={loginFormHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" ref={emailInput} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" ref={passwordInput} />
          </div>
          {wrongData && <p className={classes.sendMessage}>Wrong password or login</p>}
          <button className={classes.button}>Login</button>
        </form>
      )}
    </section>
  );
};

export default Auth;
