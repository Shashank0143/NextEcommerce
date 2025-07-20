"use client"
import React, { useContext } from "react";
import {
  Divider,
  Typography,
  Box,
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import { MyContext } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import  MetaData  from "@/Metadata";
import Head from "next/head";


const Contact = () => {
  const history = useRouter;
  const context = useContext(MyContext)
  const handleCall = () => {
    window.location.href = "tel:+91852793507";
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    context.setAlertBox({
      open: true,
      error: true,
      msg: "Your message has been sent successfully",
    });
    history.push("/");
  };

  return (
    <>
      <Box className="root_contactus">
        <MetaData title="Contact Us" description="contact us" link="https://phbypriyanshu.com/contact" />
        <div className="contact_Container_contactus">
          <Typography variant="h2" className="title_contact_us">
            Contact Us
          </Typography>

          <Divider className="divider_contact" />

          <Typography variant="h4" className="helpTitle_contact_us">
            Need Help?
          </Typography>

          <Typography variant="body2" className="para_contact">
            We have live chat available, look for the chat icon in the lower right
            hand corner of this page. If it isn’t there, then give us a call at{" "}
            <strong
              style={{
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={handleCall}
            >
              +91 85278 93507
            </strong>
            .
          </Typography>

          <Typography variant="body2" className="para_contact">
            <span className="para2">09:00-18:00 IST Monday-Friday</span>
            <br />
            <span className="para2">09:00-14:00 IST Saturday</span>
            <br />
            <span className="para2">Closed Sunday</span>
          </Typography>

          <Typography variant="body2" className="para_contact">
            Catch us outside these hours? Fill out our support form below, and we&posll be in touch shortly.
          </Typography>

          <Typography variant="body2" className="address_contacts">
            <span style={{ fontWeight: "500", paddingBottom: "0.5rem" }}>
              P&H BY PRIYANSHU, Pvt Ltd.
            </span>
            <br />
            Sec 126, Radha Ballabh Campus,
            <br />
            Noida, UP 201301
            <br />
            India
          </Typography>

          <div className="buttonGroup">
            <a href="#issue-select" style={{ textDecoration: "none" }}>
              <Button variant="contained" className="supportButton">
                Support Form
              </Button>
            </a>

            <Button
              variant="contained"
              className="callButton"
              onClick={handleCall}
            >
              Call Us
            </Button>
          </div>

          <Divider className="divider_contact" />
          <div className="supportForm">
            <Typography
              variant="h4"
              className="title_contact_us"
              style={{ paddingBottom: "1rem" }}
            >
              Support Form
            </Typography>

            <Typography variant="body2" className="para_contact">
              Need a quicker answer? Look for our chat icon on the right hand side
              of this page.
            </Typography>

            <form
              className="formContainer_container"
              onSubmit={handleSubmit}
            >
              <div className="SelectOption_contact">
                <Typography variant="body2" className="lableText_contact">
                  ISSUE *
                </Typography>
                <FormControl className="formField_contact">
                  <Select
                    labelId="issue-label"
                    id="issue-select"
                    defaultValue="e-commerce"
                    MenuProps={{
                      classes: { paper: "menu_contact" },
                    }}
                  >
                    <MenuItem value="e-commerce">E-Commerce</MenuItem>
                    <MenuItem value="app">App</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="SelectOption_contact">
                <Typography variant="body2" className="lableText_contact">
                  DETAIL *
                </Typography>
                <FormControl className="formField_contact">
                  <Select
                    labelId="detail-label"
                    id="detail-select"
                    defaultValue="others"
                    MenuProps={{
                      classes: { paper: "menu_contact" },
                    }}
                  >
                    <MenuItem value="availability">Availability</MenuItem>
                    <MenuItem value="return/exchange">Return/Exchange</MenuItem>
                    <MenuItem value="technical-support">
                      Technical Support
                    </MenuItem>
                    <MenuItem value="invoicing">Invoicing</MenuItem>
                    <MenuItem value="tracking-info">Tracking Info</MenuItem>
                    <MenuItem value="others">Others</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="SelectOption_contact">
                <Typography variant="body2" className="lableText_contact">
                  Language *
                </Typography>
                <FormControl className="formField_contact">
                  <Select
                    labelId="language-label"
                    id="language-select"
                    defaultValue="english"
                    MenuProps={{
                      classes: { paper: "menu_contact" },
                    }}
                  >
                    <MenuItem value="english">English</MenuItem>
                    <MenuItem value="hindi">Hindi</MenuItem>
                    <MenuItem value="japanese">Japanese</MenuItem>
                    <MenuItem value="chinese">Chinese</MenuItem>
                    <MenuItem value="german">German</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="SelectOption_contact">
                <Typography variant="body2" className="lableText_contact">
                  {" "}
                  EMAIL *
                </Typography>
                <FormControl className="formField_contact">
                  <TextField
                    placeholder="Enter Your Email *"
                    id="email-input"
                    type="email"
                  />
                </FormControl>
              </div>

              <div className="SelectOption_contact">
                <Typography variant="body2" className="lableText_contact">
                  {" "}
                  MESSAGE *
                </Typography>
                <FormControl className="formField_contact">
                  <TextField
                    id="message-textarea"
                    multiline
                    rows={6}
                    variant="outlined"
                    placeholder="Enter Your Message *"
                  />
                </FormControl>
              </div>
              <Button
                type="submit"
                variant="contained"
                className="submitButtons"
              >
                Submit
              </Button>
            </form>
          </div>
        </div>
      </Box>
    </>
  );
};

export default Contact;