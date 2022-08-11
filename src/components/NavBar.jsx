import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getCartThunk } from "../store/slices/cart.slice";
import { useSelector } from "react-redux";


const NavBar = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCartThunk())
    }, []);

    const [isVisible, setIsVisible] = useState(false);

    const showSideBar = () => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsVisible(!isVisible);
        } else {
            navigate("/login")
        }
    }

    const products = useSelector(state => state?.cart.data?.cart.products);

    const getTotal = () => {
        let total = 0;

        products?.forEach(product =>{
            total += Number(product.price)
        })

        return total;
    }

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
                        <button className='btn-carshop' onClick={showSideBar}><i className="fa-solid fa-cart-shopping"></i></button>
                    </div>
                </nav>
                {isVisible &&
                    <div className="sidebar">
                        <div className="x">
                            <div onClick={showSideBar}><i className="fa-solid fa-xmark x-icon"></i></div>
                        </div>
                        <div className="products-side-contain">
                            {products?.map(product => (
                                <div className="product-card" key={product.id} >
                                    <label onClick={() => navigate(`/product/${product.productsInCart.productId}`)} htmlFor="sidebar"><p className="redirection">{product.title}</p></label>
                                    <p>$ {product.price} usd</p>
                                    <div className="quantity-display">
                                        <p>x{product.productsInCart.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="total">
                            <p>Total: $ {getTotal()} usd.</p>
                        </div>
                        <div className="checkout">
                            <p>Check Out</p>
                        </div>
                    </div>
                }
            </div>
        </section>
    );
};

export default NavBar;