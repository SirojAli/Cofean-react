import React from "react";
import { Box, Container, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";

SwiperCore.use([Autoplay, Navigation, Pagination]);

export function Events() {
  const events_list = [
    {
      title: "Denaur Fast Foodga Marhamat",
      desc: "Yangicha uslubda yangicha taom va yangicha his",
      author: "Abdurahmon Mufid",
      date: "2022/09/01",
      location: "Nurafshon ko'cha, Tashkent",
      img: "/restaurant/denaur.jpeg",
    },
    {
      title: "Belissimoda katta chegirma",
      desc: "Faqat 25-30 iyul kunlari antiq Pitsa yegani keling",
      author: "BelissimoUz",
      date: "2022/07/25",
      location: "Chilonzor, Tashkent",
      img: "/restaurant/belissimo.jpg",
    },
    {
      title: "Hali his qilmagan ta'mni biz bilan his qiling",
      desc: "Merhaba promokodi orqali 50% chegirmani qo'lga kiriting",
      author: "Chicken House",
      date: "2022/09/10",
      location: "Qo'yliq, Tashkent",
      img: "/restaurant/chicken-tikka-masala.jpeg",
    },
    {
      title: "Yangicha yondoshuv endi Uzbekistanda",
      desc: "Uzbekistandagi eng yirik ulgurji pizza do'koni",
      author: "Food City",
      date: "2022/08/01",
      location: "Yangi Qo'yliq bozori, Tashkent",
      img: "/restaurant/pizzar.jpg",
    },
  ];

  return (
    <div className="events_frame">
      <Container sx={{ overflow: "hidden" }}>
        <Stack className={"events_main"}>
          <Box className={"events_text"}>
            <span className={"category_title"}>Hodisalar</span>
          </Box>
          <Box className={"prev_next_frame"}>
            <img
              src={"/icons/arrow-right.svg"}
              className={"swiper-button-prev"}
              style={{ transform: "rotate(-180deg)" }}
            />
            <div className={"dot_frame_pagination swiper-pagination"}></div>
            <img
              src={"/icons/arrow-right.svg"}
              className={"swiper-button-next"}
            />
          </Box>

          <Swiper
            className={"events_info swiper-wrapper"}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={30}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{
              el: ".swiper-pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 2000,
              disableOnInteraction: true,
            }}
          >
            {events_list.map((value, number) => {
              return (
                <SwiperSlide className={"events_info_frame"}>
                  <div className={"events_img"}>
                    <img src={value.img} className={"events_img"} />
                  </div>
                  <Box className={"events_desc"}>
                    <Box className={"events_bott"}>
                      <Box className={"bott_left"}>
                        <div className={"event_title_speaker"}>
                          <strong>{value.title}</strong>
                          <div className={"event_organizator"}>
                            <img
                              src={"/icons/speaker.svg"}
                              style={{ width: "20px", marginRight: "10px" }}
                            />
                            <p className={"spec_text_author"}>{value.author}</p>
                          </div>
                        </div>

                        <p
                          className={"text_desc"}
                          style={{ marginTop: "10px" }}
                        >
                          {" "}
                          {value.desc}{" "}
                        </p>

                        <div
                          className={"bott_info"}
                          style={{ marginTop: "10px" }}
                        >
                          <div className={"bott_info_main"}>
                            <img
                              src={"/icons/calendar.svg"}
                              //   style={{ marginTop: "10px" }}
                            />
                            {value.date}
                          </div>
                          <div className={"bott_info_main"}>
                            <img
                              src={"/icons/location.svg"}
                              //   style={{ marginTop: "10px" }}
                            />
                            {value.location}
                          </div>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
      </Container>
    </div>
  );
}
