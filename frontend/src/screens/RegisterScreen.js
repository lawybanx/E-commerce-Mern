import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { registerUser } from '../actions/user';

const RegisterScreen = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { search } = useLocation();

  const redirect = search ? search.split('=')[1] : '/';

  const { userInfo, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    password === password2 && dispatch(registerUser(formData));
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {password !== password2 && (
        <Message variant='danger'>Passwords do not match</Message>
      )}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='name'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            name='name'
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={e => onChange(e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            name='email'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={e => onChange(e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            name='password'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={e => onChange(e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='password2'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            name='password2'
            type='password'
            placeholder='Confirm Password'
            value={password2}
            onChange={e => onChange(e)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Sign in
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
