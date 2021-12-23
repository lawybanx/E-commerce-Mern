import { Col, Image, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CartScreen = () => {
  const { cartItems } = useSelector(state => state.cart);

  return (
    <Row>
      {cartItems.map(item => (
        <>
          <Col key={item._id}>
            <Image src={item.image} alt={item.name} />
          </Col>
          <Col>{item.name}</Col>
          <Col>{item.price}</Col>
        </>
      ))}
    </Row>
  );
};

export default CartScreen;
