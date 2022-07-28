import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({})

    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
            .then(res => setProduct(res.data.data.product))
    }, []);

    return (
        <section>
            <div className='data-container'>
                <div className='data-title'>
                    <p>{product.title}</p>
                </div>
                <div className='category-container'>
                    <p>Category: {product.category}.</p>
                    <p>Id: {product.id}.</p>
                </div>
                <div className='data-img'>
                    <img src={product.productImgs} alt="" />
                </div>
                <div className='price-container'>
                    <p>${product.price} usd</p>
                </div>
                <div className='description-container'>
                    <p>{product.description}</p>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;