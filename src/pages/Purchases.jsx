import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { purchasesThunk } from "../store/slices/purchases.slice"

const Purchases = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const purchases = useSelector(state => state.purchases.data?.purchases);

    useEffect(() => {
        dispatch(purchasesThunk())
    }, []);

    const [indexOne, setIndexOne] = useState(0);
    const [indexTwo, setIndexTwo] = useState(10);
    const lastPurchase = purchases?.length;

    const prev = () => {
        setIndexOne(indexOne - 10);
        setIndexTwo(indexTwo - 10);
        window.scrollTo(0, 0)
    }

    const next = () => {
        setIndexOne(indexOne + 10);
        setIndexTwo(indexTwo + 10);
        window.scrollTo(0, 0)
    }

    const arr = purchases?.slice(indexOne, indexTwo);

    return (
        <section>
            <div className='purchases-container'>
                {arr?.map(purchase => (
                    <div className='purchases-info' key={purchase.id} onClick={()=> navigate(`/purchases/${purchase.id}`)}>
                        <p><strong>Id : </strong> {purchase.id}.</p>
                        <p><strong>Date :</strong> {purchase.createdAt}.</p>
                        <p><strong>Products :</strong> {purchase.cart.products[0]?.title} ... {purchase.cart.products.length} +.</p>
                    </div>
                ))}
            </div>
            <div className='purch-btn-cont'>
                <button className='purch-btn' onClick={prev} disabled={indexOne === 0}>
                    <i className="fa-solid fa-circle-chevron-left"></i>
                </button>
                <button className='purch-btn' onClick={next} disabled={indexTwo >= lastPurchase}>
                    <i className="fa-solid fa-circle-chevron-right"></i>
                </button>
            </div>
        </section>
    );
};

export default Purchases;