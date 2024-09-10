import * as React from 'react';
const SvgNotification = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    viewBox='0 0 20 20'
    {...props}
  >
    <path
      stroke="#581845"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M15.112 9.167C15.596 13.646 17.5 15 17.5 15h-15S5 13.223 5 7c0-1.414.527-2.77 1.464-3.77.938-1 2.211-1.563 3.536-1.563q.422 0 .833.075m.609 15.758a1.667 1.667 0 0 1-2.884 0m7.275-10.833a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"
    />
  </svg>
);
export default SvgNotification;