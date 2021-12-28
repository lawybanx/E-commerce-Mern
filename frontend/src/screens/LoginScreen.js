import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { loginUser } from '../actions/user';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { search } = useLocation();

  const redirect = search ? search.split('=')[1] : '/';

  const { userInfo, loading, error } = useSelector(state => state.userLogin);

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();

    dispatch(loginUser(formData));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
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

        <Button type='submit' variant='primary'>
          Sign In
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register now
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
