import React from "react";
import { styled } from "frontity";
import PropTypes from "prop-types";

import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import intro_ball_1 from "../assets/images/intro_ball_1.png";
import intro_ball_2 from "../assets/images/intro_ball_2.png";
import intro_ball_3 from "../assets/images/intro_ball_3.png";

import introLogoSrc from "../assets/sprite-sheets/intro-logo.png";
import SpriteSheet from "./reusable/SpriteSheet";
import { size } from "../functions/size";

gsap.registerPlugin(SplitText);
const Intro = ({ className, setInitialDone }) => {
    const skipped = React.useRef(false);

    const introTransitionTl = React.useRef(null);

    const introRef = React.useRef(null);
    const ballsRef = React.useRef({});
    const skipRef = React.useRef(null);
    const textRef = React.useRef(null);
    const logoRef = React.useRef(null);
    const gradientRef = React.useRef(null);

    const [logoPaused, setLogoPaused] = React.useState(true);

    gsap.defaults({ overwrite: "auto" });
    React.useEffect(() => {
        window.scrollTo(0, 0);
        const balls = Object.values(ballsRef.current);
        // const ballsTl = gsap
        //   .timeline()
        //   .set(balls, { xPercent: -50, yPercent: -50 })
        //   .addLabel("balls-start-animation")
        //   .to(
        //     balls,
        //     {
        //       autoAlpha: 1,
        //       duration: 3,
        //       delay: gsap.utils.wrap([0, 0.5, 1.5]),
        //       ease: "linear",
        //     },
        //     "balls-start-animation"
        //   )
        //   .to(
        //     balls,
        //     {
        //       rotation: gsap.utils.wrap([90, 90, -90]),
        //       ease: "linear",
        //       duration: 15,
        //     },
        //     "balls-start-animation"
        //   )
        //   .to(
        //     balls,
        //     {
        //       x: gsap.utils.wrap(["-=100", "+=20", "+=40"]),
        //       duration: 15,
        //       ease: "linear",
        //     },
        //     "balls-start-animation"
        //   )
        //   .to(
        //     balls,
        //     {
        //       y: gsap.utils.wrap(["-=30", "-=150", "+=20"]),
        //       duration: 15,
        //       ease: "linear",
        //     },
        //     "balls-start-animation"
        //   );
        const skipLine = skipRef.current.querySelector(".line span");
        const skipText = skipRef.current.querySelector("p");

        // const skipTl = gsap
        //     .timeline()
        //     .set(skipText, { y: -30 })
        //     .to(skipRef.current, { autoAlpha: 1, duration: 0.8 })
        //     .to(skipText, { y: 0 }, 0);

        // const textWords = new SplitText(textRef.current, { type: "words" });
        // const textTl = gsap
        //     .timeline()
        //     .set(textWords.words, { autoAlpha: 0, yPercent: 30 })
        //     .set(textRef.current, { autoAlpha: 1 })
        //     .to(textWords.words, {
        //         autoAlpha: 1,
        //         yPercent: 0,
        //         duration: 0.8,
        //         stagger: { amount: 0.5 },
        //     })
        //     .to(textRef.current, { autoAlpha: 0, scale: 1.3, duration: 0.3 }, "+=2");
        // // setTimeout(()=>setLogoPaused(false),3000)
        // const logoTl = gsap
        //     .timeline()
        //     .call(() => setLogoPaused(false), 0)
        //     .to(logoRef.current, { autoAlpha: 1, duration: 0.4 }, 0.02);

        introTransitionTl.current = () =>
            skipped.current
                ? gsap.timeline()
                : gsap
                    .timeline()

                    .to(
                        skipLine,
                        { height: "100%", duration: 0.2, ease: "power2.in" },
                        "intro-exit"
                    )
                    .to(
                        introRef.current,
                        { marginTop: "-100vh", duration: 0.4, ease: "power2.in" },
                        "intro-exit+=.5"
                    )
                    .set(document.body, { height: "100%", overflow: "visible" })
                    .call(() => setInitialDone(true))
                    .to(gradientRef.current, { yPercent: -100 })
                    .set(introRef.current, { display: "none" })
                    .timeScale(0.7);

        const introTl = gsap
            .timeline()
            .set(document.body, { height: "100%", overflow: "hidden" })
            .call(introTransitionTl.current, null, "0");
    }, []);

    return (
        <div ref={introRef} className={className}>
            <div className="balls-wrapper">
                <img
                    ref={(el) => (ballsRef.current.ball1 = el)}
                    className={"floating-ball intro-ball-1"}
                    src={intro_ball_1}
                    alt="{'Floating Ball'}"
                />
                <img
                    ref={(el) => (ballsRef.current.ball2 = el)}
                    className={"floating-ball intro-ball-2"}
                    src={intro_ball_3}
                    alt="{'Floating Ball'}"
                />
                <img
                    ref={(el) => (ballsRef.current.ball3 = el)}
                    className={"floating-ball intro-ball-3"}
                    src={intro_ball_2}
                    alt="{'Floating Ball'}"
                />
            </div>
            <p className={"intro-text"} ref={textRef}>
                Welcome to Oppono lending, committed to funding.
            </p>
            <SpriteSheet
                paused={logoPaused}
                repeat={0}
                duration={2.5}
                className={"intro-logo"}
                ref={logoRef}
                imageUrl={introLogoSrc}
                frames={52}
                width={size(323)}
                alt={"Intro Logo"}
                frame_x={653}
                frame_y={500}
            />

            <div
                ref={skipRef}
                className={"scroll-animation"}
                onClick={() => {
                    if (!skipped.current) {
                        introTransitionTl.current().play();
                        skipped.current = true;
                    }
                }}
            >
                <div className={"line"}>
                    <span />
                </div>
                <p>Skip</p>
            </div>

            <div ref={gradientRef} className={"intro-bottom-gradient"} />
        </div>
    );
};

Intro.prototype = {
    className: PropTypes.string,
};
export default styled(Intro)`
  position: relative;
  background: #20212c;
  background: radial-gradient(circle at top left, #000000, #20212c 40%);
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  margin-bottom: -1px;

  @media (max-width: 575px) {
    transform: translateY(-150px);
  }

  .intro-bottom-gradient {
    position: absolute;
    top: 100%;
    background: linear-gradient(to bottom, #20212c, transparent);
    height: 40vh;
    width: 100%;
  }

  .intro-text {
    opacity: 0;
    color: #bfb6b4;
    font-size: ${size(29)};
    font-weight: 300;
    font-style: normal;
    letter-spacing: normal;
    line-height: ${size(40)};
    text-align: center;
    max-width: ${size(495)};
    z-index: 1;
    @media (max-width: 575px) {
      max-width: 85rem;
      font-size: ${size(22)};
      line-height: ${size(34)};
    }
  }

  .intro-logo {
    opacity: 0;
    position: absolute;
    visibility: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    //background: rgba(255,255,255,.4);
  }

  .balls-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    @media (min-width: 1920px) {
      max-width: 1920px;
    }

    .floating-ball {
      position: absolute;
      opacity: 0;

      &.intro-ball-1 {
        top: 71.2179487%;
        left: ${size(1151.5)};
        width: ${size(117)};
        transform: rotate(320deg);
        @media (max-width: 991px) {
          width: ${size(57)};
          top: 80%;
          left: 95%;
        }
      }

      &.intro-ball-2 {
        top: 33.2051282%;
        left: ${size(322)};
        width: ${size(184)};
        transform: rotate(200deg);
        @media (max-width: 991px) {
          width: ${size(92)};
          top: 30%;
          left: 15%;
        }
      }

      &.intro-ball-3 {
        top: 42.6923077%;
        left: ${size(943)};
        width: ${size(96)};
        @media (max-width: 991px) {
          width: ${size(48)};
          left: 85%;
        }
      }
    }
  }

  .scroll-animation {
    opacity: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    bottom: ${size(93)};
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;

    div.line {
      position: relative;
      width: ${size(1)};
      height: ${size(101)};
      background: rgba(191, 182, 180, 0.1);

      span {
        position: absolute;
        top: 0;
        left: 0;
        width: ${size(1)};
        height: ${size(22)};
        background: #bfb6b4;
      }
    }

    p {
      color: #bfb6b4;
      font-size: ${size(14)};
      font-weight: 400;
      font-style: normal;
      letter-spacing: normal;
      line-height: ${size(16)};
      text-align: center;
      margin-top: ${size(24)};
    }
  }
`;
