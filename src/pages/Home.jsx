import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux/';
import { useNavigate } from 'react-router-dom';
import { getProductsThunk, selectThunk, filterInputThunk } from "../store/slices/products.slice";




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
    const [inputValue, setInputValue] = useState("");

    const submit = e => {
        e.preventDefault();
        if (inputValue[0] === inputValue[0].toUpperCase() && inputValue[inputValue.length - 1] === inputValue[inputValue.length - 1].toUpperCase()) {
            const toUpp = inputValue.split("");
            let change = "";
            for (let i = 0; i < toUpp.length; i++) {
                if (toUpp[i] != toUpp[i].toUpperCase) {
                    toUpp.splice(i, 1, toUpp[i].toUpperCase());
                    const newWord = toUpp.toString();
                    change = newWord.replace(/,/g, "");
                }
            }
            dispatch(filterInputThunk(change))
        } else if (inputValue[0] === inputValue[0].toLowerCase()) {
            const toUpp = inputValue.split("");
            let change = "";
            for (let i = 0; i < toUpp.length; i++) {
                if (toUpp[0] != toUpp[0].toUpperCase()) {
                    toUpp.splice(0, 1, toUpp[0].toUpperCase());
                    for (let i = 1; i < toUpp.length; i++) {
                        if (toUpp[i] === toUpp[i].toUpperCase()) {
                            toUpp.splice(i, 1, toUpp[i].toLowerCase())
                            const newWord = toUpp.toString();
                            change = newWord.replace(/,/g, "");
                        } else {
                            const newWord = toUpp.toString();
                            change = newWord.replace(/,/g, "");
                        }
                    }
                }
            }
            dispatch(filterInputThunk(change))
        } else {
            const toUpp = inputValue.split("");
            let change = "";
            for (let i = 1; i < toUpp.length; i++) {
                if (toUpp[i] === toUpp[i].toUpperCase()) {
                    toUpp.splice(i, 1, toUpp[i].toLowerCase())
                    const newWord = toUpp.toString();
                    change = newWord.replace(/,/g, "");
                } else {
                    const newWord = toUpp.toString();
                    change = newWord.replace(/,/g, "");
                }
            }
            dispatch(filterInputThunk(change))
        }
    }

    const filterCatego = e => {
        const filt = e.target.value
        dispatch(selectThunk(filt));
    }


    return (
        <section>
            <div className='select-container'>
                <select onChange={filterCatego}>
                    <option value="">All Categorys</option>
                    {categorys.map(category => (
                        <option value={category.id} key={category.id}>{category.name}</option>
                    ))}
                </select>
                <form onSubmit={submit}>
                    <input type="text" placeholder='Search your favorite product' value={inputValue} onChange={e => setInputValue(e.target.value)} />
                    <button className='btn'><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
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