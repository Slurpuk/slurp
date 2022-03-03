import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const CoffeeCupSvg = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -12 289.94 289.94"
    style={{
      enableBackground: 'new 0 0 289.94 289.94',
    }}
    xmlSpace="preserve"
    {...props}
  >
    <Path
      style={{
        fill: '#E5E5E5', //white part
      }}
      d="M244.674 54.346 217.193 289.94H72.767L45.259 54.346h199.415z"
    />
    <Path
      style={{
        fill: '#f4b459', //light stripes
      }}
      d="M45.304 108.727h199.333l-18.121 135.157H63.425L45.304 108.727z"
    />
    <Path
      style={{
        fill: '#2b414d', //almost top
      }}
      d="M45.304 27.182h199.333c10.003 0 18.121 8.118 18.121 18.121v18.121H27.183V45.303c0-10.012 8.118-18.121 18.121-18.121z"
    />
    <Path
      style={{
        fill: '#5a6f7b', //top
      }}
      d="M72.486 0h144.97c10.003 0 18.121 8.118 18.121 18.121v9.061H54.365v-9.061C54.365 8.109 62.483 0 72.486 0z"
    />
    <Path
      style={{
        fill: '#e3a753', //dark stripes
      }}
      d="M172.152 108.727h18.121v135.157h-18.121zM135.91 108.727h18.121v135.157H135.91zM63.425 108.727h18.121v135.157H63.425zM99.668 108.727h18.121v135.157H99.668zM208.395 108.727h18.121v135.157h-18.121z"
    />
  </Svg>
);

export default CoffeeCupSvg;
