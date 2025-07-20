"use client"
import ProductZoom from '@/Components/ProductZoom';
import Rating from '@mui/material/Rating';
import QuantityBox from '@/Components/QuantityBox';
import Button from '@mui/material/Button';
import { BsCartFill } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineCompareArrows } from "react-icons/md";
import Tooltip from '@mui/material/Tooltip';
import RelatedProducts from "./RelatedProducts";

import CircularProgress from '@mui/material/CircularProgress';
import { MyContext } from "@/context/ThemeContext";
import { FaHeart } from "react-icons/fa";
import { fetchDataFromApi, postData } from "@/utils/api";
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import MetaData from '@/Metadata';


const ProductDetails = ({ params }) => {

    const [activeSize, setActiveSize] = useState(null);
    const [activeTabs, setActiveTabs] = useState(0);
    const [productData, setProductData] = useState([]);
    const [relatedProductData, setRelatedProductData] = useState([]);
    const [recentlyViewdProducts, setRecentlyViewdProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [reviewsData, setreviewsData] = useState([]);
    const [isAddedToMyList, setSsAddedToMyList] = useState(false);

    let [cartFields, setCartFields] = useState({});
    let [productQuantity, setProductQuantity] = useState();
    const [tabError, setTabError] = useState(false);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isCustomTailoredSelected, setIsCustomTailoredSelected] = useState(false);
    const [customMeasurements, setCustomMeasurements] = useState({
        length: "",
        shoulder: "",
        chest: "",
        stomach: "",
        sleeves: "",
        hip: "",
        trouserLength: "",
        waist: "",
        trouserHip: "",
        thigh: "",
        knee: "",
        hem: "",
    }); // State for custom measurements


    const id = params.productId;

    const router = useRouter()

    const context = useContext(MyContext);

    const isActive = (index) => {
        setActiveSize(index);
        setTabError(false);
    }


    useEffect(() => {
        window.scrollTo(0, 0);
        setActiveSize(null);
        fetchDataFromApi(`/api/products/${id}`).then((res) => {
            setProductData(res);

            if (res?.productRam.length === 0 && res?.productWeight.length === 0 && res?.size.length === 0) {
                setActiveSize(1);
            }

            fetchDataFromApi(`/api/products?subCatId=${res?.subCatId}`)
                .then((res) => {
                    const filteredData = res?.products?.filter(item => item.id !== id);
                    setRelatedProductData(filteredData)
                })



        })


        fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
            setreviewsData(res)
        })


        const user = JSON.parse(localStorage.getItem("user"));

        fetchDataFromApi(`/api/my-list?productId=${id}&userId=${user?.userId}`).then((res) => {
            if (res.length !== 0) {
                setSsAddedToMyList(true);
            }
        })

    }, [id]);


    const [rating, setRating] = useState(1);
    const [reviews, setReviews] = useState({
        productId: "",
        customerName: "",
        customerId: "",
        review: "",
        customerRating: 0
    });

    const onChangeInput = (e) => {
        setReviews(() => ({
            ...reviews,
            [e.target.name]: e.target.value
        }))
    }

    const changeRating = (e) => {
        setRating(e.target.value)
        reviews.customerRating = e.target.value
    }

    // const addReview = (e) => {
    //     e.preventDefault();

    //     const user = JSON.parse(localStorage.getItem("user"));

    //     reviews.customerName = user?.name;
    //     reviews.customerId = user?.userId;
    //     reviews.productId = id

    //     setIsLoading(true);

    //     postData("/api/productReviews/add", reviews).then((res) => {
    //         setIsLoading(false);

    //         reviews.customerRating = 1;

    //         setReviews({
    //             review: "",
    //             customerRating: 1
    //         })

    //         fetchDataFromApi(`/api/productReviews?productId=${id}`).then((res) => {
    //             setreviewsData(res);
    //         })
    //     })

    // }

    const addReview = async (e) => {
        e.preventDefault();
    
        const user = JSON.parse(localStorage.getItem("user"));
    
        if (!user) {
            // Save current path for redirect after signin
            localStorage.setItem("redirectAfterLogin", window.location.pathname);
            // console.log(window.location.pathname);
            // Redirect to signin page
            router.push("/signin");
            return;
        }
    
        const reviewText = reviews.review.trim() || "No review provided."; // Set default review text
    
        const reviewData = {
            ...reviews,
            review: reviewText,
            customerName: user.name,
            customerId: user.userId,
            productId: id
        };
    
        setIsLoading(true);
    
        try {
            await postData("/api/productReviews/add", reviewData);
    
            setReviews({
                review: "",
                customerRating: 1
            });
    
            // Fetch updated reviews
            const updatedReviews = await fetchDataFromApi(`/api/productReviews?productId=${id}`);
            setreviewsData(updatedReviews);
        } catch (error) {
            console.error("Error submitting review:", error);
        } finally {
            setIsLoading(false);
        }
    };
    

    const quantity = (val) => {
        setProductQuantity(val)
    }

    const addtoCart = () => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            // Save current path for redirect after signin
            localStorage.setItem("redirectAfterLogin", window.location.pathname);
            // console.log(window.location.pathname);
            router.push("/signIn");
            return;
        }

        if (!isCustomTailoredSelected && activeSize === null) {
            alert("Please select a size or enter custom measurements before adding to the cart.");
            return;
        }

        cartFields.productTitle = productData?.name
        cartFields.image = productData?.images[0]
        cartFields.rating = productData?.rating
        cartFields.price = productData?.price
        cartFields.quantity = productQuantity
        cartFields.subTotal = parseInt(productData?.price * productQuantity)
        cartFields.productId = productData?.id
        cartFields.countInStock = productData?.countInStock
        cartFields.userId = user?.userId
        cartFields.size = isCustomTailoredSelected ? null : productData?.size[activeSize]
        cartFields.customMeasurements = isCustomTailoredSelected ? customMeasurements : null

        context.addToCart(cartFields);
        router.push('/cart');
    }

    const selectedItem = () => {

    }



    const gotoReviews = () => {
        window.scrollTo({
            top: 550,
            behavior: 'smooth',
        })

        setActiveTabs(2)
    }



    const addToMyList = (id) => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user !== undefined && user !== null && user !== "") {
            const data = {
                productTitle: productData?.name,
                image: productData?.images[0],
                rating: productData?.rating,
                price: productData?.price,
                productId: id,
                userId: user?.userId
            }
            postData(`/api/my-list/add/`, data).then((res) => {
                if (res.status !== false) {
                    context.setAlertBox({
                        open: true,
                        error: false,
                        msg: "the product added in my list"
                    })


                    fetchDataFromApi(`/api/my-list?productId=${id}&userId=${user?.userId}`).then((res) => {
                        if (res.length !== 0) {
                            setSsAddedToMyList(true);
                        }
                    })


                } else {
                    context.setAlertBox({
                        open: true,
                        error: true,
                        msg: res.msg
                    })
                }

            })
        } else {
            context.setAlertBox({
                open: true,
                error: true,
                msg: "Please Login to continue"
            })
        }

    }

    const handleCustomMeasurementChange = (e) => {
        setCustomMeasurements({
            ...customMeasurements,
            [e.target.name]: e.target.value,
        });
    };

    const handleDialogOpen = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            // Save current path for redirect after signin
            localStorage.setItem("redirectAfterLogin", window.location.pathname);
            router.push("/signIn");
            return;
        }
        setIsDialogOpen(true);
    };

    const handleDialogClose = () => {
        setIsDialogOpen(false);
    };

    const handleDialogSubmit = () => {

        const updatedMeasurements = { ...customMeasurements };

        for (const key in updatedMeasurements) {
            if (updatedMeasurements[key] === "") {
                updatedMeasurements[key] = "N/A";
            }
        }

        // Update the state to ensure the cart has updated measurements
        setCustomMeasurements(updatedMeasurements);
        // Handle form submission logic
        // console.log("Custom Measurements: ", customMeasurements);
        setIsCustomTailoredSelected(true);
        handleDialogClose();
    };


    const getMetaData = (productId) => {
        const metaDataMap = {
            'luxury-womens-2-piece-double-breasted-suit-set': {
                title: "Buy Women’s 2-Piece Double Breasted Suit Online – Luxury Formal Wear",
                description: "Elevate your style with our luxury women’s double-breasted 2-piece suit. Perfect for office & formal occasions. Shop now!",
                keywords: "Buy Women's 2-Piece Double Breasted Suit online",
                url:"https://phbypriyanshu.com/product/luxury-womens-2-piece-double-breasted-suit-set"

            },
            'luxury-double-breasted-blue-suit-for-women': {
                title: "Double-Breasted Blue Suit for Women – Elegant Formal Wear",
                description: "Get this stunning double-breasted blue suit for women. Perfect for office, meetings & formal events. Shop now!",
                keywords: "Double-Breasted Blue Suit for Women",
                url:"https://phbypriyanshu.com/product/luxury-double-breasted-blue-suit-for-women"

            },
            'elegant-blue-double-breasted-velvet-suit': {
                title: "Buy Double-Breasted Velvet Suit mens online",
                description: "Upgrade your wardrobe with this elegant blue double-breasted velvet suit for men. Perfect for weddings & parties. Grab it now!",
                keywords: "Buy Double-Breasted Velvet Suit mens online",
                url:"https://phbypriyanshu.com/product/elegant-blue-double-breasted-velvet-suit"

            },
            'blue-japanese-double-breasted-suit-with-modern-tailored-pants': {
                title: "Buy Japanese Double-Breasted Suit for Men – Modern Tailored Fit",
                description: "Discover this premium blue Japanese double-breasted suit with modern tailored pants. Perfect for stylish formal looks. Shop it now.",
                keywords: "Buy Japanese Double-Breasted Suit for men",
                url:"https://phbypriyanshu.com/product/blue-japanese-double-breasted-suit-with-modern-tailored-pants"

            },
            'black-velvet-tuxedo-blazer': {
                title: "Buy Black Velvet Tuxedo Blazer Online – Premium Wedding Blazer",
                description: "Get this stylish black velvet tuxedo blazer for men. Perfect for weddings, parties & formal events. Shop now!",
                keywords: "Buy Black Velvet Tuxedo Blazer online",
                url:"https://phbypriyanshu.com/product/black-velvet-tuxedo-blazer"

            },
            'peacock-blue-angrakha-blazer': {
                title: "Buy Peacock Blue Angrakha Blazer for Men Online – Stylish Ethnic Wear",
                description: "Elevate your ethnic look with this peacock blue Angrakha blazer for men. Perfect for weddings & festive occasions. Buy Online!",
                keywords: "Buy Peacock Blue Angrakha Blazer for men online",
                url:"https://phbypriyanshu.com/product/peacock-blue-angrakha-blazer"

            },
            
            // Add more categories as needed
            'default': {
                title: "Shop Designer & Trending Suits Online | P & H BY PRIYANSHU",
                description: "P & H by Priyanshu would be your one stop store to buy professional, designer & trending suits online, for men's & women's both.",
                keywords: "Best Designer, Noida best designer, Fashion Designer, Formal dress, Blazers",
                htag: "Category",
                url:`https://phbypriyanshu.com/product/${productId}`
            }
        };

        // Return metadata for specific category or default if category not found
        return metaDataMap[productId] || metaDataMap['default'];
    };

    const metaData = getMetaData(id);

    return (
        <>
        <MetaData title={metaData.title} description={metaData.description} keywords={metaData.keywords} link={metaData.url} />
            {productData?.length === 0 ? (
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{ minHeight: "300px" }}
                >
                    <CircularProgress />
                </div>
            ) :

                <section className="productDetails section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 pl-5 part1">
                                <ProductZoom images={productData?.images} discount={productData?.discount} />
                            </div>

                            <div className="col-md-7 pl-5 pr-5 part2">
                                <h1 className="hd text-capitalize">{productData?.name}</h1>
                                <ul className="list list-inline d-flex align-items-center">
                                    <li className="list-inline-item">
                                        <div className="d-flex align-items-center">
                                            <span className="text-light mr-2">Brands : </span>
                                            <span>{productData?.brand}</span>
                                        </div>
                                    </li>

                                    <li className="list-inline-item">
                                        <div className="d-flex align-items-center">
                                            <Rating name="read-only" value={parseInt(productData?.rating)} precision={0.5} readOnly size="small" />

                                            <span className="text-light cursor ml-2" onClick={gotoReviews}>{reviewsData?.length} Review</span>
                                        </div>
                                    </li>

                                </ul>



                                <div className="d-flex info mb-3">
                                    <span className="oldPrice">Rs: {productData?.oldPrice}</span>
                                    <span className="netPrice text-danger ml-2">Rs: {productData?.price}</span>
                                </div>

                                {
                                    productData?.countInStock >= 1 ?
                                        <span className="badge badge-success">IN STOCK</span>
                                        :
                                        <span className="badge badge-danger">OUT OF STOCK</span>
                                }



                                <p className="mt-3" style={{ whiteSpace: "pre-wrap", padding: "5px" }}>{productData?.description?.slice(0, 250)}...
                                </p>



                                {
                                    productData?.size?.length !== 0 &&
                                    <div className='productSize d-flex align-items-center'>
                                        <span>Size:</span>
                                        <ul className={`list list-inline mb-0 pl-4 ${tabError === true && 'error'}`}>
                                            {
                                                productData?.size?.map((item, index) => {
                                                    return (
                                                        <li key={index} className='list-inline-item'><a className={`tag ${activeSize === index ? 'active' : ''}`} onClick={() => isActive(index)}>{item}</a></li>
                                                    )
                                                })
                                            }

                                        </ul>
                                    </div>
                                }

                                <Button style={{ background: "#4C7383", color: "#fff", marginTop: "5px" }} onClick={handleDialogOpen}>Custom Tailored</Button>

                                <Dialog open={isDialogOpen} onClose={handleDialogClose} fullWidth maxWidth="sm">
                                    <DialogTitle>Custom Measurements</DialogTitle>
                                    <hr />
                                    <DialogTitle>Enter in Inches</DialogTitle>
                                    <DialogContent>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <TextField
                                                    label="Length(लंबाई)"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="length"
                                                    type="number"
                                                    value={customMeasurements.length}
                                                    onChange={handleCustomMeasurementChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <TextField
                                                    label="Shoulder(कंधा)"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="shoulder"
                                                    type="number"
                                                    value={customMeasurements.shoulder}
                                                    onChange={handleCustomMeasurementChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <TextField
                                                    label="Chest(छाती)"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="chest"
                                                    type="number"
                                                    value={customMeasurements.chest}
                                                    onChange={handleCustomMeasurementChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <TextField
                                                    label="Stomach(पेट)"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="stomach"
                                                    type="number"
                                                    value={customMeasurements.stomach}
                                                    onChange={handleCustomMeasurementChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <TextField
                                                    label="Sleeves(आस्तीन)"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="sleeves"
                                                    type="number"
                                                    value={customMeasurements.sleeves}
                                                    onChange={handleCustomMeasurementChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <TextField
                                                    label="Hip"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="hip"
                                                    type="number"
                                                    value={customMeasurements.hip}
                                                    onChange={handleCustomMeasurementChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <TextField
                                                    label="Traousers length(पतलून की लंबाई)"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="trouserLength"
                                                    type="number"
                                                    value={customMeasurements.trouserLength}
                                                    onChange={handleCustomMeasurementChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <TextField
                                                    label="Waist(कमर)"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="waist"
                                                    type="number"
                                                    value={customMeasurements.waist}
                                                    onChange={handleCustomMeasurementChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <TextField
                                                    label="Trouser Hip"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="trouserHip"
                                                    type="number"
                                                    value={customMeasurements.trouserHip}
                                                    onChange={handleCustomMeasurementChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <TextField
                                                    label="Thigh(जाँघ)"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="thigh"
                                                    type="number"
                                                    value={customMeasurements.thigh}
                                                    onChange={handleCustomMeasurementChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <TextField
                                                    label="Knee(घुटना)"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="knee"
                                                    type="number"
                                                    value={customMeasurements.knee}
                                                    onChange={handleCustomMeasurementChange}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <TextField
                                                    label="Hem(मोहरी)"
                                                    variant="outlined"
                                                    fullWidth
                                                    margin="dense"
                                                    name="hem"
                                                    type="number"
                                                    value={customMeasurements.hem}
                                                    onChange={handleCustomMeasurementChange}
                                                />
                                            </div>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleDialogClose}>Cancel</Button>
                                        <Button onClick={handleDialogSubmit} style={{ background: "#4C7383", color: "#fff" }}>
                                            Submit
                                        </Button>
                                    </DialogActions>
                                </Dialog>

                                <div className="d-flex align-items-center mt-3 actions_">
                                    <QuantityBox quantity={quantity} item={productData} selectedItem={selectedItem} value={1} />

                                    <div className="d-flex align-items-center btnActions">
                                        <Button className="btn-blue btn-lg btn-big btn-round bg-red" onClick={() => addtoCart()}>
                                            <BsCartFill /> &nbsp;
                                            {
                                                context.addingInCart === true ? "adding..." : " Add to cart"
                                            }

                                        </Button>

                                        <Tooltip title={`${isAddedToMyList === true ? 'Added to Wishlist' : 'Add to Wishlist'}`} placement="top">
                                            <Button className={`btn-blue btn-lg btn-big btn-circle ml-4`} onClick={() => addToMyList(id)}>
                                                {
                                                    isAddedToMyList === true ? <FaHeart className="text-danger" />

                                                        :
                                                        <FaRegHeart />
                                                }

                                            </Button>
                                        </Tooltip>

                                        <Tooltip title="Add to Compare" placement="top">
                                            <Button className="btn-blue btn-lg btn-big btn-circle ml-2">
                                                <MdOutlineCompareArrows />
                                            </Button>
                                        </Tooltip>

                                    </div>

                                </div>


                            </div>
                        </div>


                        <br />



                        <div className='card mt-5 p-5 detailsPageTabs'>
                            <div className='customTabs'>
                                <ul className='list list-inline'>
                                    <li className='list-inline-item'>
                                        <Button className={`${activeTabs === 0 && 'active'}`}
                                            onClick={() => {
                                                setActiveTabs(0)
                                            }}
                                        >Description</Button>
                                    </li>
                                    {/* <li className='list-inline-item'>
                                    <Button className={`${activeTabs === 1 && 'active'}`}
                                        onClick={() => {
                                            setActiveTabs(1)

                                        }}
                                    >Additional info</Button>
                                </li> */}
                                    <li className='list-inline-item'>
                                        <Button className={`${activeTabs === 2 && 'active'}`}
                                            onClick={() => {
                                                setActiveTabs(2)

                                            }}
                                        >Reviews ({reviewsData?.length})</Button>
                                    </li>

                                </ul>


                                <br />

                                {
                                    activeTabs === 0 &&
                                    <div className='tabContent' style={{ whiteSpace: "pre-wrap", padding: "5px" }}>
                                        {productData?.description}
                                    </div>

                                }

                                {
                                    activeTabs === 2 &&

                                    <div className='tabContent'>
                                        <div className='row'>
                                            <div className='col-md-8'>
                                                <h3>Customer questions & answers</h3>
                                                <br />



                                                {
                                                    reviewsData?.length !== 0 && reviewsData?.slice(0)?.reverse()?.map((item, index) => {
                                                        return (
                                                            <div className='reviewBox mb-4 border-bottom' key={index}>

                                                                <div className='info'>
                                                                    <div className='d-flex align-items-center w-100'>
                                                                        <h5>{item?.customerName}</h5>

                                                                        <div className='ml-auto'>
                                                                            <Rating name="half-rating-read"
                                                                                value={item?.customerRating} readOnly size="small" />
                                                                        </div>
                                                                    </div>

                                                                    <h6 className='text-light'>{item?.dateCreated}</h6>

                                                                    <p>{item?.review} </p>
                                                                </div>

                                                            </div>

                                                        )
                                                    })
                                                }



                                                <br className='res-hide' />


                                                <form className='reviewForm' onSubmit={addReview}>

                                                    <h4>Add a review</h4>
                                                    <div className='form-group'>
                                                        <textarea className='form-control shadow' placeholder='Write a Review'
                                                            name='review' value={reviews.review} onChange={onChangeInput} ></textarea>
                                                    </div>

                                                    <div className='row'>

                                                        <div className='col-md-6'>
                                                            <div className='form-group'>
                                                                <Rating name="rating" value={rating} precision={0.5}
                                                                    onChange={changeRating}
                                                                />
                                                            </div>
                                                        </div>

                                                    </div>


                                                    <br />
                                                    <div className='form-group mb-0'>
                                                        <Button type='submit' className='btn-blue btn-lg btn-big btn-round'>
                                                            {isLoading === true ? <CircularProgress color="inherit" className="loader" /> : 'Submit Review'}

                                                        </Button>
                                                    </div>

                                                </form>

                                            </div>


                                        </div>
                                    </div>
                                }




                            </div>
                        </div>


                        <br />

                        {
                            relatedProductData?.length !== 0 && <RelatedProducts title="RELATED PRODUCTS" data={relatedProductData} />
                        }



                    </div>
                </section>


            }
        </>
    )
}

export default ProductDetails;