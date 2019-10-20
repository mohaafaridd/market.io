import React from 'react';

const Register = () => {
  return (
    <section>
      <h3>Register</h3>

      <form>
        <div className='form-group'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' required />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' required />
        </div>
        <div className='form-group'>
          <label htmlFor='phone'>Phone</label>
          <input type='phone' name='phone' id='phone' required />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' required />
        </div>

        <input type='submit' value='Register' />
      </form>
    </section>
  );
};

export default Register;
