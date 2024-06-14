import React, { useState } from 'react';
import './AddProduct.css';
import upload_area from '../../assets/upload.png';

const AddProduct = () => {

    const [image, setImage] = useState(null);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "women",
        new_price: "",
        old_price: ""
    });

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    };

    const changeHandler = (e) => {
        setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
    };

    const Add_Product = async () => {
        let formData = new FormData();
        formData.append('product', image);
        
        try {
            const response = await fetch('/upload', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            
            if (responseData.success) {
                const updatedProductDetails = { ...productDetails, image: responseData.image_url };
                setProductDetails(updatedProductDetails);
                console.log("product details:", updatedProductDetails);
                await fetch(`https://mern-ecommerce-jfed.onrender.com/addproduct`,{
                  method:'POST',
                  headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                  },
                  body:JSON.stringify(updatedProductDetails),
                }).then((resp)=>resp.json()).then((data)=>{
                  data.success?alert("Product Added"):alert("Failed")
                })
            } else {
                console.error('Upload failed:', responseData.message);
            }
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    };

    return (
        <div className='add-product'>
            <div className="addproduct-itemfield">
                <p>Product title</p>
                <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
                <div className="addproduct-price">
                    <div className="addproduct-itemfield">
                        <p>Price</p>
                        <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Type here' />
                    </div>
                    <div className="addproduct-itemfield">
                        <p>Offer Price</p>
                        <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Type here' />
                    </div>
                </div>
                <div className="addproduct-itemfield">
                    <p>Product Category</p>
                    <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                        <option value="women">Women</option>
                        <option value="men">Men</option>
                        <option value="kid">Kid</option>
                    </select>
                </div>
                <div className="addproduct-itemfield">
                    <label htmlFor="file-input">
                        <img src={image ? URL.createObjectURL(image) : upload_area} className='addproduct-thumbnail-img' alt="" />
                    </label>
                    <input onChange={imageHandler} type="file" name="image" id='file-input' hidden />
                </div>
                <button onClick={Add_Product} className='addproduct-btn'>ADD</button>
            </div>
        </div>
    );
};

export default AddProduct;
