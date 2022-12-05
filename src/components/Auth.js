import classes from './Auth.module.css';

const Auth = () => {
  const loginFormHandler = (e) => {
    e.preventDefault()
  }

  return (
      <section className={classes.sectionForm}>
        <form onSubmit={loginFormHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email:</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password:</label>
            <input type='password' id='password' />
          </div>
          <button className={classes.button}>Login</button>
        </form>
      </section>
  );
};

export default Auth;
