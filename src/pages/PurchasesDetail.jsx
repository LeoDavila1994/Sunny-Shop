import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProductsThunk, } from '../store/slices/products.slice';
import { purchasesThunk } from '../store/slices/purchases.slice';

const PurchasesDetail = () => {

    const dispatch = useDispatch();
    const purchases = useSelector(state => state.purchases.data?.purchases);
    const { id } = useParams();
    const [ purchData, setPurchData ] = useState({});



    useEffect(() => {
        const findPurch = purchases?.find(purchase => purchase.id === Number(id));
        setPurchData(findPurch);
    },[purchases]);

    useEffect(() => {
        dispatch(purchasesThunk())
    },[])

    return (
        <section>
            <div className='purch-detail-cont'>
                <div className='purch-det-inf'>
                    <div className='id-cont'>
                        <p><strong>Id :</strong> {purchData?.id}.</p>
                        <p><strong>Date :</strong> {purchData?.createdAt}.</p>
                    </div>
                    <div>
                        {purchData?.cart?.products.map(inf => (
                            <div key={inf.id} className="inf-by-product">
                                <div>
                                    <p><strong>Brand :</strong></p>
                                    <p>{inf.brand}.</p>
                                    <p><strong>Title :</strong></p>
                                    <p>{inf.title}.</p>
                                    <p><strong>Price : </strong></p>
                                    <p>${inf.price} usd.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PurchasesDetail;