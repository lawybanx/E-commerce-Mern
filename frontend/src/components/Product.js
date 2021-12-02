import { Card } from 'react-bootstrap';

const Product = ({
  product: { _id, name, image, price, rating, numReviews },
}) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/products/${_id}`}>
        <Card.Img src={image} variant='top' />
      </a>

      <Card.Body>
        <a href={`/products/${_id}`}>
          <Card.Title as='div'>
            <strong>{name}</strong>
          </Card.Title>
        </a>

        <Card.Text as='div'>
          <div className='my-3 p-3 rounded'>
            {rating} from {numReviews} reviews
          </div>
        </Card.Text>

        <Card.Text as='h3'>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
