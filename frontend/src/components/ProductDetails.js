import { useState } from 'react';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  FormControl,
} from 'react-bootstrap';
import Rating from '../components/Rating';

const ProductDetails = ({
  product: {
    name,
    image,
    price,
    rating,
    numReviews,
    description,
    countInStock,
  },
  addToCartHandler,
}) => {
  const [qty, setQty] = useState(0);

  return (
    <>
      <Row>
        <Col md={6} className='product-page-section'>
          <Image src={image} alt={name} fluid />
        </Col>
        <Col md={3} className='product-page-section'>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating value={rating} text={`${numReviews} reviews`} />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${price}</ListGroup.Item>
            <ListGroup.Item>Description: {description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3} className='product-page-section'>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>{countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                </Row>
              </ListGroup.Item>
              {countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <FormControl
                        as='select'
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </FormControl>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  onClick={() => addToCartHandler(qty)}
                  className='btn-block'
                  type='button'
                  disabled={countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;
