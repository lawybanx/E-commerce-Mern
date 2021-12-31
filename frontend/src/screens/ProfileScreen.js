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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [userInfo, user, dispatch, navigate]);

  const formData = { name, email, password };
  const submitHandler = e => {
    e.preventDefault();
    if (password === password2) {
      dispatch(updateUserProfile(formData));
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
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
              onChange={e => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name='email'
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              name='password'
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='mb-3' controlId='password2'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              name='password2'
              type='password'
              placeholder='Confirm Password'
              value={password2}
              onChange={e => setPassword2(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
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
