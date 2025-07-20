"use client"
import Sidebar from '@/Components/Sidebar';
import Button from '@mui/material/Button';
import { IoIosMenu } from "react-icons/io";
import { CgMenuGridR } from "react-icons/cg";
import { HiViewGrid } from "react-icons/hi";
import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useEffect, useState } from "react";
import ProductItem from '@/Components/ProductItem';
import Pagination from '@mui/material/Pagination';

import CircularProgress from '@mui/material/CircularProgress';
import { FaFilter } from "react-icons/fa";

import { MyContext } from '@/context/ThemeContext';
import { fetchDataFromApi } from '@/utils/api';
import MetaData from '@/Metadata';

const Listing = ({ params }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [productView, setProductView] = useState('four');
    const [productData, setProductData] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [filterId, setFilterId] = useState("");
    const [isOpenFilter, setIsOpenFilter] = useState(false);

    const openDropdown = Boolean(anchorEl);

    const context = useContext(MyContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const id = "women-suits"

    useEffect(() => {
        window.scrollTo(0, 0);

        let url = window.location.href;
        let apiEndPoint = `/api/products/catSlug?catSlug=${id}&location=${localStorage.getItem("location")}&page=1&perPage=50`;


        setisLoading(true);
        fetchDataFromApi(`${apiEndPoint}`).then((res) => {
            setProductData(res)
            setisLoading(false);
        })
    }, [id]);


    const filterData = (catSlug) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        setFilterId(catSlug)
        setisLoading(true);

        fetchDataFromApi(`/api/products/catSlug?catSlug=${catSlug}&location=${localStorage.getItem("location")}&page=1&perPage=20`).then((res) => {
            setProductData(res);
            setisLoading(false);
        })
    }

    const filterByPrice = (price, catId, subCatId) => {

        setisLoading(true);
        

        if (filterId === "") {
            if (catId !== "" && catId !== null && catId !== undefined) {
                fetchDataFromApi(`/api/products/fiterByPrice?minPrice=${price[0]}&maxPrice=${price[1]}&catId=${catId}&location=${localStorage.getItem("location")}&page=1&perPage=8`).then((res) => {
                    setProductData(res)
                    setisLoading(false);
                    // window.scrollTo({
                    //     top: 0,
                    //     behavior: 'smooth',
                    // })
                })
            }
        }


        if(filterId!==""){
            fetchDataFromApi(`/api/products/fiterByPrice?minPrice=${price[0]}&maxPrice=${price[1]}&catId=${filterId}&location=${localStorage.getItem("location")}&page=1&perPage=8`).then((res) => {
                setProductData(res)
                setisLoading(false);
                // window.scrollTo({
                //     top: 0,
                //     behavior: 'smooth',
                // })
            })
    }

    }

    const filterByRating = (rating, catId, subCatId) => {
        // console.log(catId, subCatId)
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        setisLoading(true);

        if (catId !== "" && catId !== null && catId !== undefined) {
            fetchDataFromApi(`/api/products/rating?rating=${rating}&catId=${filterId!=="" ? filterId : catId}&location=${localStorage.getItem("location")}&page=1&perPage=8`).then((res) => {
                setProductData(res)
                setisLoading(false);
            })
        }



    }


    const handleChange = (event, value) => {
        setisLoading(true);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
        fetchDataFromApi(`/api/products?category=${id}&page=${value}&perPage=6&location=${localStorage.getItem("location")}`).then((res) => {
            setProductData(res);
            setisLoading(false);
        })
    };


    const openFilters = () => {
        setIsOpenFilter(!isOpenFilter)
    }

    const getMetaData = (categoryId) => {
        const metaDataMap = {
            'men-suits': {
                title: "Buy 2 Piece Suit for Men Online | Premium Slim Fit Suits in India",
                description: "Shop the best collection of men’s 2-piece suits online in India. Buy premium slim-fit suits for weddings, office & parties at great prices. Check now!.",
                keywords: "buy 2 Piece Suit for men online, Best place to buy mens suits online, buy Men's 2 piece Slim Fit Suit online, Buy 2 piece suit for men online India",
                htag:"Premium 2 Piece Suits for Men",
                url:"https://phbypriyanshu.com/category/men-suits"
            },
            'women-suits': {
                title: "Ladies Suits - Buy Fancy Designer suit for women Online at P&H by Priyanhsu",
                description: "Shop for Pretty Designer Ladies Suits online for women & kids in India. Buy from top original brands like Anouk, Biba, Libaz, ZIYAA & more upto 80% off from P&H by Priyanshu.",
                keywords: "ladies suits, suits for women, ladies designer suit,black suit for women, salwar suit for women, designer suits for women",
                htag: "Stylish Women’s 2 Piece Suits",
                url:"https://phbypriyanshu.com/category/women-suits"
            },
            'blazers': {
                title: "Buy Men’s & Women’s Blazers Online India – Wedding & Formal Wear",
                description: "Shop premium men’s & women’s blazers online in India. Perfect for weddings, office & parties. Best quality & stylish designs. Check now!",
                keywords: "Buy mens blazer online India, mens blazer for wedding, Buy womens blazer online India ",
                htag: "Premium Blazers for Men & Women",
                url: "https://phbypriyanshu.com/category/blazers"
            },
            'designers-choice': {
                title: "Buy Double-Breasted Tuxedo for Men & Designer Two-Piece for Women",
                description: "Shop luxury double-breasted tuxedos for men & designer two-piece suits for women. Premium quality & stylish designs.",
                keywords: "Buy Double-Breasted Tuxedo for mens online, Buy Designer Two-Piece for Women online",
                htag: "Designer Double-Breasted Tuxedos & Two-Piece Suits",
                url:"https://phbypriyanshu.com/category/designer-choice"
            },

            
            // Add more categories as needed
            'default': {
                title: "Shop Designer & Trending Suits Online | P & H BY PRIYANSHU",
                description: "P & H by Priyanshu would be your one stop store to buy professional, designer & trending suits online, for men's & women's both.",
                keywords: "Best Designer, Noida best designer, Fashion Designer, Formal dress, Blazers",
                htag: "Category",
                url: "https://phbypriyanshu.com/"
            }
        };

        // Return metadata for specific category or default if category not found
        return metaDataMap[categoryId] || metaDataMap['default'];
    };

    const metaData = getMetaData(id);
    return (
        <>
        <MetaData title={metaData.title} description={metaData.description} 
              link={metaData.url} keywords={metaData.keywords}/>
            <section className="product_Listing_Page">
                <div className="container">
                    <div className="productListing d-flex">
                    {/* {
                        context.categoryData?.length !== 0 &&
                        <Sidebar filterData={filterData} filterByPrice={filterByPrice} filterByRating={filterByRating} isOpenFilter={isOpenFilter} catId={params.categoryId} subCatId={params.subcatid} catData={context.categoryData}/>
                    } */}

                        <div className="content_right">

                            <div className="showBy mt-0 mb-3 d-flex align-items-center">
                                <div className="d-flex align-items-center btnWrapper">
                                    <Button className={productView === 'one' && 'act'} onClick={() => setProductView('one')}><IoIosMenu />
                                    </Button>

                                    <Button className={productView === 'three' && 'act'} onClick={() => setProductView('three')}>
                                        <CgMenuGridR /></Button>
                                    <Button className={productView === 'four' && 'act'} onClick={() => setProductView('four')}><TfiLayoutGrid4Alt /></Button>
                                </div>

                            </div>
                            <h1 className='mb-2 hd'>{metaData.htag}</h1>

                            <div className="productListing">
                                {
                                    isLoading === true ?
                                        <div className="loading d-flex align-items-center justify-content-center">
                                            <CircularProgress color="inherit" />
                                        </div>
                                        :

                                        <>
                                            {
                                                Array.isArray(productData?.products) &&
                                                [...productData.products].reverse().map((item, index) => {
                                                    return (
                                                        <ProductItem key={index} itemView={productView} item={item} />
                                                    )
                                                })
                                            }
                                        </>

                                }



                            </div>




                        </div>
                    </div>
                </div>
            </section>


            {/* {
                context.windowWidth < 992 &&
                <>
                    {
                        context.isOpenNav === false &&
                        <div className="fixedBtn row">
                            <div className="col">
                                <Button className='btn-blue bg-red btn-lg btn-big' onClick={openFilters}>
                                    <FaFilter />
                                    {isOpenFilter === true ? 'Close Filters' : 'Open Filters'}

                                </Button>
                            </div>
                        </div>
                    }
                </>

            } */}


        </>
    )
}

export default Listing;