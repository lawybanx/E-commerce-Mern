import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/user';

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.user);

  const { user, loading, error } = useSelector(state => state.userDetails);

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

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setFormData({ name: user.name, email: user.email });
      }
    }
  }, [userInfo, user, dispatch, navigate]);

  const submitHandler = e => {
    e.preventDefault();
    if (password === password2) {
      dispatch(updateUserProfile(formData));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h1>Update profile</h1>
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
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
