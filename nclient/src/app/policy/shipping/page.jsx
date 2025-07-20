import React from "react";
// import MetaData from "../component/layouts/MataData/MataData";
import Link from "next/link";
const ShippingPolicy = () => {
    return (
        <div className="container__0">
                {/* <MetaData title="Return Policy" 
                link={"https://phbypriyanshu.com/policy/shipping"}
                /> */}
            <div className="image-container">
                <h1 className="policy-text">Shipping policy</h1>
            </div>
            <div className="content-container">
                <p>
                    The orders for the user are shipped through registered domestic courier companies and/or speed post
                    only. Orders are shipped within 07 days from the date of the order and/or payment or as per the delivery
                    date agreed at the time of order confirmation and delivering of the shipment, subject to courier company /
                    post office norms. Platform Owner shall not be liable for any delay in delivery by the courier company /
                    postal authority. Delivery of all orders will be made to the address provided by the buyer at the time of
                    purchase. Delivery of our services will be confirmed on your email ID as specified at the time of
                    registration. If there are any shipping cost(s) levied by the seller or the Platform Owner (as the case be),
                    the same is not refundable.
                </p>
                <br />
                <p>
                    Customer Service Department
                    <br />
                    <span style={{ fontWeight: "500" }}>Email </span>:
                    phbypriyanshu886@gmail.com
                    <br />
                    <span style={{ fontWeight: "500" }}>Phone  </span>:  Radha Ballabh Campus
                    <br />
                    <span style={{ fontWeight: "500" }}>    Hours of Operation: Monday to Friday, 9:00 AM to 18:00 PM (IST) </span>
                </p>
                <p>
                    Please reach out to us if you have any concerns or require any
                    clarifications regarding our{" "}
                    <Link
                        href="/policy/return"
                        style={{
                            textDecoration: "none",
                            color: "inherit",
                            fontWeight: "500",
                        }}
                    >
                        return policy
                    </Link>
                    . We strive to provide excellent customer service and ensure your
                    satisfaction.
                </p>
            </div>
        </div>
    );
};

export default ShippingPolicy;