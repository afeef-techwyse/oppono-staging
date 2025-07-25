import React from "react";
import PropTypes from "prop-types";
import useStateWithRef from "../hooks/useStateWithRef";
// import classnames from "classnames";

import { connect, styled } from "frontity";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import CustomEase from "gsap/CustomEase";


import SwiperCore, {
    A11y,
    Keyboard,
    Mousewheel,
    Navigation,
    Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { size } from "../functions/size";

import Container from "./reusable/Container";
import Header from "./Header";
import Footer from "./Footer";
import FlyingObj from "./reusable/FlyingObj";
import Link from "./reusable/Link";
import useMedia from "../hooks/useMedia";

SwiperCore.use([Navigation, Pagination, Keyboard, Mousewheel, A11y]);
gsap.registerPlugin(SplitText, DrawSVGPlugin, CustomEase);

const Slider = styled(Swiper)`
  z-index: 5;
  width: 100%;
  position: relative;
  overflow: visible !important;

  .swiper-wrapper,
  .swiper-slide {
    //transition: none !important;
  }

  .title-wrapper {
    position: relative;
    @media (max-width: 991.98px) {
      margin-left: ${size(32)};
    }
    @media (max-width: 575.98px) {
      margin-left: 2.85vh;
      margin-top: 4vh;
    }

    .slide-number {
      color: #b5d2ff;
      font-size: ${size(40)};
      font-weight: 600;
      width: ${size(63)};
      height: ${size(63)};
      border: 1px solid rgba(181, 210, 255, 0.4);
      border-radius: 50%;
      position: absolute;
      left: ${size(-85)};
      top: ${size(10)};
      display: flex;
      align-items: center;
      justify-content: center;
      @media (max-width: 575.98px) {
        font-size: ${size(8)};
        left: ${size(-24)};
        width: ${size(16)};
        top: ${size(12)};
        height: ${size(16)};
      }
    }

    .title {
      color: #b5d2ff;
      font-size: ${size(80)};
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: ${size(85)};
      text-align: left;
			max-width: ${size(1150)};
      @media (max-width: 991.98px) {
        font-size: ${size(60)};
        line-height: ${size(70)};
      }
      @media (max-width: 575.98px) {
        font-size: 2.94vh;
        line-height: 1.2;
      }

      > div {
        line-height: 1;
      }
    }
  }

  .btn {
    width: auto;
    max-width: fit-content;
    padding: 0 ${size(42)};
    height: ${size(64)};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: ${size(32)};
    background-color: #fe412d;
    color: #ffffff;
    font-size: ${size(16)};
    font-weight: 400;
    text-decoration: none;
    margin-top: ${size(24)};
    cursor: pointer;
    white-space: nowrap;

    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
    }

    &.secondary {
      background: none;
      border: 1px solid #fe412d;
    }

    svg {
      width: ${size(13)};
      height: ${size(13)};
      margin-left: ${size(8)};
    }

    @media (max-width: 991.98px) {
      margin-left: ${size(32)};
      height: ${size(56)};
    }
    @media (max-width: 575.98px) {
      display: none;
    }
  }
`;

const createSlideAnimation = (slide, paused = true) => {
    if (!slide) return;
    const slideAnimationTl = gsap.timeline({ paused }).timeScale(2),
        title = slide.querySelector(".title"),
        btn = [...slide.querySelectorAll(".btn")],
        slideNumber = slide.querySelector(".slide-number"),
        btnText = btn[0]?.querySelector(".text"),
        btnEnter = btn[0]?.querySelectorAll(".enter-arrow path"),
        btnText1 = btn[1]?.querySelector(".text"),
        btnEnter1 = btn[1]?.querySelectorAll(".enter-arrow path"),
        btnText2 = btn[2]?.querySelector(".text"),
        btnEnter2 = btn[2]?.querySelectorAll(".enter-arrow path");
    let splitted = false;
    if (title.classList.contains("splitted")) splitted = true;
    const titleWords = !splitted && new SplitText(title, { type: "words" }),
        btnChars = !splitted && new SplitText(btnText, { type: "chars" }),
        btnChars1 = !splitted && new SplitText(btnText1, { type: "chars" }),
        btnChars2 = !splitted && new SplitText(btnText2, { type: "chars" });

    title.classList.add("splitted");
    btnText?.classList.add("splitted");

    slideAnimationTl
        .fromTo(
            splitted ? title.children : titleWords.words,
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, stagger: 0.06 }
        )

        .fromTo(btn[0], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0 }, "-=.4")
        .fromTo(btn[0], { width: 0 }, { width: "auto", ease: "power2.in" }, "-=.3")

        .fromTo(
            slideNumber,
            { autoAlpha: 0, scale: 0 },
            { autoAlpha: 1, scale: 1 },
            "<"
        )

        .fromTo(
            splitted ? btnText?.children : btnChars.chars,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.3 },
            "-=.1"
        )
        .fromTo(
            btnEnter,
            { drawSVG: 0 },
            { drawSVG: "100%", stagger: 0.3 },
            "-=.1"
        )

        .fromTo(btn[1], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0 }, "-=.4")
        .fromTo(btn[1], { width: 0 }, { width: "auto", ease: "power2.in" }, "-=.3")

        .fromTo(
            splitted ? btnText1?.children : btnChars1.chars,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.3 },
            "-=.1"
        )
        .fromTo(
            btnEnter1,
            { drawSVG: 0 },
            { drawSVG: "100%", stagger: 0.3 },
            "-=.1"
        )

        .fromTo(btn[2], { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0 }, "-=.4")
        .fromTo(btn[2], { width: 0 }, { width: "auto", ease: "power2.in" }, "-=.3")

        .fromTo(
            splitted ? btnText2?.children : btnChars2.chars,
            { autoAlpha: 0, y: 10 },
            { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.3 },
            "-=.1"
        )
        .fromTo(
            btnEnter2,
            { drawSVG: 0 },
            { drawSVG: "100%", stagger: 0.3 },
            "-=.1"
        );
    return slideAnimationTl;
};

const HomeSlider = ({ className, active = false, state, actions, link }) => {
    const data = state.source.get(link);
    const slidesObj =
        data.isReady && !data.isError
            ? state.source[data.type][data.id].acf.slider
            : [];
    const { page_theme, slider_top_subtitle, slider_top_title } =
        data.isReady && !data.isError ? state.source[data.type][data.id].acf : {};

    const media = useMedia();
    const nextBtnRef = React.useRef(null);
    const prevBtnRef = React.useRef(null);
    const paginationRef = React.useRef(null);
    const flyingWrapperRef = React.useRef(null);
    const slidesNumbers = React.useRef(null);
    const footer = React.useRef(null);
    const header = React.useRef(null);
    const welcomeMessage = React.useRef(null);
    const slidesAnimation = React.useRef({});
    const slidesTransition = React.useRef(0);
    const initialTimeline = React.useRef(gsap.timeline({ paused: false }));
    const flyingObjectsAnimation = React.useRef(gsap.timeline({ paused: true }));
    const [swiperRef, setSwiperRef] = React.useState(null);
    const [
        slideFlyingObjectsPlaying,
        setSlideFlyingObjectsPlaying,
    ] = React.useState([]);
    const [currentSlide, setCurrentSlide, currentSlideRef] = useStateWithRef(0);

    const swiperInit = (swiper) => {
        const { slides } = swiper;
        for (let i = 0; i < slides?.length; i++) {
            slidesAnimation.current[i] = createSlideAnimation(slides[i]);
        }
        setSwiperRef(swiper);
    };

    React.useEffect(() => {
        actions.source.fetch(link);
        // flyingObjectsAnimation.current.progress(1).progress(0);
    }, []);
    React.useEffect(() => {
        const slideAnimationTl = createSlideAnimation(swiperRef?.slides[0], false);
        if (!slideAnimationTl) return;
        const nextArrow = nextBtnRef.current.querySelectorAll("svg path"),
            prevArrow = prevBtnRef.current.querySelectorAll("svg path"),
            footerLeft = footer.current.querySelectorAll(".footer-left .guid"),
            headerLinks = header.current.querySelector(".menu-right"),
            footerRight = footer.current.querySelectorAll(".footer-right a"),
            // paginationDots = paginationRef.current.querySelectorAll('.swiper-pagination-bullet'),
            welcomeTitle = welcomeMessage.current.querySelectorAll(".title"),
            welcomeSubtitle = welcomeMessage.current.querySelectorAll(".subtitle"),
            welcomeTitleWords = new SplitText(welcomeTitle, { type: "words" }),
            welcomeSubtitleWords = new SplitText(welcomeSubtitle, { type: "words" });
        initialTimeline.current.clear();
        initialTimeline.current
            .fromTo(flyingWrapperRef.current, { yPercent: 100 }, { yPercent: 0 })
            .fromTo(
                welcomeTitleWords.words,
                { autoAlpha: 0, y: 10 },
                { autoAlpha: 1, y: 0, stagger: 0.06 },
                "0"
            )
            .fromTo(
                welcomeSubtitleWords.words,
                { autoAlpha: 0, y: 10 },
                { autoAlpha: 1, y: 0, stagger: 0.06 },
                ">-=.35"
            )
            .addLabel("initial-slide")
            .fromTo(header.current, { autoAlpha: 0 }, { autoAlpha: 1 })
            .fromTo(footer.current, { autoAlpha: 0 }, { autoAlpha: 1 })
            .fromTo(
                slidesNumbers.current,
                { autoAlpha: 0, scale: 0 },
                { autoAlpha: 1, scale: 1 },
                "initial-slide"
            )
            .fromTo(
                headerLinks,
                { autoAlpha: 0, y: 10 },
                { autoAlpha: 1, y: 0, stagger: 0.05 },
                "1"
            )
            .call(
                () => setTimeout(() => setSlideFlyingObjectsPlaying([true]), 10),
                null,
                "initial-slide-=1.1"
            )
            .fromTo(
                nextArrow,
                { drawSVG: 0 },
                { drawSVG: "100%", stagger: 0.5 },
                "initial-slide+=.5"
            )
            .fromTo(
                prevArrow,
                { drawSVG: 0 },
                { drawSVG: "100%", stagger: 0.5 },
                "initial-slide+=.5"
            )
            .fromTo(
                footerLeft,
                { autoAlpha: 0, y: 10 },
                { autoAlpha: 1, y: 0, stagger: 0.1 },
                "initial-slide+=1"
            )
            .fromTo(
                footerRight,
                { autoAlpha: 0, y: 10 },
                { autoAlpha: 1, y: 0, stagger: 0.1 },
                ">-=.35"
            )
            .fromTo(
                paginationRef.current,
                { autoAlpha: 0, y: 10, xPercent: -50 },
                { autoAlpha: 1, y: 0, stagger: 0.1 },
                "<"
            )
            .call(() => initialTimeline.current.remove(slideAnimationTl))
            .add(slideAnimationTl, "initial-slide")
            .call(() => initialTimeline.current.remove(slideAnimationTl));
        const keyHandler = (event) => {
            if (event.key === "Enter" && !event.repeat) {
                swiperRef.slides[currentSlideRef.current]
                    .querySelector(".slide-cta")
                    .click();
            }
        };
        window.addEventListener("keydown", keyHandler);

        return () => {
            window.removeEventListener("keydown", keyHandler);
        };
    }, [swiperRef]);
    React.useEffect(() => {
        initialTimeline.current.paused(!active);
    }, [active]);
    React.useEffect(() => {
        actions.theme.setActiveTheme(page_theme);
    }, [page_theme]);
    React.useEffect(() => {
        actions.theme.checkUser();
        if (state.theme.user.logged) {
            (state.router.link === "/" || state.router.link === "/dashboard") &&
                actions.router.set("/dashboard", { method: "replace" });
        } else {
            if (!(state.router.link === "/" || state.router.link === "/contacts/")) {
                actions.theme.setRedirectTo(state.router.link);
                actions.router.set("/sign-in/", { method: "replace" });
            }
        }
    }, [state.theme.user.logged, link]);
    React.useEffect(() => {
        flyingWrapperRef.current.classList.toggle(
            "hide",
            link !== state.router.link
        );
    }, [state.router.link]);

    const handleClick2 = (e) => {
        e.preventDefault(); // prevent default behavior
        gtag_report_conversion('https://velocity.newton.ca/members/login')
    }

    const handleClick1 = (e) => {
        e.preventDefault(); // prevent default behavior
        gtag_report_conversion('https://expert.filogix.com/expert/view/SignOn?locale=en_ca')
    }

    const handleClick3 = (e, url) => {
        e.preventDefault(); // prevent default behavior
        gtag_report_conversion(url)
    }
    return (
        <div className={className}>
            <Header hasSubMenu={false} ref={header} state={state} />

            <div ref={flyingWrapperRef} className="flying-obj-wrapper">
                {slidesObj.map((slide, slideIndex) =>
                    slide.flying_objects.desktop?.map((obj, objIndex) => {
                        return (
                            <FlyingObj
                                key={`slide-${slideIndex}-obj-${objIndex}-${state.router.link}`}
                                width={+obj.width}
                                imageUrl={obj.image.url}
                                frames={+obj.frames}
                                duration={+obj.duration}
                                initial_duration={+obj.initial_duration}
                                frame_x={+obj.frame_x}
                                frame_y={+obj.frame_y}
                                alt={obj.image.alt}
                                type={obj.type}
                                level={+obj.level}
                                loop_start_index={+obj.loop_start_index}
                                top={obj.top}
                                paused={!slideFlyingObjectsPlaying[slideIndex]}
                                left={+obj.left + 100 * slideIndex + "%"}
                                isStart={slideIndex === 0}
                                isEnd={slideIndex === slidesObj.length - 1}
                                timelineAddCallback={(tl) => {
                                    flyingObjectsAnimation.current.add(
                                        tl,
                                        slideIndex === 0 ? 0 : (slideIndex - 1) * 0.25
                                    );
                                }}
                            />
                        );
                    })
                )}
            </div>
            <div className="vertical-center">
                <Container>
                    <div ref={welcomeMessage} className="welcome-text">
                        <h3 className={"title"}>
                            {(slider_top_title
                                ? slider_top_title
                                : "Welcome back {{name}}"
                            ).replace("{{name}}", state.theme.user.user_fname)}
                        </h3>
                        <h2 className={"subtitle"}>
                            {slider_top_subtitle ? slider_top_subtitle : "Select an option:"}
                        </h2>
                    </div>
                </Container>
                <Slider
                    speed={900}
                    threshold={15}
                    a11y
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{
                        prevEl: prevBtnRef.current,
                        nextEl: nextBtnRef.current,
                    }}
                    pagination={{ clickable: true, el: paginationRef.current }}
                    onSwiper={swiperInit}
                    keyboard
                    mousewheel
                    virtualTranslate
                    onSetTransition={(swiper, transition) => {
                        slidesTransition.current = transition / 1000;
                    }}
                    onSetTranslate={(swiper, translate) => {
                        gsap.set(swiper.$wrapperEl, { x: translate });
                        gsap.to(flyingWrapperRef.current, {
                            x: translate,
                            duration: slidesTransition.current,
                            ease: CustomEase.create("custom", "M0,0 C0.25,0.1 0.25,1 1,1 "),
                        });
                        gsap.to(flyingObjectsAnimation.current, {
                            progress: -translate / (swiper.virtualSize - window.innerWidth),
                            duration: slidesTransition.current,
                            ease: CustomEase.create("custom", "M0,0 C0.25,0.1 0.25,1 1,1 "),
                        });
                    }}
                    onMomentumBounce={(swiper) => { }}
                    onTransitionEnd={(swiper) => {
                        // const {realIndex, previousIndex} = swiper;
                        // if (realIndex === currentSlideRef.current) return;
                        // slidesAnimation.current[realIndex].progress(0).play();
                        // slidesAnimation.current[previousIndex].progress(1).paused(true).progress(0);
                    }}
                    onSlideChange={({ realIndex, previousIndex }) => {
                        setTimeout(() => {
                            slidesAnimation.current[realIndex].progress(0).play();
                            slidesAnimation.current[previousIndex]
                                .progress(1)
                                .paused(true)
                                .progress(0);
                        }, 900);
                        setCurrentSlide(realIndex);
                        setTimeout(
                            () =>
                                setSlideFlyingObjectsPlaying((prevState) => {
                                    const newState = [...prevState];
                                    newState[realIndex] = true;
                                    return newState;
                                }),
                            600
                        );
                    }}
                >
                    <div className={"swiper-arrows"} slot={"container-start"}>
                        <Container>
                            <span className={"prev"} ref={prevBtnRef}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="231.414" height="11.414" viewBox="0 0 231.414 11.414">
                                    <g id="Left_Arrow" data-name="Left Arrow" transform="translate(1.414 0.707)" opacity="0.4">
                                        <path id="Path_989" data-name="Path 989" d="M1446,284H1216" transform="translate(-1216 -279)" fill="none" stroke="#b5d2ff" strokeWidth="2" />
                                        <path id="Path_990" data-name="Path 990" d="M1317,289.5l-5-5,5-5" transform="translate(-1312 -279.5)" fill="none" stroke="#b5d2ff" strokeWidth="2" />
                                    </g>
                                </svg>
                            </span>
                            <span ref={slidesNumbers} className={"slides-numbers"}>
                                {currentSlide + 1}
                                <span> /</span> {slidesObj.length}
                            </span>
                            <span className={"next"} ref={nextBtnRef}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="231.414" height="11.414" viewBox="0 0 231.414 11.414">
                                    <g id="Right_Arrow" data-name="Right Arrow" transform="translate(-1110.287 -278.793)">
                                        <path id="Path_989" data-name="Path 989" d="M1216,284h230" transform="translate(-105.713 0.5)" fill="none" stroke="#b5d2ff" strokeWidth="2" />
                                        <path id="Path_990" data-name="Path 990" d="M1312,289.5l5-5-5-5" transform="translate(23.287)" fill="none" stroke="#b5d2ff" strokeWidth="2" />
                                    </g>
                                </svg>
                            </span>
                        </Container>
                    </div>

                    {slidesObj.map((slide, slideIndex) => {

                        return (
                            <SwiperSlide key={`slide-${slideIndex}`}>
                                <Container>
                                    <FlyingObj
                                        isStart={false}
                                        isEnd={false}
                                        className={"mobile-icon"}
                                        paused={!slideFlyingObjectsPlaying[slideIndex]}
                                        // ref={el => slide.flying_objects.mobile.ref = el}
                                        width={slide.flying_objects.mobile.width}
                                        imageUrl={slide.flying_objects.mobile.image.url}
                                        frames={+slide.flying_objects.mobile.frames}
                                        duration={+slide.flying_objects.mobile.duration}
                                        initial_duration={
                                            +slide.flying_objects.mobile.initial_duration
                                        }
                                        frame_x={+slide.flying_objects.mobile.frame_x}
                                        frame_y={+slide.flying_objects.mobile.frame_y}
                                        alt={slide.flying_objects.mobile.image.alt}
                                        type={slide.flying_objects.mobile.type}
                                        loop_start_index={
                                            +slide.flying_objects.mobile.loop_start_index
                                        }
                                    />
                                    <div className="title-wrapper">
                                        <span className={"slide-number"}>{slideIndex + 1}</span>
                                        <div
                                            className={"title"}
                                            dangerouslySetInnerHTML={{ __html: slide.title }}
                                        />
                                    </div>
                                    <div className="buttons">
                                        {media !== "mobile" ? (
                                            <Link
                                                className={"btn slide-cta small"}
                                                target={slide.button.target}
                                                href={slide.button.url}
                                                onClick={(e) => slideIndex === 0 ? handleClick1(e) : {}}
                                            >
                                                <span className="text">{slide.button.title}</span>
                                                <svg className={"right-arrow"} viewBox="0 0 22 10">
                                                    <path fill="none" stroke="#fff" d="M0 5h22" />
                                                    <path fill="none" stroke="#fff" d="M17 10v0l5-5-5-5" />
                                                </svg>
                                            </Link>
                                        ) : null}
                                        {media !== "mobile" && slide.button_2 ? (
                                            <Link
                                                className={"btn slide-cta small secondary color2"}
                                                target={slide.button_2.target}
                                                href={slide.button_2.url}
                                                onClick={(e) => slideIndex === 0 ? handleClick2(e) : {}}
                                            >
                                                <span className="text">{slide.button_2.title}</span>
                                                <svg className={"right-arrow"} viewBox="0 0 22 10">
                                                    <path fill="none" stroke="#fff" d="M0 5h22" />
                                                    <path fill="none" stroke="#fff" d="M17 10v0l5-5-5-5" />
                                                </svg>
                                            </Link>
                                        ) : null}
                                        {media !== "mobile" && slide.button_3 ? (
                                            <Link
                                                className={"btn slide-cta secondary small color3"}
                                                target={slide.button_3.target}
                                                href={slide.button_3.url}
                                                onClick={(e) => slideIndex === 0 ? handleClick3(e, slide.button_3.url) : {}}
                                            >
                                                <span className="text">{slide.button_3.title}</span>
                                                <svg className={"right-arrow"} viewBox="0 0 22 10">
                                                    <path fill="none" stroke="#fff" d="M0 5h22" />
                                                    <path fill="none" stroke="#fff" d="M17 10v0l5-5-5-5" />
                                                </svg>
                                            </Link>
                                        ) : null}
                                    </div>
                                </Container>
                            </SwiperSlide>
                        )
                    })}
                </Slider>
                <div ref={paginationRef} />
                {media === "mobile" ? (
                    <Container className={"btn-mobile-container"}>
                        <Link
                            className={"btn-mobile slide-cta"}
                            target={slidesObj[currentSlide]?.button.target}
                            href={slidesObj[currentSlide]?.button.url}
                            onClick={() => slideIndex === 0 ? handleClick1() : {}}
                        >
                            {slidesObj[currentSlide]?.button.title}
                        </Link>
                        {slidesObj[currentSlide]?.button_2 ? (
                            <Link
                                className={"btn-mobile slide-cta color2"}
                                target={slidesObj[currentSlide]?.button_2.target}
                                href={slidesObj[currentSlide]?.button_2.url}
                                onClick={() => slideIndex === 0 ? handleClick2() : {}}
                            >
                                {slidesObj[currentSlide]?.button_2.title}
                            </Link>
                        ) : null}
                        {slidesObj[currentSlide]?.button_3 ? (
                            <Link
                                className={"btn-mobile slide-cta color3"}
                                target={slidesObj[currentSlide]?.button_3.target}
                                href={slidesObj[currentSlide]?.button_3.url}
                                onClick={() => slideIndex === 0 ? handleClick3(slidesObj[currentSlide]?.button_3.url) : {}}
                            >
                                {slidesObj[currentSlide]?.button_3.title}
                            </Link>
                        ) : null}

                    </Container>
                ) : null}
            </div>
            <Footer ref={footer} className="homepage" />
        </div>
    );
};
HomeSlider.prototype = {
    className: PropTypes.string,
};
export default styled(connect(HomeSlider))`
  position: relative;
  height: calc(var(--vh, 1vh) * 100);
  width: 100%;
  overflow: hidden;
  
  @media (max-width: 798px) {
    overflow: scroll;
  }

  .vertical-center {
    position: relative;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: stretch;
    height: 100%;
    flex-direction: column;
    z-index: 0;
    @media (min-width: 991.98px) {
			margin-top: 3rem;
      position: absolute;
      top: 0;
      bottom: 0;
    }
    @media (max-width: 575.98px) {
      justify-content: flex-start;
      margin-top: 100px;
      height: auto;
    }

    .container {
      @media (min-width: 992px) {
        padding-left: ${size(120)};
      }
    }
  }

  .buttons {
    display: flex;
    a {
      margin-right: 2rem;
    }
  }

  .welcome-text {
    z-index: 4;
    position: relative;
    margin-bottom: ${size(15)};
    @media (max-width: 991.98px) {
      margin-bottom: ${size(28)};
    }
    @media (max-width: 575.98px) {
      margin-bottom: 5.2vh;
    }

    .title {
      color: #b5d2ff;
      font-size: ${size(40)};
      font-weight: 400;
      margin-bottom: 8px;
      @media (max-width: 991.98px) {
        font-size: ${size(35)};
      }
      @media (max-width: 575.98px) {
        font-size: 3.2vh;
      }
    }

    .subtitle {
      color: rgba(181, 210, 255, 0.4);
      font-size: ${size(29)};
      font-weight: 300;
      @media (max-width: 991.98px) {
        font-size: ${size(24)};
      }
      @media (max-width: 575.98px) {
        font-size: 2.46vh;
      }
    }
  }

  .swiper-arrows {
    position: absolute;
    width: 100%;
    bottom: 100%;
    right: 0;
    z-index: 5;
    @media (max-width: 575.98px) {
      display: none;
    }

    ${Container} {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .prev,
    .next {
      cursor: pointer;
      transition: margin 0.4s ease, width 0.4s ease, opacity 0.4s ease;
      overflow: hidden;
      width: ${size(210)};
      position: relative;
      height: ${size(30)};
      display: flex;
      align-items: center;
      
      svg, svg path {
        transition: all 0.4s ease;
      }

      &:hover {
        width: ${size(230)};

        svg path {
          stroke: #fe412d;
        }
      }

      svg {
        position: absolute;
        width: ${size(230)};
        height: auto;
      }

      &.swiper-button-disabled {
        cursor: not-allowed;
        opacity: 0.4;
        width: ${size(20)};
      }
    }

    .prev {
      svg {
        left: 0;
      }
    }

    .next {
      svg {
        right: 0;
      }

      &.swiper-button-disabled {
        margin-right: ${size(49)};
      }
    }

    .slides-numbers {
      color: #b5d2ff;
      font-size: ${size(20)};
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: ${size(95)};
      text-align: left;
      margin: 0 ${size(15)};

      span {
        margin-left: ${size(9)};
        margin-right: ${size(5)};
      }
    }
  }

  .swiper-pagination-bullets {
    position: relative;
    display: flex;
    z-index: 9;
    transform: none !important;
    margin: 0 auto;

		@media (min-width: 575.98px) {
			margin: 5rem auto 0;
		}

    .swiper-pagination-bullet {
      width: ${size(10)};
      height: ${size(10)};
      @media (max-width: 575.98px) {
        width: 1.58vh;
        height: 1.58vh;
        margin: 2rem 12px 0.5rem;
        display: block;
      }
      border-radius: 50%;
      background-color: rgba(181, 210, 255, 0.4);
      margin: 0 ${size(5)};
      cursor: pointer;
      transition: 400ms ease;

      &:hover {
        background-color: rgba(181, 210, 255, 0.7);
      }

      &.swiper-pagination-bullet-active {
        background-color: #b5d2ff;
      }
    }
  }

  .btn-mobile-container {
    z-index: 15;

    .btn-mobile {
      margin-top: 2rem;
      display: block;
      padding: 1.5rem;
      border-radius: 3.94vh;
      background-color: #fe412d;
      font-size: 1.97vh;
      font-weight: 400;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;

      &.secondary {
        background: none;
        border: 1px solid #fe412d;
      }

      @media (max-width: 576px) {
        display: block;
        width: 220px;
        padding: 1.2rem;
        border-radius: 3.94vh;
        margin: 2rem auto;
        font-size: 1.5rem;
        text-align: center;
      }
    }
  }

  .mobile-icon {
    max-width: 20em;
    @media (min-width: 576px) {
      display: none;
    }
    position: relative;
    margin: 0 auto;
    display: block;
  }

  .slide-cta {
    &:hover {
      .right-arrow {
        width: ${size(22)};
      }
    }
    &.small {
      height:5.4rem;
      padding-right:3.2rem;
      padding-left: 3.2rem;
    }

    &.color3 {
      background-color: #0276bb!important;
      border-color: #0276bb!important;
    }
    &.color2 {
      background-color: #472f92!important;
      border-color: #472f92!important;
    }

    .right-arrow {
      width: 0;
      height: auto;
      stroke-width: 1;
      transition: width 0.4s;
    }
  }

  .flying-obj-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @media (max-width: 575.98px) {
      display: none;
    }

    &.hide {
      opacity: 0;
    }
  }
`;
