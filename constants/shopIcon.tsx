import React from 'react';
import { Svg, Path } from 'react-native-svg';

const ShopIcon = ({ width = 29, height = 29, color = "#848A9C" }) => (
  <Svg width={width} height={height} viewBox="0 0 29 29" fill="none">
    <Path
      d="M4.73438 13.6527V18.53C4.73438 23.4073 6.68963 25.3625 11.5669 25.3625H17.4218C22.2991 25.3625 24.2543 23.4073 24.2543 18.53V13.6527"
      stroke={color} // Use `color` for stroke
      strokeWidth="1.62938"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.4999 14.5C16.4877 14.5 17.9542 12.8815 17.7586 10.8936L17.0417 3.63745H11.9689L11.2411 10.8936C11.0456 12.8815 12.512 14.5 14.4999 14.5Z"
      stroke={color}
      strokeWidth="1.62938"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21.3539 14.5C23.5481 14.5 25.1558 12.7185 24.9386 10.5352L24.6344 7.54796C24.2434 4.7237 23.1571 3.63745 20.3111 3.63745H16.998L17.7584 11.2521C17.9431 13.0444 19.5616 14.5 21.3539 14.5Z"
      stroke={color}
      strokeWidth="1.62938"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.59112 14.5C9.38343 14.5 11.002 13.0444 11.1758 11.2521L11.4147 8.85147L11.9361 3.63745H8.62306C5.77708 3.63745 4.69082 4.7237 4.29977 7.54796L4.00648 10.5352C3.78923 12.7185 5.39689 14.5 7.59112 14.5Z"
      stroke={color}
      strokeWidth="1.62938"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.4998 19.9313C12.6858 19.9313 11.7842 20.8329 11.7842 22.6469V25.3625H17.2154V22.6469C17.2154 20.8329 16.3139 19.9313 14.4998 19.9313Z"
      stroke={color}
      strokeWidth="1.62938"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ShopIcon;
