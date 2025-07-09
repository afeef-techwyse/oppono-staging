import React, { useState } from "react";
import ReactPlayer from "react-player";
import play from "../../src/assets/images/play.png";
import PropTypes from "prop-types";
import { connect, styled } from "frontity";

const CustomVideoPlayer = ({ url, previewUrl }) => {
  const [playing, setPlaying] = useState(false);

  return !playing ? (
    <div style={{ position: "relative", width: "100%", height: "100%"}}>
      <img style={{width:"100%"}} src={previewUrl} />
      <div 
      style={{
        background: "black",
        padding: "15px",
        position: "absolute",
        width: "60px",
        height: "60px",
        borderRadius: "100%",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        margin: "auto"
      }}>
      <img
        onClick={() => setPlaying(true)}
        style={{
          marginLeft: "5px",
          width: "25px",
          height: "auto",
          cursor: "pointer",
          zIndex: 1,
        }}
        src={play}
      />
      </div>
    </div>
  ) : (
    <ReactPlayer
      width="100%"
      maxWidth="600px"
      height="100%"
      playing={playing}
      style={{aspectRatio:'16 / 9'}}
      url={url}
      controls={true}
    />
  );
};

CustomVideoPlayer.propTypes = {
  className: PropTypes.string,
};

export default styled(CustomVideoPlayer)`

`;
