type TrashIconProps = {
  width?: number;
  height?: number;
}

export const TrashIcon = ({width, height}: TrashIconProps) => {
  return (
    <svg width={width ? width : 24} height={height ? height : 24} viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.24992 9.87259C1.24992 10.1761 1.36406 10.4672 1.56722 10.6819C1.77038 10.8965 2.04593 11.0171 2.33325 11.0171H6.66659C6.9539 11.0171 7.22945 10.8965 7.43262 10.6819C7.63578 10.4672 7.74992 10.1761 7.74992 9.87259V3.00565H1.24992V9.87259ZM2.33325 4.15014H6.66659V9.87259H2.33325V4.15014ZM6.39575 1.28892L5.85409 0.716675H3.14575L2.60409 1.28892H0.708252V2.43341H8.29159V1.28892H6.39575Z" fill="#0F0F0F"/>
    </svg>
  )
}