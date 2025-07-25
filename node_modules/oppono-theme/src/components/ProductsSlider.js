import React from "react";
import PropTypes from "prop-types";
import { P } from "./form-components/StyledComponent";

import { connect, styled } from "frontity";
import classnames from "classnames";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import CustomEase from "gsap/CustomEase";

import SwiperCore, {
    A11y,
    Controller,
    Keyboard,
    Navigation,
    Pagination,
    Thumbs,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { size } from "../functions/size";

import Container from "./reusable/Container";
import FlyingObj from "./reusable/FlyingObj";
import Link from "./reusable/Link";
import MegaloNum from "./form-components/MegaloNum";
import Button from "./form-components/Button";
import Header from "./Header";
import Footer from "./Footer";

SwiperCore.use([Navigation, Pagination, Keyboard, A11y, Controller, Thumbs]);
gsap.registerPlugin(SplitText, DrawSVGPlugin, CustomEase);

const Buttons = styled(Swiper)`
.buttons {
    display: flex;
    justify-content: center;
    gap: 30px;

    @media(max-width: 575px) {
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
}

p.text {
    text-align: center;
    color: #d2f5e9!important;
    font-size: 18px;
    margin: 40px 0;

    @media(max-width: 575px) {
        margin: 20px 0;
    }
}

.btn {
    width: auto;
    max-width: fit-content;
    padding: 0 ${size(32)};
    height: ${size(64)};
    display: flex !important;
    align-items: center;
    justify-content: center;
    border-radius: ${size(32)};
    background-color: #fe412d;
    color: #ffffff;
    font-size: ${size(16)};
    font-weight: 400;
    text-decoration: none;
    margin-top: 0 !important;
    cursor: pointer;
    white-space: nowrap;
    transition: .2s;
    margin-left: 0 !important;

    @media(max-width: 575px) {
        margin-top: 0;
    }

    &.color2 {
        background-color: #472f92;
    }
    &.color3 {
        background-color: #0276bb;
    }

    &:hover,
    &:active,
    &:focus {
      text-decoration: none;

      svg {
        width: 20px !important;
      }
    }

    svg {
      width: 0px !important;
      transition: .2s;
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
`

const Slider = styled(Swiper)`
  z-index: 5;
  width: 100%;
  position: relative;
  overflow: visible !important;
  @media (min-width: 991.98px) {
    margin: 4rem 0;
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
      font-size: ${size(10)};
      font-weight: 600;
      width: ${size(23)};
      height: ${size(23)};
      border: 1px solid rgba(181, 210, 255, 0.4);
      border-radius: 50%;
      position: absolute;
      left: ${size(-35)};
      top: ${size(30)};
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
      font-weight: 300;
      font-style: normal;
      letter-spacing: normal;
      line-height: ${size(95)};
      text-align: left;
      @media (max-width: 991.98px) {
        font-size: ${size(60)};
        line-height: ${size(70)};
      }
      @media (max-width: 575.98px) {
        font-size: 2vh !important;
        line-height: 2.43vh !important;
      }
    }
  }

  .btn {
    width: auto;
    max-width: fit-content;
    padding: 0 ${size(32)};
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

  @media (max-width: 575.98px) {
    padding-bottom: ${size(6)};
  }
`;

const createSlideAnimation = (slide, paused = true, initial = false) => {
    if (!slide) return;
    const title = slide.querySelector(".title"),
        number = slide.querySelector(".number"),
        subtitle = slide.querySelector(".subtitle"),
        table = slide.querySelector("table"),
        trs = table.querySelectorAll("tr"),
        tableNumbers = table.querySelectorAll(".animate-number"),
        slideAnimationTl = gsap.timeline({ paused }),
        stagger = 0.2;
    if (initial) {
        return gsap.fromTo(
            [title, number, subtitle],
            { autoAlpha: 0, y: 100 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                stagger: 0.3,
                overwrite: "auto",
            }
        );
    }

    slideAnimationTl
        .fromTo(
            number,
            { innerHTML: 0 },
            {
                innerHTML: (_, element) => +element.dataset.number,
                duration: 1,
                ease: "power2.out",
                modifiers: {
                    innerHTML: (value, target) =>
                        value.toFixed?.(target.dataset.toFixed ?? 0),
                },
                stagger: 0.2,
                immediateRender: true,
            },
            "<+=0.5"
        )
        .fromTo(
            trs,
            { yPercent: 30, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, stagger, duration: 1 }
        )
        .fromTo(
            tableNumbers,
            { innerHTML: 0 },
            {
                innerHTML: (_, element) => +element.dataset.number,
                duration: 1,
                ease: "power2.out",
                modifiers: {
                    innerHTML: (value, target) =>
                        value.toFixed?.(target.dataset.toFixed ?? 0),
                },
                stagger: 0.2,
            },
            "<+=0.5"
        );
    return slideAnimationTl;
};

const ProductsSlider = ({
    className,
    active = false,
    link,
    state,
    actions,
}) => {
    const data = state.source.get(link);
    const {
        page_theme,
        slider_top_subtitle,
        slider_top_title,
        sub_header,
        slider: slidesObj = [],
    } = data.isReady && !data.isError ? state.source[data.type][data.id].acf : {};
    React.useEffect(() => {
        actions.theme.setSubHeader(sub_header);
    }, [sub_header]);
    const nextBtnRef = React.useRef(null);
    const prevBtnRef = React.useRef(null);
    const paginationRef = React.useRef(null);
    const flyingWrapperRef = React.useRef(null);
    const slidesNumbers = React.useRef(null);
    const [swiperRef, setSwiperRef] = React.useState(null);
    const [thumbsSwiper, setThumbsSwiper] = React.useState(0);
    const [slideFlyingObjectsPlaying, setSlideFlyingObjectsPlaying] =
        React.useState([]);
    const slidesAnimation = React.useRef({});
    const slidesTransition = React.useRef(0);
    const initialTimeline = React.useRef(gsap.timeline({ paused: false }));
    const flyingObjectsAnimation = React.useRef(gsap.timeline({ paused: true }));
    const allProductsFetched = React.useRef([]);

    React.useEffect(() => {

        const params = new URLSearchParams(window.location.search);
        const vsref = params.get("_vsrefdom");
        const source = params.get("source");

        if (vsref && source) {
            actions.theme.setReference({
                ref: vsref,
                source: source,
            });
        }
    });

    React.useEffect(() => {
        actions.theme.setActiveTheme(page_theme);
    }, [page_theme]);
    const swiperInit = async (swiper) => {
        await Promise.all(allProductsFetched.current);
        setTimeout(() => {
            const { slides } = swiper;
            for (let i = 0; i < slides?.length; i++) {
                slidesAnimation.current[i] = createSlideAnimation(slides[i]);
            }
            setSwiperRef(swiper);
        }, 500);
    };

    React.useEffect(() => {
        actions.source.fetch(state.router.link);
        flyingObjectsAnimation.current.progress(1).progress(0);
        // window.removeEventListener('keydown', keyHandler);
        actions.theme.setSubHeader({});
    }, []);

    React.useEffect(() => {
        allProductsFetched.current = slidesObj?.map((slide) => {
            return actions.source.fetch(
                "/" + slide.product.post_type + "/" + slide.product.post_name
            );
        });
    }, [data.isReady]);

    React.useEffect(() => {
        if (!swiperRef) {
            return;
        }
        const nextArrow = nextBtnRef.current.querySelectorAll("svg path"),
            prevArrow = prevBtnRef.current.querySelectorAll("svg path");
        initialTimeline.current.clear();
        initialTimeline.current
            .fromTo(
                flyingWrapperRef.current,
                { y: 0, yPercent: 100 },
                { y: 0, yPercent: 0 }
            )
            .addLabel("initial-slide")
            .call(() => createSlideAnimation(swiperRef?.slides?.[0], false, true))
            .call(() => {
                setTimeout(() => slidesAnimation.current[0]?.play(), 300);
            }, null)
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
            .from(
                ".swiper-slide-thumb",
                {
                    y: 30,
                    autoAlpha: 0,
                    stagger: 0.15,
                    duration: 1,
                    clearProps: "all",
                },
                "initial-slide"
            );
    }, [swiperRef]);

    React.useEffect(() => {
        initialTimeline.current.paused(!active);
    }, [active]);

    React.useEffect(() => {
        actions.theme.checkUser();
    }, [state.theme.user.logged]);

    const SignUpLink = connect(({ state }) =>
        state.theme.user.logged ? (
            <Link href={"/d/"} className={"cta-btn"}>
                <Button className={"wide"} label={"View online"} />
            </Link>
        ) : (
            <Link href={"/create-account/"} className={"cta-btn"}>
                <Button
                    className={"wide"}
                    label={"View online"}
                />
            </Link>
        )
    );

    return (
        <div className={classnames(page_theme, className)}>
            <Header state={state} />
            <div className={"product-slider"}>
                <div ref={flyingWrapperRef} className="flying-obj-wrapper">
                    {slidesObj?.map((slide, slideIndex) =>
                        slide?.flying_objects?.desktop?.map((obj, objIndex) => {
                            return (
                                <FlyingObj
                                    // ref={el => obj.ref = el}
                                    disableFloating
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

                {data.isReady && (
                    <Slider
                        speed={1500}
                        a11y
                        spaceBetween={0}
                        slidesPerView={1}
                        navigation={{
                            prevEl: prevBtnRef.current,
                            nextEl: nextBtnRef.current,
                        }}
                        onSwiper={swiperInit}
                        keyboard
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
                        thumbs={{ swiper: thumbsSwiper }}
                        onSlideChange={({ realIndex, previousIndex }) => {
                            setTimeout(() => {
                                slidesAnimation.current[realIndex].progress(0).play();
                                slidesAnimation.current[previousIndex]
                                    .progress(1)
                                    .paused(true)
                                    .progress(0);
                            }, 750);
                            setTimeout(
                                () =>
                                    setSlideFlyingObjectsPlaying((prevState) => {
                                        const newState = [...prevState];
                                        newState[realIndex] = true;
                                        return newState;
                                    }),
                                1000
                            );
                        }}
                    >
                        <Container className={"swiper-arrows-container"}>
                            <span className={"prev"} ref={prevBtnRef}>
                                <svg viewBox="0 0 99 10">
                                    <path fill="none" stroke="#b5d2ff" d="M99 5H0" />
                                    <path fill="none" stroke="#b5d2ff" d="M5 0L0 5 L5 10" />
                                </svg>
                            </span>
                            <span className={"next"} ref={nextBtnRef}>
                                <svg viewBox="0 0 99 10">
                                    <path fill="none" stroke="#b5d2ff" d="M0 5H99" />
                                    <path fill="none" stroke="#b5d2ff" d="M94 10L99 5L94 0" />
                                </svg>
                            </span>
                        </Container>

                        {slidesObj?.map((slide, slideIndex) => {
                            const product =
                                state.source[slide.product.post_type]?.[slide.product.ID];

                            return (
                                <SwiperSlide key={`slide-${slideIndex}`}>
                                    <Container>
                                        <MegaloNum>
                                            <div
                                                className={"form-headline-1 title"}
                                                dangerouslySetInnerHTML={{ __html: slide.title }}
                                            />
                                            <p
                                                animate-number
                                                className={"number"}
                                                data-number={parseFloat(
                                                    product?.acf?.variable_rate === "0"
                                                        ? product?.acf?.rate
                                                        : product?.acf?.variable_rate
                                                )}
                                                data-to-fixed={2}
                                            >
                                                {/* product?.slug === '2nd-heloc-750-75'? parseFloat(product?.acf?.rate) : parseFloat(product?.acf?.rate) + (product?.acf?.type == "HELOC" || product?.acf?.type == "BELOC" ? 0.75 : 0) */}
                                                0.00
                                            </p>
                                            <div
                                                className={"form-headline-1 subtitle"}
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        product?.acf?.slider_title === "HELOC"
                                                            ? "Fixed Rate"
                                                            : slideIndex === 0 ? "Variable Rate (6 months)" : "Variable Rate",
                                                }}
                                            />
                                        </MegaloNum>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <P.D
                                                            as={"span"}
                                                            className={"animate-number"}
                                                            data-to-fixed={2}
                                                            data-number={product?.acf?.rate}
                                                        >
                                                            0
                                                        </P.D>
                                                        <P.D as={"span"}>%</P.D>
                                                    </td>
                                                    <td>
                                                        <P.White>
                                                            <strong>Fixed rate</strong>
                                                        </P.White>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <P.D
                                                            as={"span"}
                                                            className={"animate-number"}
                                                            data-to-fixed={2}
                                                            data-number={product?.acf?.fee}
                                                        >
                                                            0
                                                        </P.D>
                                                        <P.D as={"span"}>%</P.D>
                                                    </td>
                                                    <td>
                                                        <P.White>
                                                            <strong>Lender fee</strong>
                                                        </P.White>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <P.D
                                                            as={"span"}
                                                            className={"animate-number"}
                                                            data-to-fixed={0}
                                                            data-number={product?.acf?.maximum_ltv}
                                                        >
                                                            0
                                                        </P.D>
                                                        <P.D as={"span"}>%</P.D>
                                                    </td>
                                                    <td>
                                                        <P.White>
                                                            <strong>Max LTV</strong>
                                                        </P.White>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </Container>
                                </SwiperSlide>
                            );
                        })}
                    </Slider>
                )}
                <Container className={"thumbs-container"}>
                    {slidesObj?.map((slide, i) => {
                        const product =
                            state.source[slide.product.post_type]?.[slide.product.ID];
                        return (
                            <div
                                key={`thumb-${i}`}
                                onClick={() => swiperRef.slideToLoop(i, 1500, true)}
                                className={classnames("swiper-slide-thumb", {
                                    active: i === swiperRef?.realIndex,
                                })}
                                dangerouslySetInnerHTML={{ __html: product?.acf?.slider_title }}
                            />
                        )
                    })}
                </Container>
                <Buttons>
                    <p class="text">Submit an application through...</p>
                    <div className="buttons">
                        <Link
                            className={"btn slide-cta small secondary color"}
                            target={"_blank"}
                            href={"https://expert.filogix.com/expert/view/SignOn?locale=en_ca"}
                        >
                            <span className="text">Filogix</span>
                            <svg className={"right-arrow"} viewBox="0 0 22 10">
                                <path fill="none" stroke="#fff" d="M0 5h22" />
                                <path fill="none" stroke="#fff" d="M17 10v0l5-5-5-5" />
                            </svg>
                        </Link>
                        <Link
                            className={"btn slide-cta small secondary color2"}
                            target={"_blank"}
                            href={"https://velocity.newton.ca/members/login"}
                        >
                            <span className="text">Velocity</span>
                            <svg className={"right-arrow"} viewBox="0 0 22 10">
                                <path fill="none" stroke="#fff" d="M0 5h22" />
                                <path fill="none" stroke="#fff" d="M17 10v0l5-5-5-5" />
                            </svg>
                        </Link>
                        <Link
                            className={"btn slide-cta small secondary color3"}
                            target={"_blank"}
                            href={"https://app.finmo.ca/login"}
                        >
                            <span className="text">Finmo</span>
                            <svg className={"right-arrow"} viewBox="0 0 22 10">
                                <path fill="none" stroke="#fff" d="M0 5h22" />
                                <path fill="none" stroke="#fff" d="M17 10v0l5-5-5-5" />
                            </svg>
                        </Link>
                    </div>
                    <p class="text">See all our products</p>
                </Buttons>
                <div className="btn-group">
                    <SignUpLink />
                    <a
                        className={"cta-btn"}
                        href={state.source[data.type][data.id].acf?.products_pdf?.url}
                        target="_blank"
                    >
                        <Button
                            className={"wide bordered"}
                            label={"Download product list"}
                        />
                    </a>
                </div>
                <div className="terms-text">
                    Terms and conditions apply to all rates & products
                </div>
            </div>
            <Footer />
        </div>
    );
};
ProductsSlider.prototype = {
    className: PropTypes.string,
};
export default styled(connect(ProductsSlider))`
  height: calc(var(--vh, 1vh) * 100);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${Header}, ${Footer} {
    background: none !important;
  }

  .product-slider {
    position: relative;
    width: 100%;
    overflow-x: hidden;
    padding-top: ${size(25)};
    margin-top: ${size(120)};
    margin-bottom: ${size(50)};
    padding-bottom: ${size(20)};
  }

  ${MegaloNum} {
    margin-bottom: 0;
    text-align: center;

    .number {
      display: inline-block;
      position: relative;
      letter-spacing: -5px;
      font-size: ${size(220)};

      &:before {
        content: "%";
        position: absolute;
        right: ${size(-20)};
        top: ${size(20)};
        color: #d2f5e9;
        font-size: ${size(25)};
        font-weight: 300;
        line-height: ${size(34)};
      }

      @media (max-width: 991.98px) {
        font-size: ${size(140)};
        line-height: ${size(180)};
      }
      @media (max-width: 575.98px) {
        font-size: ${size(90)};
        line-height: ${size(95)};
      }
    }

    .form-headline-1 {
      @media (max-width: 575.98px) {
        font-size: 3vh;
        line-height: 3.43vh;
      }
    }
  }

  table {
    position: absolute;
    right: ${size(250)};
    top: ${size(65)};

    td:first-of-type {
      padding-right: ${size(34)};
      @media (max-width: 575.98px) {
        padding-right: 1rem;
        width: 50%;
        text-align: right;
      }
    }

    @media (max-width: 991.98px) {
      right: ${size(55)};
      top: ${size(40)};
    }
    @media (max-width: 575.98px) {
      position: unset;
      margin: ${size(6)} auto 0;
      width: 100%;
    }
  }

  ${Button} {
    @media (max-width: 991.98px) {
      padding: ${size(10)} ${size(26)} !important;
    }
    @media (max-width: 575.98px) {
      padding: ${size(18)} ${size(20)} !important;
      white-space: normal;
    }
  }

  .swiper-arrows-container {
    position: absolute;
    height: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    z-index: 9;
    //@media(max-width: 575.98px){
    //  display: none;
    //}
    &${Container} {
      display: flex;
      align-items: center;
      justify-content: flex-end;

      @media (max-width: 575.98px) {
        &:after {
          content: "";
          height: ${size(1)};
          width: 100%;
          background-color: #d2f5e9;
          margin-top: auto;
        }
      }
    }

    .prev,
    .next {
      cursor: pointer;
      transition: margin 0.4s ease, width 0.4s ease, opacity 0.4s ease;
      overflow: hidden;
      width: ${size(99)};
      height: ${size(30)};
      display: flex;
      align-items: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      overflow: hidden;
      @media (max-width: 575.98px) {
        width: ${size(25)};
        top: 30%;
      }

      svg {
        position: absolute;
        width: ${size(99)};
        height: ${size(10)};
      }

      &.swiper-button-disabled {
        cursor: not-allowed;
        opacity: 0.4;
        width: ${size(50)};
        @media (max-width: 575.98px) {
          width: ${size(20)};
        }
      }
    }

    .prev {
      left: 1rem;
      @media (max-width: 991.98px) {
        left: ${size(32)};
      }

      svg {
        left: 0;
      }
    }

    .next {
      right: 1rem;
      @media (max-width: 991.98px) {
        right: ${size(32)};
      }

      svg {
        right: 0;
      }

      &.swiper-button-disabled {
        margin-right: ${size(49)};
      }
    }
  }

  .swiper-pagination-bullets {
    position: relative;
    display: flex;
    z-index: 9;
    justify-content: center;
    align-items: center;
    margin-top: ${size(40)};
    margin-bottom: ${size(31)};
    @media (max-width: 991.98px) {
      max-width: 90%;
      margin-right: auto;
      margin-left: auto;
    }
  }

  .thumbs-container {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    flex-wrap: wrap;

    @media (min-width: 922px) {
      max-width: 100%;
      width: 100%;
    }
    @media (max-width: 575.98px) {
      max-width: 100%;
      width: 100%;
    }
  }

  .thumbs-swiper {
    margin-top: ${size(28)};
    max-width: 67%;
    @media (max-width: 991.98px) {
      max-width: 100%;
    }
    @media (max-width: 575.98px) {
      margin-top: ${size(10)};
    }
  }

  .swiper-slide-thumb {
    width: 100%;
    //height: ${size(50)};
    padding-top: ${size(14)};
    cursor: pointer;
    transition: opacity 400ms ease;
    opacity: 0.4;
    color: #d2f5e9;
    font-size: ${size(12)};
    font-weight: 300;
    letter-spacing: ${size(0.48)};
    line-height: ${size(16)};
    border-top: 1px solid #d2f5e9;
    flex: 1 1 20%;

    &:hover {
      opacity: 1;
    }

    &.active {
      opacity: 1;
      font-size: ${size(16)};
      font-weight: 500;
    }

    @media (max-width: 575.98px) {
      flex: 0 0 50%;
      border-top: none;
      text-align: center;
      //br {
      //  display: none;
      //}
    }
  }

  .terms-text {
    color: rgba(210, 245, 233, 0.4);
    font-size: ${size(14)};
    font-weight: 400;
    text-align: center;
    margin-top: ${size(15)};
    @media (max-width: 991.98px) {
      margin-top: ${size(10)};
    }
  }

  .flying-obj-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 0;
    height: 100%;
    @media (max-width: 575.98px) {
      display: none;
    }
  }

  .cta-btn {
    position: relative;
    z-index: 1;

    &:first-of-type {
        margin-right: 20px;

        @media(max-width: 575px) {
            margin-right: 0;
        }
    }
  }

  @media (max-width: 575.98px) {
    ${P.D}, ${P.Dark}, .oppono-btn {
      font-size: 1.4rem;
      line-height: 2rem;
    }
  }
`;
