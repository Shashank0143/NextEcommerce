"use client"
import Link from 'next/link'
import React from 'react'

// import MetaData from "../component/layouts/MataData/MataData";
const ReturnPolicy = () => {
  return (
    <div className="container__0">
      {/* <MetaData title="Return Policy"
        link={"https://phbypriyanshu.com/policy/return"} /> */}
        <h1 style={{textAlign:"center", marginTop:"20px"}} >Return Policy</h1>
      <div className="content-container">
        <p>We offer refund / exchange within first 7 days from the date of your purchase. If 7 days have passed
          since your purchase, you will not be offered a return, exchange or refund of any kind on item. In order to become
          eligible for a return or an exchange, 
          (i) the purchased item should be unused and in the same condition as
          you received it, 
          (ii) the item must have original packaging, 
          (iii) if the item that you purchased on a sale,
          (iv) if the item is custom tailored then return / exchange is not applied, hence there is no refund on cutomize item,
          then the item may not be eligible for a return / exchange. Further, only such items are replaced by us
          (based on an exchange request), if such items are found defective or damaged.
        </p>
        <br />
        <p>
          You agree that there may be a certain category of products / items that are exempted from returns or
          refunds. Such categories of the products would be identified to you at the item of purchase. For exchange
          / return accepted request(s) (as applicable), once your returned product / item is received and inspected
          by us, we will send you an email to notify you about receipt of the returned / exchanged product. Further.
          If the same has been approved after the quality check at our end, your request (i.e. return / exchange) will
          be processed in accordance with our policies.
        </p>
        <br />
        <br />
        <h1>Refund and Cancellation policy</h1>
        <p>
          This refund and cancellation policy outlines how you can cancel or seek a refund for a product / service
          that you have purchased through the Platform. Under this policy:
        </p>
        <br />
        <p>
          1. Cancellations will only be considered if the request is made 7 days of placing the order. However,
          cancellation requests may not be entertained if the orders have been communicated to such sellers /
          merchant(s) listed on the Platform and they have initiated the process of shipping them, or the
          product is out for delivery. In such an event, you may choose to reject the product at the doorstep.
          <br />
          <br />
          2. P H BY PRIYANSHU does not accept cancellation requests for perishable items like flowers,
          eatables, etc. However, the refund / replacement can be made if the user establishes that the quality
          of the product delivered is not good.
          <br /><br />
          3. In case of receipt of damaged or defective items, please report to our customer service team. The
          request would be entertained once the seller/ merchant listed on the Platform, has checked and
          determined the same at its own end. This should be reported within 7 days of receipt of products.
          In case you feel that the product received is not as shown on the site or as per your expectations,
          you must bring it to the notice of our customer service within 7 days of receiving the product. The
          customer service team after looking into your complaint will take an appropriate decision.
          <br /><br />
          4.In case of complaints regarding the products that come with a warranty from the manufacturers,
          please refer the issue to them.
          <br /><br />
          5. In case of any refunds approved by P H BY PRIYANSHU, it will take 7 days for the refund to be
          processed to you.
        </p>
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
  )
}

export default ReturnPolicy
