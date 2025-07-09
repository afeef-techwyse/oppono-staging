import gsap from "gsap";
import React from "react";

import { connect, styled } from "frontity";

import Container from "../components/reusable/Container";
import classnames from "classnames";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { size } from "../functions/size";
import CustomVideoPlayer from "../components/CustomVideoPlayer";

const ProductFeaturesContainer = styled.div`
  > div:nth-of-type(even) {
    flex-direction: row-reverse;

    .image > .image-container {
      margin-right: 0 !important;
      margin-left: auto;

      @media (max-width: 998px) {
        margin-right: auto !important;
      }
    }
  }
  > div:nth-of-type(odd) {
    flex-direction: row;

    .image > div {
      margin-left: 0 !important;
      @media (max-width: 998px) {
        margin-left: auto !important;
      }
    }
  }

  div:nth-first-child() {
  }
`;

const VideosPage = ({ className, libraries, state, actions }) => {
    const data = state.source.get("/videos/");
    const page =
        data.isReady && !data.isError ? state.source[data.type][data.id].acf : {};

    React.useEffect(() => {
        actions.theme.setActiveTheme("dark-green-theme");
        actions.theme.setSubHeader({});
    }, []);

    return (
        <div className={classnames(className)}>
            <Header state={state} />
            <Container className={"videos-page-wrapper"}>
                <h1 className={"form-headline-1"}>Videos</h1>
                {page?.videos?.length > 0 && page?.videos?.map((video, index) => {
                    return (
                        <div key={index} className={"videos-page-header"}>
                            <h2> {video.title} </h2>
                            <p className={"form-headline-4"}> {video.description} </p>
                            <CustomVideoPlayer
                                url={video.video_url}
                                previewUrl={video.video_thumbnail}
                            />
                        </div>
                    );
                })}
            </Container>
            <Footer />
        </div>
    );
};
export default styled(connect(VideosPage))`
  .videos-page-header {
    padding-bottom: 0rem !important;
    .details {
      width: 75%;
    }
    .image {
      width: 25%;
      display: flex;
    }
  }
  .videos-page-body {
    margin-top: 5rem !important;
    padding-bottom: 10rem !important;
  }
  .videos-page-header,
  .videos-page-body {
    max-width: 86rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    position: relative;
    flex-direction: column;
    padding-bottom: 2rem;
    margin-bottom: 5rem;
    color: rgba(210, 245, 233, 0.6);

    .mobile-only {
      display: none;
      max-width: 220px;
      margin: auto;
    }

    @media (max-width: 998px) {
      .mobile-only {
        display: block;
      }

      .desktop-only {
        display: none;
      }
    }

    @media (max-width: 480px) {
      flex-direction: column;
      margin-right: auto;
      & > div {
        width: 100% !important;
      }

      .image-container {
        margin-right: auto !important;
        max-width: 25% !important;
      }
    }

    .details {
      .html2react {
        padding: 0;
      }
    }

    .image-container {
      max-width: 50%;
      margin-left: auto;
      position: relative;
      display: flex;
      align-items: center;
      height: 100%;

      img {
        width: 100%;
      }
    }
  }

  .videos-page-wrapper {
    padding-top: ${size(180)};
    padding-bottom: ${size(20)};
    overflow: hidden;

    h1 {
      text-align: center;
      color: #d2f5e9 !important;
      padding-bottom: 1rem;
      font-weight: 300;
      line-height: 9.5rem;
      font-size: 8rem;
      max-width: 80rem;
      margin: auto;

      @media (max-width: 768px) {
        font-size: 3.5rem;
        line-height: 1.4;
      }
    }

    h2 {
      font-size: 2.5rem;
      margin-bottom: 2rem;
    }

    .html2react {
      margin-top: 1rem;
      margin-bottom:5rem;
      color: rgba(210, 245, 233, 0.6);
      font-size: ${size(18)};
      font-weight: 300;
      line-height: ${size(25)};
      text-align: left;
      @media (max-width: 991.98px) {
        font-size: ${size(16)};
      }
      @media (max-width: 768px) {
        padding: 0;
      }
      @media (max-width: 575.98px) {
        font-size: ${size(15)};
      }
      &.bottom-copy {
        margin-bottom: ${size(150)};
      }

      > p {
        margin-bottom: 1rem;
        line-height: 1.5;
        display: inline-block;
        width: 100%;
        @media (max-width: 575.98px) {
          font-size: 1.5rem;
        }
      }

      ul {
        margin-left: 4rem;
        margin-bottom: 1rem;
      }
    }
  }
  ${ProductFeaturesContainer} {
    max-width: 86rem;
    margin-right: auto;
    margin-left: auto;
  }
`;
