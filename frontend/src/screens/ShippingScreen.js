import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

const ShippingScreen = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { search } = useLocation();

  const redirect = search ? search.split('=')[1] : '/';

  const { userInfo, loading, error } = useSelector(state => state.user);

  useEffect(() => {
    if (!userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const [formData, setFormData] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const { address, city, postalCode, country } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();

    console.log(formData);
    // dispatch(loginUser(formData));
  };

  return (
    <FormContainer>
      <Row></Row>
      <h1>Shipping</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group className='mb-3' controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            name='address'
            type='text'
            placeholder='Enter address'
            value={address}
            onChange={e => onChange(e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            name='city'
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={e => onChange(e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            name='postalCode'
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            onChange={e => onChange(e)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='mb-3' controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            name='country'
            type='text'
            placeholder='Enter country'
            value={country}
            onChange={e => onChange(e)}
          ></Form.Control>
        </Form.Group>
      </Form>

      <Button type='submit' variant='primary'>
        Continue
      </Button>
    </FormContainer>
  );
};

export default ShippingScreen;
