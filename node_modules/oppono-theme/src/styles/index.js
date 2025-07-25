import React from 'react';
import GeneralStyles from './GeneralStyles';
import Fonts from './Fonts';
import Normalize from './Normalize';
import SwiperStyle from './Swiper';
import Themes from './Themes';
import WidgetStyle from './Widget';

const Styles = () => <>
  <Fonts/>
  <Normalize/>
  <SwiperStyle/>
  <GeneralStyles/>
  <Themes/>
  <WidgetStyle/>
</>;

export default Styles;