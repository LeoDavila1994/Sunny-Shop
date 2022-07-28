import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/';
import { useNavigate } from 'react-router-dom';
import { getProductsThunk, setProducts } from "../store/slices/products.slice";




const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [categorys, setCategorys] = useState([]);

    useEffect(() => {
        dispatch(getProductsThunk());
        axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products/categories")
            .then(res => setCategorys(res.data.data.categories))
    }, []);

    const products = useSelector(state => state.products);

    const productDetail = (id) => {
        navigate(`/product/${id}`)
    }

    const filterCatego = e => {
        const productList = products;
        const results = productList.filter(cb);
        function cb(product) {
            return product.category.name === e.target.value;
        }
        dispatch(setProducts(results));
    }


    return (
        <section>
            <div className='select-container'>
            <input type="text" placeholder='Search your favorite product here !' />
                <select onChange={filterCatego}>
                    <option value="">Category</option>
                    {categorys.map(category => (
                        <option value={category.name} key={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
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