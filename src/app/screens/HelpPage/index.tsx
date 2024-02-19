import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Typography,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ExpandMore } from "@mui/icons-material";

import { Header } from "./header";
import "../../../scss/help.scss";

export function Help() {
  /** INITIALIZATIONS */
  const [value, setValue] = useState("1");

  const rules = [
    "Keep your login credentials private; sharing accounts is not allowed.",
    "Respect intellectual property rights; do not infringe on copyrights or trademarks.",
    "Do not disrupt the proper functioning of the website or attempt to hack it.",
    "Treat others with respect; harassment or abusive behavior will not be tolerated.",
    "Provide accurate information; any fraudulent activity will result in account consequences.",
    "Engaging in illegal activities, such as selling counterfeit goods, is strictly prohibited.",
    "Avoid impersonation or misrepresentation of identity.",
    "Spamming or sending unsolicited messages is prohibited.",
    "Gambling or betting activities are not permitted.",
    "Respect the privacy of others; do not share personal information without consent.",
    "Do not try to bypass security measures implemented on the website.",
    "Ensure your contact information is up to date for important notifications.",
    "Violating these rules may lead to account suspension or termination.",
    "Report any violations or suspicious activity to the website administrators.",
    "The website reserves the right to monitor user activity to enforce these rules and maintain a safe environment.",
  ];

  const faq = [
    {
      question: "How can I place an order?",
      answer:
        "To place an order, simply browse our website, select the items you wish to purchase, and proceed to checkout. Follow the prompts to enter your shipping and payment information to complete the order.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept several payment methods, including credit/debit cards, and bank transfers.",
    },
    {
      question: "What is your shipping policy?",
      answer:
        "Our shipping policy includes information on processing times, shipping rates, delivery options, and estimated delivery times. Please refer to our Shipping Policy page for detailed information.",
    },
    {
      question: "How can I track my order?",
      answer:
        "Once your order has been shipped, you will receive a tracking number via email. You can use this tracking number to monitor the status and location of your package.",
    },
    {
      question: "What is your return or exchange policy?",
      answer:
        "Our return and exchange policy outlines the conditions under which items can be returned or exchanged, including timeframes, eligibility criteria, and instructions for initiating a return or exchange.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to select countries. Please refer to our International Shipping page for a list of supported countries and additional information.",
    },
    {
      question: "How do I create an account?",
      answer:
        "You can create an account by clicking on the Sign Up or Create Account link on our website and following the prompts to enter your information and set up your account.",
    },
    {
      question: "What should I do if I forgot my password?",
      answer:
        "If you forgot your password, you can reset it by clicking on the Forgot Password link on the login page and following the instructions provided.",
    },
    {
      question: "Are your products available for wholesale?",
      answer:
        "Yes, we offer wholesale options for businesses interested in purchasing our products in bulk. Please contact our wholesale department for more information.",
    },
    {
      question: "Do you offer gift wrapping or personalized messages?",
      answer:
        "Yes, we offer gift wrapping services and the option to include personalized messages with your orders. Simply select these options during checkout.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact our customer support team via email at [email address] or by phone at [phone number]. Our support hours are [hours of operation].",
    },
    {
      question: "Do you have a loyalty or rewards program?",
      answer:
        "Yes, we have a loyalty program that rewards our customers for their continued support. You can earn points with every purchase and redeem them for discounts or rewards.",
    },
    {
      question: "Are your products organic/sustainable/vegan/etc.?",
      answer:
        "We offer a range of products that cater to various preferences and dietary restrictions, including organic, sustainable, and vegan options. Please check the product descriptions for specific details.",
    },
    {
      question: "What should I do if I receive a damaged or defective item?",
      answer:
        "If you receive a damaged or defective item, please contact our customer support team immediately with photos of the item and packaging. We will gladly assist you with a replacement or refund.",
    },
    {
      question: "Do you offer discounts or promotions for bulk orders?",
      answer:
        "Yes, we offer discounts and promotions for bulk orders. Please contact our sales team for pricing and availability for your specific order quantity.",
    },
  ];

  /**HANDLERS**/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="help_page">
      <Header />
      <Container className="help_page_box">
        <TabContext value={value}>
          <Box className="help_menu">
            <Box className="help_menu_wrap">
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                className="help_tablist"
              >
                <Tab className="rules" label="Privacy & Policy" value={"1"} />
                <Tab className="help" label="FAQ" value={"2"} />
                <Tab
                  className="contact"
                  label="Contact with Admin"
                  value={"3"}
                />
              </TabList>
            </Box>
          </Box>

          <Stack className="help_main_content">
            <TabPanel value="1">
              <Stack className="rules_box">
                <Box className="rules_frame">
                  {rules.map((ele, number) => {
                    return (
                      <p className="help_rules" key={number}>
                        {ele}
                      </p>
                    );
                  })}
                </Box>
              </Stack>
            </TabPanel>

            <TabPanel value="2">
              <Stack className="faq_box">
                {faq.map((ele, number) => {
                  return (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panella-content"
                        className="panella_header"
                      >
                        <Typography className="ques_text">
                          {ele.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{ele.answer}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Stack>
            </TabPanel>

            <TabPanel value="3">
              <Stack className="message_box">
                <h2>Leave a message to Admin</h2>
                <p>
                  Greetings! Full out the form below to leave a message to
                  admin!
                </p>
                <label>Name</label>
                <input type="text" placeholder="Sam William" />
                <label>Email</label>
                <input type="mail" placeholder="Email Address" />
                <label>Message</label>
                <textarea
                  className="message_text"
                  placeholder="Your Message..."
                />
                <Box className="btn_wrap">
                  <Button className="submit_btn">
                    <span>Send Message</span>
                  </Button>
                </Box>
              </Stack>
            </TabPanel>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
