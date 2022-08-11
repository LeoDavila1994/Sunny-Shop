import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { addProductsThunk } from '../store/slices/cart.slice';
import { getProductsThunk } from '../store/slices/products.slice';

const ProductDetail = () => {

    const { id } = useParams();
    const [numberSlider, setNumberSlider] = useState(0);
    const similarProducts = useSelector(state => state.products);
    const [indexOne, setIndexOne] = useState(0);
    const [indexTwo, setIndexTwo] = useState(2);
    const dispatch = useDispatch();

    const [ productDetail, setProductDetail ] = useState({});
    const [ suggestedProducts, setSuggestedProducts ] = useState([]);

    useEffect(() => {
        const prod = similarProducts.find(productItem => productItem.id === Number(id));
        setProductDetail(prod);
        const filteredProducts = similarProducts.filter(product => product.category.id === prod.category.id);
        setSuggestedProducts(filteredProducts);
        window.scrollTo(0, 0)
    },[similarProducts]);

    useEffect(() => {
        dispatch(getProductsThunk());
    },[id]);

    const lastProduct = suggestedProducts.length;

    const prev = () => {
        setIndexOne(indexOne - 1);
        setIndexTwo(indexTwo - 1);
    }

    const next = () => {
        setIndexOne(indexOne + 1);
        setIndexTwo(indexTwo + 1);
    }

    const arr = suggestedProducts.slice(indexOne, indexTwo);


    const rigth = () => {
        if (numberSlider === 0) {
            setNumberSlider(1);
        } else if (numberSlider === 1) {
            setNumberSlider(2);
        } else if (numberSlider === 2) {
            setNumberSlider(0)
        }
    }

    const left = () => {
        if (numberSlider === 0) {
            setNumberSlider(2);
        } else if (numberSlider === 2) {
            setNumberSlider(1);
        } else if (numberSlider === 1) {
            setNumberSlider(0)
        }
    }

    const seeProduct = (id) => {
        const prod = similarProducts.find(productItem => productItem.id === Number(id));
        setProductDetail(prod);
        setIndexOne(0);
        setIndexTwo(2);
        setNumberSlider(0);
        window.scrollTo(0, 0)
    };

    const [quantity, setQuantity] = useState(1);

    const less = () => {
        setQuantity(quantity - 1)
    }

    const more = () => {
        setQuantity(quantity + 1)
    }


    const addProduct = () => {
        const add = {
            id: productDetail.id,
            quantity: quantity
        }

        dispatch(addProductsThunk(add))
    }

    return (
        <section>
            <div className='data-container'>
                <div className='data-title'>
                    <p>{productDetail?.title}</p>
                </div>
                <div className='category-container'>
                    <p>Category: {productDetail?.category?.name}.</p>
                    <p>Id: {productDetail?.id}.</p>
                </div>
                <div>
                    <div className='data-img-container'>
                        <div className='data-img'>
                            <img src={productDetail?.productImgs?.[`${numberSlider}`]} alt="" />
                        </div>
                        <div className='left-arrow' onClick={left}>
                            <i className="fa-solid fa-circle-chevron-left"></i>
                        </div>
                        <div className='rigth-arrow' onClick={rigth}>
                            <i className="fa-solid fa-circle-chevron-right"></i>
                        </div>
                    </div>
                </div>
                <div className='price-container'>
                    <p>${productDetail?.price} usd</p>
                </div>
                <div>
                    <div className='quantity-product'>
                        <button onClick={less} disabled={quantity === 1}>-</button>
                        <p>{quantity}</p>
                        <button onClick={more}>+</button>
                    </div>
                    <button className='btn-toadd' onClick={addProduct}>Add to Cart +</button>
                </div>
                <div className='description-container'>
                    <p>{productDetail?.description}</p>
                </div>
                <div className='section-2'>
                    <p>Discover similar items:</p>
                </div>
                <div className='similar-products'>
                    <button className='left-arrow-mini' onClick={prev} disabled={indexOne === 0}>
                        <i className="fa-solid fa-circle-chevron-left"></i>
                    </button>
                    <button className='rigth-arrow-mini' onClick={next} disabled={indexTwo >= lastProduct}>
                        <i className="fa-solid fa-circle-chevron-right"></i>
                    </button>
                    {arr.map(similar => (
                        <div className='mini-card' key={similar.id} onClick={()=> seeProduct(similar.id)}>
                            <div className='img-mini-card'>
                                <img src={similar.productImgs[0]} alt="" />
                            </div>
                            <div className='info-minicard'>
                                <p>{similar.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;