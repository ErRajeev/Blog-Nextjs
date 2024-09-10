import * as React from 'react';
const SvgUserProfile = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={20}
    fill="none"
    viewBox='0 0 18 20'
    {...props}
  >
    <path
      fill="#fff"
      d="M8.667 9.333a4.666 4.666 0 1 0 0-9.333 4.666 4.666 0 0 0 0 9.333m0-8a3.333 3.333 0 1 1 0 6.667 3.333 3.333 0 0 1 0-6.667M16.98 14.247a11.44 11.44 0 0 0-16.62 0c-.232.247-.36.574-.36.913v3.507A1.333 1.333 0 0 0 1.333 20H16a1.334 1.334 0 0 0 1.333-1.333V15.16a1.33 1.33 0 0 0-.353-.913m-.98 4.42H1.333v-3.514a10.113 10.113 0 0 1 14.667 0z"
    />
  </svg>
);
export default SvgUserProfile;