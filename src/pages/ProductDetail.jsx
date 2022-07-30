import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from "react-router-dom";

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({})
    const [numberSlider, setNumberSlider] = useState(0);
    const similarProducts = useSelector(state => state.products);
    const [prevPage, setPrevPage] = useState(3);
    const [nextPage, setNextPage] = useState(6);

    useEffect(() => {
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
            .then(res => setProduct(res.data.data.product))
            window.scrollTo(0, 0)
    }, []);

    const lastProduct = similarProducts.length;
    const firstProduct = 0;

    const prev = () => {
        setPrevPage(prevPage - 1);
        setNextPage(nextPage - 1);
    }

    const next = () => {
        setPrevPage(prevPage + 1);
        setNextPage(nextPage + 1);
    }

    const arr = similarProducts.slice(prevPage, nextPage);


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
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/${id}`)
            .then(res => setProduct(res.data.data.product))
            window.scrollTo(0, 0)
    }

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
                <div>
                    <div className='data-img-container'>
                        <div className='data-img'>
                            <img src={product.productImgs?.[`${numberSlider}`]} alt="" />
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
                    <p>${product.price} usd</p>
                </div>
                <div className='description-container'>
                    <p>{product.description}</p>
                </div>
                <div className='section-2'>
                    <p>Discover similar items:</p>
                </div>
                <div className='similar-products'>
                    <button className='left-arrow-mini' onClick={prev} disabled={prevPage === firstProduct}>
                        <i className="fa-solid fa-circle-chevron-left"></i>
                    </button>
                    <button className='rigth-arrow-mini' onClick={next} disabled={nextPage === lastProduct}>
                        <i className="fa-solid fa-circle-chevron-right"></i>
                    </button>
                    {arr.map(similar => (
                        <div className='mini-card' key={similar.id} onClick={() => seeProduct(similar.id)}>
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