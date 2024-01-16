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
import "../../../css/help.css";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ExpandMore } from "@mui/icons-material";

export function HelpPage() {
  /*INITIALIZATIONS*/
  const [value, setValue] = useState("1");

  const faq = [
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer:
        "To'lovni PayMe Click ilovalari orqali amalga oshirishingiz mumkin.",
    },
    {
      question: "Buyurtma qancha vaqtda yetib keladi?",
      answer: "Buyurtma harid qilgan maxsulotingiz turiga qarab farqlanadi.",
    },
    {
      question:
        "Saytdan foydalansam ma'lumotlarim havfsizligi kafolatlanganmi?",
      answer:
        "Albatta bizning dasturchilarimiz siznimg ma'lumotlaringiz xavfsizligiga kafolat beradi.",
    },
    {
      question:
        "Saytdan foydalanishda muammo yuzaga kelsa kimga murojaat qilish kerak?",
      answer: "Agar saytda muammo yuzaga kelsa adminga mutojaat qiling.",
    },
    {
      question:
        "Saytdan foydalansam ma'lumotlarim havfsizligi kafolatlanganmi?",
      answer:
        "Albatta bizning dasturchilarimiz siznimg ma'lumotlaringiz xavfsizligiga kafolat beradi.",
    },
    {
      question: "To'lov qanday amalga oshiriladi?",
      answer:
        "To'lovni PayMe Click ilovalari orqali amalga oshirishingiz mumkin.",
    },
    {
      question: "Buyurtma qancha vaqtda yetib keladi?",
      answer: "Buyurtma harid qilgan maxsulotingiz turiga qarab farqlanadi.",
    },
    {
      question:
        "Saytdan foydalansam ma'lumotlarim havfsizligi kafolatlanganmi?",
      answer:
        "Albatta bizning dasturchilarimiz siznimg ma'lumotlaringiz xavfsizligiga kafolat beradi.",
    },
  ];
  const rules = [
    "Saytdan to'laqonli yani buyurtmalar qilish, jonli muloqotdan foydalanishingiz uchun ro'yxatdan o'tishingiz shart",
    "Buyurtmalar to'lovini amalga oshirgandan so'ng to'lovni qaytarib ololmaysiz. Shu sababli oldindan tekshirib oling",
    "Jonli muloqot vaqtida turli behayo, inson shaniga to'g'ri kelmaydigan gaplarni yozmang.",
    "Shaxsiy reklamalarni admin ruxsatisiz yozish mumkin emas.",
    "Maqolalar odob doirasidan chiqib ketmasligi shart",
    "Barcha harakatlaringiz admin tomonidan tekshiriladi.",
  ];

  /**HANDLERS**/
  const handleChange = (event: any, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="help_page">
      <Container maxWidth="lg" sx={{ mt: "50px", mb: "50px" }}>
        <TabContext value={value}>
          <Box className="help_menu">
            <Box className="help_menu_wrap">
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
                className="help_tablist"
              >
                <Tab label="Qoidalar" value={"1"} />
                <Tab className="help_tab" label="FAQ" value={"2"} />
                <Tab label="Adminga xat" value={"3"} />
              </TabList>
            </Box>
          </Box>
          <Stack className="help_main_content">
            <TabPanel value="1">
              <Stack className="theRules_box">
                <Box className="theRules_frame">
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
              <Stack className="accordian_menu">
                {faq.map((ele, number) => {
                  return (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panella-content"
                        id="panella-header"
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
              <Stack className="message_container">
                <h2>Adminga Xabar Qoldirish</h2>
                <p>
                  Assalomu alaykum! Adminga xabar qoldirish uchun pasdagi
                  formlarni to’ldiring!
                </p>
                <label>Ism</label>
                <input type="text" placeholder="alina june" />
                <label>Elektron Manzil</label>
                <input type="mail" placeholder="email" />
                <label>Xabar</label>
                <textarea className="message_text" placeholder="Xabar" />
                <Box className="btn_wrap">
                  <Button
                    variant="contained"
                    color="primary"
                    className="send_btn"
                  >
                    Jo'natish
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
