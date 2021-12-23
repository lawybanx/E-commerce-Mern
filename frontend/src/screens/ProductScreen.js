import { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/product';
import ProductDetails from '../components/ProductDetails';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { addToCart } from '../actions/cart';

const ProductScreen = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  const { loading, error, product } = useSelector(
    state => state.productDetails
  );

  const addToCartHandler = qty => {
    navigate(`/cart/${id}?qty=${qty}`);
    dispatch(addToCart(id,qty));
  };

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
        <ProductDetails product={product} addToCartHandler={addToCartHandler} />
      )}
    </>
  );
};

export default ProductScreen;
