import React from 'react';
import Svg, {Path} from 'react-native-svg';
import Colors from '../../styles/colors';
const CheckIcon = (props: any) => (
  <Svg
    viewBox="0 0 99 99"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path
      d="M6.05499 46.402C2.7109 46.402 0 43.7261 0 40.4256L2.4689e-06 7.05553C2.4689e-06 3.75484 2.71093 1.0791 6.05499 1.0791H40.3471C43.691 1.0791 46.4019 3.75484 46.4019 7.05553V31.7929C46.4019 39.8613 39.7755 46.402 31.6009 46.402H6.05499Z"
      fill={props.fill || Colors.default}
    />
    <Path
      d="M52.7476 6.05497C52.7476 2.71091 55.4234 0 58.7242 0H92.0941C95.3947 0 98.0705 2.71091 98.0705 6.05499V40.3469C98.0705 43.6911 95.3947 46.402 92.0941 46.402H67.3566C59.2882 46.402 52.7476 39.7753 52.7476 31.6009V6.05497Z"
      fill={props.fill || Colors.default}
    />
    <Path
      d="M6.05499 52.7476C2.7109 52.7476 0 55.4234 0 58.7239L2.4689e-06 92.0939C2.4689e-06 95.3947 2.71093 98.0705 6.05499 98.0705H40.3471C43.691 98.0705 46.4019 95.3947 46.4019 92.0939V67.3566C46.4019 59.2882 39.7755 52.7476 31.6009 52.7476H6.05499Z"
      fill={props.fill || Colors.default}
    />
    <Path
      d="M92.5658 52.7476C95.91 52.7476 98.6209 55.4234 98.6209 58.7242V92.0941C98.6209 95.3947 95.91 98.0705 92.5658 98.0705H58.2738C54.9297 98.0705 52.2188 95.3947 52.2188 92.0941V67.3566C52.2188 59.2882 58.8454 52.7476 67.0198 52.7476H92.5658Z"
      fill={props.fill || Colors.default}
    />
  </Svg>
);
export default CheckIcon;
