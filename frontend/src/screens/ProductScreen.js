import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../actions/product';
import ProductDetails from '../components/ProductDetails';

const ProductScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const { product } = useSelector(state => state.product);

  return (
    <>{product === null ? <>Yes</> : <ProductDetails product={product} />}</>
  );
};

export default ProductScreen;