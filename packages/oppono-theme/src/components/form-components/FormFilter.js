import React from "react";
import { styled } from "frontity";
import PropTypes from "prop-types";
import classnames from "classnames";
import gsap from "gsap";
import useCombinedRefs from "../../hooks/useCombinedRefs";
import SwiperCore, {
  A11y,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { size } from "../../functions/size";
import useMedia from "../../hooks/useMedia";
import Button from "./Button";
import RadioInput from "./RadioInput";

SwiperCore.use([Navigation, Pagination, Keyboard, Mousewheel, A11y]);
const Slider = styled(Swiper)``;
const FormFilter = React.forwardRef(
  (
    {
      className,
      children,
      initial = "*",
      filters = { "*": "All" },
      type = "rect",
      showFilter = true,
    },
    forwardedRef
  ) => {
    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs(forwardedRef, innerRef);
    const [current, setCurrent] = React.useState(initial);
    const media = useMedia();

    React.useEffect(() => {
      gsap.to(combinedRef.current.querySelectorAll(`[data-filter]`), {
        height: (_, target) =>
          current === "*" ||
          target.dataset.filter === "*" ||
          target.dataset.filter === current
            ? "auto"
            : 0,
      });
    }, [current]);

    React.useEffect(() => {
      !showFilter && setCurrent("*");
    }, [showFilter]);

    return (
      <div ref={combinedRef} className={className}>
        {showFilter ? (
          <Slider
            className={classnames("filters", type)}
            slidesPerView={"auto"}
            spaceBetween={20}
            // centeredSlides={true}
            allowSlidePrev={media === "mobile"}
            allowSlideNext={media === "mobile"}
          >
            {Object.keys(filters).map((rule, filterIndex) => (
              <SwiperSlide
                key={filterIndex}
                className={classnames("filter", { active: current === rule })}
                onClick={() => setCurrent(rule)}
              >
                {type === "rect" ? (
                  <RadioInput
                    label={filters[rule]}
                    name={""}
                    readOnly
                    checked={current === rule}
                  />
                ) : (
                  <Button
                    label={filters[rule]}
                    className={classnames("small", {
                      bordered: current !== rule,
                    })}
                  />
                )}
              </SwiperSlide>
            ))}
          </Slider>
        ) : null}
        {children}
      </div>
    );
  }
);

FormFilter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  initial: PropTypes.string,
  filters: PropTypes.object,
  showFilter: PropTypes.bool,
  type: PropTypes.oneOf(["rect", "oval"]),
};

export default styled(FormFilter)`
  .filters {
    margin-bottom: ${size(50)};
    display: block;
    width: fit-content;
    max-width: 100%;
  }
  .filter {
    width: fit-content;
    cursor: pointer;

		.radio-text {
			text-transform: capitalize;
			&[labeltype="heloc"],
			&[labeltype="beloc"] {
				text-transform: uppercase;
			}
		}
  }
  [data-filter] {
    overflow: hidden;
  }

  @media screen and (max-width: 450px) {
    .swiper-wrapper {
      display: flex;
      flex-wrap: wrap;
    }
    .swiper-wrapper .filter {
      flex: 50%;
      margin-right: 0 !important;
      margin-bottom: 6px;
    }
    .swiper-wrapper .filter .radio-input {
      width: 95%;
      margin: auto;
    }
  }
`;
