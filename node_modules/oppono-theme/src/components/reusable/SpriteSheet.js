import React from 'react';
import { styled } from 'frontity';
import PropTypes from 'prop-types';
import useCombinedRefs from '../../hooks/useCombinedRefs';

const SpriteSheet = React.forwardRef(({
    className,
    frames,
    frame_x,
    frame_y,
    imageUrl,
    alt,
    loop_start_index = 0,
    duration = 2,
    initial_duration = 0,
    repeat = -1,
    repeatDelay = 0,
    paused = false,
    isReady,
    reset,
}, forwardedRef) => {
    const image = React.useRef(null);
    const currentIndex = React.useRef(0);
    const [gridSize, setGridSize] = React.useState({ init: false });

    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs(forwardedRef, innerRef);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [imageMetaLoaded, setImageMetaLoaded] = React.useState(false);

    const remainingRepeat = React.useRef(repeat);
    const stopInterval = React.useRef(false);

    React.useEffect(() => {
        currentIndex.current = 0;
    }, [reset]);

    React.useEffect(() => {
        image.current.complete ? setImageLoaded(true) : (image.current.onload = () => setImageLoaded(true));

        const checkImageDimensions = setInterval(function () {
            if (image.current?.naturalWidth) {
                clearInterval(checkImageDimensions);
                setImageMetaLoaded(true);
            }
        }, 10);

        return () => {
            image.current && (image.current.onload = null);
            clearInterval(checkImageDimensions);
        };
    }, []);

    React.useEffect(() => {
        if (imageMetaLoaded) {
            setGridSize({
                imageUrl,
                init: true,
                x: image.current?.naturalWidth / frame_x,
                y: image.current?.naturalHeight / frame_y,
            });
        }
    }, [imageMetaLoaded]);

    React.useEffect(() => {
        currentIndex.current = 0;
        let interval, initialInterval, repeatDelaySetTimeout;
        const createInterval = () => {
            let stop = false;
            return setInterval(
                () => {
                    if (stop) return;
                    currentIndex.current++;

                    image.current.style.transform = `translate(${((currentIndex.current % frames) % (gridSize.x)) / -gridSize.x * 100}%,${((~~((currentIndex.current % frames) / gridSize.x)) % (gridSize.y)) / -gridSize.y * 100}%)`;

                    if (currentIndex.current + 1 >= frames) {
                        stop = true;
                        clearInterval(interval);
                        if (remainingRepeat.current !== 0) {
                            repeatDelaySetTimeout = setTimeout(() => {
                                currentIndex.current = loop_start_index - 1;
                                remainingRepeat.current--;
                                interval = createInterval();
                            }, repeatDelay * 1000);
                        }
                    }
                },
                duration * 1000 / (frames - loop_start_index),
            );
        };

        if (imageLoaded) {
            if (loop_start_index) {
                initialInterval = setInterval(
                    () => {
                        if (stopInterval.current) return;
                        currentIndex.current++;
                        image.current.style.transform = `translate(${((currentIndex.current % frames) % (gridSize.x)) / -gridSize.x * 100}%,${((~~((currentIndex.current % frames) / gridSize.x)) % (gridSize.y)) / -gridSize.y * 100}%)`;
                        if (currentIndex.current + 1 >= loop_start_index) {
                            stopInterval.current = true;
                            clearInterval(initialInterval);
                        }
                    },
                    initial_duration * 1000 / loop_start_index,
                );
            }
            setTimeout(() => interval = createInterval(), loop_start_index ? initial_duration : 0);
        }
        return () => {
            clearInterval(initialInterval);
            clearInterval(interval);
            clearTimeout(repeatDelaySetTimeout);
            initialInterval;
        };

    }, [paused, imageLoaded, isReady]);
    return (
        <div ref={combinedRef} className={className}>
            <div className="aspect-ratio">
                <img ref={image}
                    style={{
                        width: gridSize.x ? 100 * gridSize.x + '%' : 'auto',
                        height: gridSize.y ? 100 * gridSize.y + '%' : 'auto',
                    }}
                    src={imageUrl} alt={alt} />
            </div>
        </div>
    );
});

SpriteSheet.propTypes = {
    frame_x: PropTypes.number.isRequired,
    frame_y: PropTypes.number.isRequired,
    width: PropTypes.string.isRequired,
    frames: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    initial_duration: PropTypes.number,
    duration: PropTypes.number,
    repeat: PropTypes.number,
    repeatDelay: PropTypes.number,
    paused: PropTypes.bool,
    yoyo: PropTypes.bool,
    className: PropTypes.string,
    loop_start_index: PropTypes.number,
    alt: PropTypes.string,
    isReady: PropTypes.array,
};

export default styled(SpriteSheet)`
overflow:hidden;
width: ${({ width }) => width};
height: auto;
.aspect-ratio{
  position: relative;
  width: 100%;
  height: 0;
  padding-top: ${({ frame_x, frame_y }) => frame_y / frame_x * 100}%;
}
img{
  position: absolute;
  top: 0;
  left: 0;
}
`;