import { Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';

const OrderScreen = () => {
  const dispatch = useDispatch();

  const { cartItems, shippingAddress, paymentMethod } = useSelector(
    state => state.cart
  );

  const { address, city, postalCode, country } = shippingAddress;

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {address}, {city} {postalCode}, {country}.
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <strong>Method: </strong>
              {paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>Items</ListGroup.Item>
              <ListGroup.Item>Shipping</ListGroup.Item>
              <ListGroup.Item>Tax</ListGroup.Item>
              <ListGroup.Item>Total</ListGroup.Item>
              <ListGroup.Item></ListGroup.Item>
              <ListGroup.Item>
                <Button type='button' className='btn-block'>
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
