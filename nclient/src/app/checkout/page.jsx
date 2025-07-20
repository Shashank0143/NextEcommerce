"use client"
import React, { useContext, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { IoBagCheckOutline } from "react-icons/io5";

import { MyContext } from '@/context/ThemeContext';

import { useRouter } from 'next/navigation';
import { fetchDataFromApi, postData, deleteData } from '@/utils/api';
import Script from 'next/script';
import { indexedDBLocalPersistence } from 'firebase/auth';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Checkout = () => {

  const [formFields, setFormFields] = useState({
    fullName: "",
    country: "",
    streetAddressLine1: "",
    streetAddressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    email: ""
  })

  const [errors, setErrors] = useState({});

  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState();
  const [paymentMethod, setPaymentMethod] = useState("online"); // Default is online

  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.overflow = "auto";
    const user = JSON.parse(localStorage.getItem("user"));
    fetchDataFromApi(`/api/cart?userId=${user?.userId}`).then((res) => {
      setCartData(res);

      setTotalAmount(res.length !== 0 &&
        res.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0))


    })

  }, []);

  const onChangeInput = (e) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });

    // Remove error when user starts typing
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };
  const context = useContext(MyContext);
  const history = useRouter();

  const checkout = (e) => {
    e.preventDefault();

    // console.log(cartData);

    // console.log(formFields);

    const newErrors = {};

    if (!formFields.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!formFields.country.trim()) newErrors.country = "Country is required";
    if (!formFields.streetAddressLine1.trim()) newErrors.streetAddressLine1 = "Street Address is required";
    if (!formFields.city.trim()) newErrors.city = "City is required";
    if (!formFields.state.trim()) newErrors.state = "State is required";
    if (!formFields.zipCode.trim()) newErrors.zipCode = "Zip Code is required";
    if (!formFields.phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required";
    if (!formFields.email.trim()) newErrors.email = "Email is required";

     // If errors exist, update state and prevent form submission
     if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('Please fill all required fields!');
      return;
    }

    setErrors({}); // Clear errors if all fields are filled

    const user = JSON.parse(localStorage.getItem("user"));
    const addressInfo = {
      name: formFields.fullName,
      phoneNumber: formFields.phoneNumber,
      address: formFields.streetAddressLine1 + formFields.streetAddressLine2,
      pincode: formFields.zipCode,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    const payLoad = {
      name: addressInfo.name,
      phoneNumber: formFields.phoneNumber,
      address: addressInfo.address,
      pincode: addressInfo.pincode,
      amount: parseInt(totalAmount),
      paymentId: paymentMethod === "cod" ? "COD" : "",
      email: user.email,
      userid: user.userId,
      products: cartData.map((item) => ({
        productId: item.productId,
        productTitle: item.productTitle,
        image: item.image,
        quantity: item.quantity,
        price: item.price,
        size: item.size || null,
        customMeasurements: item.customMeasurements || null,
        subTotal: item.subTotal,
      })),
      date: addressInfo?.date,
      paymentMethod: paymentMethod, // COD or Online
    };

    if (paymentMethod === "cod") {
      // COD Order Processing
      postData(`/api/orders/create`, payLoad).then((res) => {
        cartData.forEach((item) => {
          deleteData(`/api/cart/${item?.id}`).then(() => {});
        });
        setTimeout(() => {
          context.getCartData();
        }, 1000);
        history.push("/orders");
      });
    } else {
      // Online Payment Processing (Razorpay)
      var options = {
        key: process.env.NEXT_PUBLIC_APP_RAZORPAY_KEY_ID,
        key_secret: process.env.NEXT_PUBLIC_APP_RAZORPAY_KEY_SECRET,
        amount: parseInt(totalAmount * 100),
        currency: "INR",
        name: "P&H by Priyanshu",
        description: "Order Payment",
        order_receipt: "order_rcptid_" + formFields.fullName,
        handler: function (response) {
          payLoad.paymentId = response.razorpay_payment_id;
          postData(`/api/orders/create`, payLoad).then(() => {
            cartData.forEach((item) => {
              deleteData(`/api/cart/${item?.id}`).then(() => {});
            });
            setTimeout(() => {
              context.getCartData();
            }, 1000);
            history.push("/orders");
          });
        },
        theme: { color: "#3399cc" },
      };
      // console.log(options)
      var pay = new window.Razorpay(options);
      
      pay.open();
    }

    var pay = new window.Razorpay(options);
    pay.open();

    window.addEventListener("popstate", () => {
      document.body.style.overflow = "auto";
    });
  };

  return (
    <>
      <section className='section'>
        <div className='container'>
          <form className='checkoutForm' onSubmit={checkout}>
            <div className='row'>
              <div className='col-md-8'>
                <h2 className='hd'>BILLING DETAILS</h2>

                <div className='row mt-3'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <TextField label="Full Name *" variant="outlined" className='w-100' size="small" name="fullName" onChange={onChangeInput} error={!!errors.fullName} helperText={errors.fullName} />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group'>
                      <TextField label="Country *" variant="outlined" className='w-100' size="small" name="country" onChange={onChangeInput} error={!!errors.country}  helperText={errors.country} />
                    </div>
                  </div>


                </div>


                <h6>Street address *</h6>

                <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <TextField label="House number and street name" variant="outlined" className='w-100' size="small" name="streetAddressLine1" onChange={onChangeInput} error={!!errors.streetAddressLine1} helperText={errors.streetAddressLine1} />
                    </div>

                  </div>
                </div>



                <h6>Town / City *</h6>

                <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <TextField label="City" variant="outlined" className='w-100' size="small" name="city" onChange={onChangeInput} error={!!errors.city} helperText={errors.city} />
                    </div>

                  </div>
                </div>

                <h6>State / County *</h6>

                <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <TextField label="State" variant="outlined" className='w-100' size="small" name="state" onChange={onChangeInput} error={!!errors.state} helperText={errors.state} />
                    </div>

                  </div>
                </div>


                <h6>Postcode / ZIP *</h6>

                <div className='row'>
                  <div className='col-md-12'>
                    <div className='form-group'>
                      <TextField label="ZIP Code" variant="outlined" className='w-100' size="small" name="zipCode" onChange={onChangeInput} error={!!errors.zipCode} helperText={errors.zipCode} />
                    </div>

                  </div>
                </div>


                <div className='row'>
                  <div className='col-md-6'>
                    <div className='form-group'>
                      <TextField label="Phone Number" variant="outlined" className='w-100' size="small" name="phoneNumber" onChange={onChangeInput} error={!!errors.phoneNumber} helperText={errors.phoneNumber} />
                    </div>
                  </div>

                  <div className='col-md-6'>
                    <div className='form-group'>
                      <TextField label="Email Address" variant="outlined" className='w-100' size="small" name="email" onChange={onChangeInput} error={!!errors.email} helperText={errors.email} />
                    </div>
                  </div>

                </div>


              </div>

              <div className='col-md-4'>
                <div className='card orderInfo'>
                  <h4 className='hd'>YOUR ORDER</h4>
                  <div className='table-responsive mt-3'>
                    <table className='table table-borderless'>
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Subtotal</th>
                        </tr>
                      </thead>

                      <tbody>
                        {
                          cartData?.length !== 0 && cartData?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item?.productTitle?.substr(0, 20) + '...'}  <b>× {item?.quantity}</b></td>

                                <td>

                                  {
                                    item?.subTotal?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                                  }

                                </td>
                              </tr>

                            )
                          })
                        }



                        <tr>
                          <td>Subtotal </td>

                          <td>

                            {
                              (cartData?.length !== 0 ?
                                cartData?.map(item => parseInt(item.price) * item.quantity).reduce((total, value) => total + value, 0) : 0)?.toLocaleString('en-US', { style: 'currency', currency: 'INR' })
                            }


                          </td>
                        </tr>


                      </tbody>
                    </table>
                  </div>
                  {/* Payment Method Selection */}
                  <FormControl component="fieldset" className="mt-3">
                    <FormLabel component="legend">Select Payment Method</FormLabel>
                    <RadioGroup value={paymentMethod} onChange={handlePaymentChange} row>
                      <FormControlLabel value="online" control={<Radio />} label="Online Payment" />
                      <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery" />
                    </RadioGroup>
                  </FormControl>

                  <Button type="submit" className='btn-blue bg-red btn-lg btn-big'
                  ><IoBagCheckOutline /> &nbsp; Checkout</Button>

                </div>
              </div>


            </div>
          </form>
        </div>
      </section>
      <ToastContainer/>

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  )
}

export default Checkout;