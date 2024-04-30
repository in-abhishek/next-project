import React from 'react'

const ProductList = async () => {
    const data = await fetch('http://localhost:3000/api/user')
    const response = await data.json();
    console.log("response>>>>", response)
    return response;
}

const Product = async () => {
    let producte = await ProductList();
    console.log("products->>>", producte)
    return (
        <div className="all-product">
            {
                producte.map((item, index) => {
                    return (
                        <div className="product" key={index}>
                            <div className="single-product">
                                <div className="product-image">
                                    <img src={item?.image} id={item?.id} />
                                    <span className="ratings">{item?.rating?.rate}</span>
                                </div>
                                <div className="product-content">
                                    <h3>{item?.title}</h3>
                                    <div className="product-rating">
                                        <div className="span-ratings">
                                            <p>Price: <span>{item?.price}</span></p>
                                        </div>
                                        <div className="span-ratings">
                                            <p>Category: <span>{item?.category}</span></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Product