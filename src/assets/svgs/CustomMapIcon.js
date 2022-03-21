import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

const CustomMapIcon = props =>
  props.isOpen ? (
    <Svg
      width="30"
      height="43"
      viewBox="0 0 30 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill="teal"
        d="M15 0C6.70714 0 0 6.70714 0 15C0 18.7286 1.07143 22.2214 3.02143 25.3714C5.05714 28.6714 7.73571 31.5 9.79286 34.8C10.8 36.4071 11.5286 37.9071 12.3 39.6429C12.8571 40.8214 13.3071 42.8571 15 42.8571C16.6929 42.8571 17.1429 40.8214 17.6786 39.6429C18.4714 37.9071 19.1786 36.4071 20.1857 34.8C22.2429 31.5214 24.9214 28.6929 26.9571 25.3714C28.9286 22.2214 30 18.7286 30 15C30 6.70714 23.2929 0 15 0ZM15 20.8929C12.0429 20.8929 9.64286 18.4929 9.64286 15.5357C9.64286 12.5786 12.0429 10.1786 15 10.1786C17.9571 10.1786 20.3571 12.5786 20.3571 15.5357C20.3571 18.4929 17.9571 20.8929 15 20.8929Z"
      />
    </Svg>
  ) : (
    <Svg
      width="30"
      height="43"
      viewBox="0 0 30 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill="grey"
        opacity="0.5"
        d="M15 0C6.70714 0 0 6.70714 0 15C0 18.7286 1.07143 22.2214 3.02143 25.3714C5.05714 28.6714 7.73571 31.5 9.79286 34.8C10.8 36.4071 11.5286 37.9071 12.3 39.6429C12.8571 40.8214 13.3071 42.8571 15 42.8571C16.6929 42.8571 17.1429 40.8214 17.6786 39.6429C18.4714 37.9071 19.1786 36.4071 20.1857 34.8C22.2429 31.5214 24.9214 28.6929 26.9571 25.3714C28.9286 22.2214 30 18.7286 30 15C30 6.70714 23.2929 0 15 0ZM15 20.8929C12.0429 20.8929 9.64286 18.4929 9.64286 15.5357C9.64286 12.5786 12.0429 10.1786 15 10.1786C17.9571 10.1786 20.3571 12.5786 20.3571 15.5357C20.3571 18.4929 17.9571 20.8929 15 20.8929Z"
      />
    </Svg>
  );

export default CustomMapIcon;
