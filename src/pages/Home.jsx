import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux/';
import { useNavigate } from 'react-router-dom';
import { getProductsThunk } from "../store/slices/products.slice";



const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductsThunk())
    }, []);

    const products = useSelector(state => state.products);

    const productDetail = (id) => {
        navigate(`/product/${id}`)
    }

    return (
        <section>
            <div className='card-container'>
                {products.map(product => (
                    <div className='card-info' key={product.id} onClick={() => productDetail(product.id)}>
                        <div className='card-img'>
                            <img src={product.productImgs[0]} alt="product" />
                        </div>
                        <div className='product-info'>
                            <p><strong>{product.title}</strong></p>
                            <p>${product.price} usd</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Home;