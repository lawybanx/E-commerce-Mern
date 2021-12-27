import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../actions/user';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    dispatch(loginUser(formData));
  };

  return (
    <form className='form' onSubmit={e => onSubmit(e)}>
      <div className='form-group'>
        <input
          type='email'
          placeholder='Email Address'
          name='email'
          value={email}
          onChange={e => onChange(e)}
          required
        />
      </div>
      <div className='form-group'>
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={e => onChange(e)}
        />
      </div>
      <input type='submit' className='btn btn-primary' value='Login' />
    </form>
  );
};

export default LoginScreen;
