import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCartThunk } from "../store/slices/cart.slice";
import { useSelector } from "react-redux";


const NavBar = () => {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCartThunk())
    },[]);

    const products = useSelector(state => state?.cart.data?.cart.products);

    return (
        <section>
            <div className='nav-container'>
                <nav>
                    <div className='logo'>
                        <Link to="/" className='link-logo'><i className="fa-solid fa-microchip logo"></i><p>SUNNY</p></Link>
                    </div>
                    <div className='icon-container'>
                        <Link to="/login"><i className="fa-solid fa-user"></i></Link>
                        <Link to="/purchases"><i className="fa-solid fa-wallet"></i></Link>
                        <input type="checkbox" className="car-shop-input" id="sidebar"/>
                        <label className='btn-carshop' htmlFor="sidebar"><i className="fa-solid fa-cart-shopping"></i></label>
                        <div className="sidebar">
                            <div className="x">
                                <label htmlFor="sidebar"><i className="fa-solid fa-xmark x-icon"></i></label>
                            </div>
                            <div className="products-side-contain">
                                {products?.map(product => (
                                    <div className="product-card" key={product.id} >
                                        <label onClick={() => navigate(`/product/${product.productsInCart.productId}`)} htmlFor="sidebar"><p className="redirection">{product.title}</p></label>
                                        <p>$ {product.price} usd</p>
                                        <div className="quantity-display">
                                            <button>-</button>
                                            <p>{product.productsInCart.quantity}</p>
                                            <button>+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </section>
    );
};

export default NavBar;