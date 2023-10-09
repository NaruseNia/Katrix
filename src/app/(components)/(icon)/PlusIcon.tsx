import React from 'react';

type PlusIconProps = {
  width?: number;
  height?: number;
}

export const PlusIcon = ({width, height}: PlusIconProps) => {
  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg"
           fill="none" viewBox="0 0 24 24"
           strokeWidth={1.5}
           stroke="currentColor"
           width={width ? width : 24}
           height={height ? height : 24}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  );
}

export default PlusIcon;