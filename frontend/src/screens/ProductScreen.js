import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/product';
import ProductDetails from '../components/ProductDetails';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  return (
    <>
      <Link to='/'>
        <Button className='my-3' variant='light'>
          Go back
        </Button>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <ProductDetails product={product} />
      )}
    </>
  );
};

export default ProductScreen;
