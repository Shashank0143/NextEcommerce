"use client"
import React, { useState, useEffect } from 'react';
import { LuShirt } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";
import { RiDiscountPercentLine } from "react-icons/ri";
import { CiBadgeDollar } from "react-icons/ci";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import newsLetterImg from '../../assets/images/newsletter.png';
import Button from '@mui/material/Button';
import { IoMailOutline } from "react-icons/io5";
import Image from "next/image";

import { MyContext } from "@/context/ThemeContext";
import { useContext } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ProductModal from "../ProductModal";
import { fetchDataFromApi } from "@/utils/api";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import {
    LocalShipping,
    Security,
    LocalOffer,
    CreditCard,
} from "@mui/icons-material";

const servicesData = [
    {
        id: 1,
        icon: <LocalShipping fontSize="large" />,
        title: "Express Delivery",
        info: "Ships in 24 Hours",
    },
    {
        id: 2,
        icon: <Security fontSize="large" />,
        title: "Brand Warranty",
        info: "100% Original products",
    },
    {
        id: 3,
        icon: <LocalOffer fontSize="large" />,
        title: "Exciting Deals",
        info: "On all prepaid orders",
    },
    {
        id: 4,
        icon: <CreditCard fontSize="large" />,
        title: "Secure Payments",
        info: "SSL / Secure сertificate",
    },
];

const footMenu = [
    {
        id: 1,
        title: "GET IN TOUCH",
        menu: [
            {
                id: 1,
                link: "Email: phbypriyanshu886@gmail.com ",
                path: "/",
            },
            {
                id: 2,
                link: "What's App : +91 85278 93507",
                path: "/",
            },

            {
                id: 3,
                link: "(Mon-Sat: Timing 10am - 7pm)",
                path: "/",
            },
            {
                id: 4,
                link: "CONTACT US",
                path: "/contact",
            },
            {
                id: 5,
                link: "RETURN/EXCHANGE REQUEST",
                path: "/policy/terms",
            },
        ],
    },
    {
        id: 2,
        title: "POLICY",
        menu: [
            {
                id: 1,
                link: "RETURN POLICY",
                path: "/policy/return",
            },
            {
                id: 2,
                link: "SHIPPING POLICY",
                path: "/policy/shipping",
            },
            {
                id: 3,
                link: "SITEMAP",
                path: "/sitemap.xml",
            },
            {
                id: 4,
                link: "PRIVACY POLICY",
                path: "/policy/privacy",
            },
            {
                id: 5,
                link: "TERMS & CONDITIONS",
                path: "/terms/conditions",
            },
        ],
    },
    {
        id: 3,
        title: "COMPANY",
        menu: [
            {
                id: 1,
                link: "ABOUT US",
                path: "/about",
            },
            {
                id: 2,
                link: "CONTACT US",
                path: "/contact",
            },
            {
                id: 3,
                link: "SERVICE CENTERS",
                path: "/",
            },
            {
                id: 4,
                link: "CAREERS",
                path: "/",
            },
        ],
    },
];

const footSocial = [
    {
        id: 1,
        icon: <FacebookIcon className="facebook_icon" fontSize="large" />,
        path: "https://www.facebook.com/share/1BJxnNEMB1/?mibextid=wwXIfr",
    },
    {
        id: 2,
        icon: <TwitterIcon className="twitter_icon" fontSize="large" />,
        path: "https://x.com/hpriyanshu73417?s=11",
    },
    {
        id: 3,
        icon: <InstagramIcon className="insta_icon" fontSize="large" />,
        path: "https://www.instagram.com/by_priyanshu?igsh=Z2xzMjE4cm15cWMx&utm_source=qr",
    },
    {
        id: 4,
        icon: <LinkedInIcon className="likedin_icon" fontSize="large" />,
        path: "https://www.linkedin.com/company/p-h-by-priyanshu/",
    },
];


const Footer = () => {

    const context = useContext(MyContext);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        context.setAlertBox({
            open: false
        });
    };

    const [activeDropdown, setActiveDropdown] = useState(null);

    const toggleDropdown = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    const currYear = new Date().getFullYear();

    return (
        <>
            <div className="service-section">
                <div className="service-wrapper" style={{ width: "100%" }}>
                    {servicesData.map((item) => {

                        return (
                            <div className="service-card" key={item.id}>
                                <div className="service-icon">{item.icon}</div>
                                <div>
                                    <div className="service-cardTitle">{item.title}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <footer className="footer">
                <div className="container">
                    {/* Desktop Footer Column Layout */}
                    <div className="wrapper_footer">
                        {footMenu.map((item, index) => (
                            <div className="footer_column" key={item.id}>
                                <h4>{item.title}</h4>
                                <ul>
                                    {item.menu.map((menuItem) => (
                                        <li key={menuItem.id}>
                                            <Link className="footer_column" href={menuItem.path}>{menuItem.link}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        <div className="footer_column">
                            <h4>Follow Us</h4>
                            <div className="foot_social">
                                {footSocial.map((item) => (
                                    <a href={item.path} key={item.id} target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
                                        {item.icon}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Mobile Footer Dropdown Layout */}
                    <div className="dropdown_footer_menu">
                        {footMenu.map((item, index) => (
                            <div key={item.id}>
                                <div className="dropdown_button" onClick={() => toggleDropdown(index)}>
                                    <h4>{item.title}</h4>
                                    {activeDropdown === index ? (
                                        <ExpandLessIcon size={20} sx={{ color: "white" }} />
                                    ) : (
                                        <ExpandMoreIcon size={20} sx={{ color: "white" }} />
                                    )}
                                </div>
                                <div className={`dropdown_content ${activeDropdown === index ? "show" : ""}`}>
                                    <ul>
                                        {item.menu.map((menuItem) => (
                                            <li key={menuItem.id}>
                                                <Link style={{ color: "white", fontWeight: 100, fontSize: "smaller" }} href={menuItem.path}>{menuItem.link}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                        <div>
                            <div className="dropdown_button" onClick={() => toggleDropdown(footMenu.length)}>
                                <h4>FOLLOW US</h4>
                                {activeDropdown === footMenu.length ? (
                                    <ExpandLessIcon size={20} sx={{ color: "white" }} />
                                ) : (
                                    <ExpandMoreIcon size={20} sx={{ color: "white" }} />
                                )}
                            </div>
                            <div className={`dropdown_content ${activeDropdown === footMenu.length ? "show" : ""}`}>
                                <div className="foot_social">
                                    {footSocial.map((item) => (
                                        <a href={item.path} key={item.id} target="_blank" rel="noopener noreferrer" style={{ color: "white" }}>
                                            {item.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="separatorFooter"></div>

                    <div className="sub_footer_root">
                        <div className="container_Footer">
                            <div className="sub_footer_wrapper">
                                <div className="foot_copyright" style={{ color: "white", fontSize: "1rem" }}>
                                    <p>
                                        &copy; Copyright {currYear} | P&HBYPRIYANSHU PVT Ltd, All Rights Reserved.
                                        <span>
                                            <a href="https://www.linkedin.com/in/shashank-meena-8aa55623a" style={{ color: "white", fontSize: "small" }}> | Developed by Shashank Meena</a>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;