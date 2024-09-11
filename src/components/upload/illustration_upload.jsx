import React, { memo } from 'react';
import { useTheme } from '@mui/material';

const UploadIllustration = ({
  color = 'secondary',
  height = 140,
  width = 160,
}) => {
  const theme = useTheme();
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 160 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M132.003 54.5846L104.332 41.1559L64.8031 21.972L48.5123 14.0586C44.4406 12.0619 39.9145 11.1766 35.3914 11.4921C30.8683 11.8075 26.5086 13.3127 22.7529 15.8553C18.9972 18.398 15.9788 21.888 14.0026 25.9726C12.0265 30.0572 11.1626 34.5917 11.4985 39.1176L14.9723 87.7968L18.2065 131.44C18.5686 135.962 20.1058 140.311 22.6656 144.055C25.2253 147.799 28.7186 150.808 32.7988 152.784C36.879 154.759 41.4043 155.632 45.9258 155.316C50.4472 155.001 54.8076 153.507 58.5743 150.984L101.458 122.807C102.433 121.99 103.354 121.109 104.213 120.17L135.237 99.3071C138.992 96.7549 142.01 93.2589 143.988 89.17C145.967 85.0812 146.836 80.5433 146.508 76.0121C146.18 71.4808 144.667 67.1156 142.122 63.3545C139.576 59.5935 136.086 56.569 132.003 54.5846Z"
        fill={'#EEF5FD'}
      />
      <path
        d="M125.346 44.5156H44.7004C42.9182 44.5156 41.4746 45.9592 41.4746 47.7414V126.774C41.4746 128.556 42.9182 129.999 44.7004 129.999H125.346C127.128 129.999 128.571 128.556 128.571 126.774V47.7414C128.571 45.9592 127.128 44.5156 125.346 44.5156Z"
        fill={'#F4F6F8'}
        stroke={'#05315d'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M86.6348 68.709V100.967"
        stroke={'#05315d'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M72.1191 83.2251L86.6353 68.709L101.151 83.2251"
        stroke={'#05315d'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M70.5059 100.969H102.764"
        stroke={'#05315d'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M41.4735 47.742C41.4735 45.9597 42.9171 44.5162 44.6993 44.5162H115.651L115.667 43.7937V33.4482C115.667 31.5437 114.107 30 112.183 30H32.0542C30.1302 30 28.5703 31.5437 28.5703 33.4482V112.258C28.5703 114.163 29.8721 115.484 31.7961 115.484H41.4735V47.742Z"
        fill={'#EEF5FD'}
        stroke={'#05315d'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export default UploadIllustration;