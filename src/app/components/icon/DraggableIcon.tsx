export const DraggableIcon = ({width, height}: {width?: number, height?: number}) => {
  return (
    <svg width={width ? width : 9} height={height ? height : 15} viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor: "grab"}}>
      <path d="M6.33333 2.4086H7.66667V1H6.33333V2.4086ZM1 2.4086H2.33333V1H1V2.4086ZM6.33333 8.04301H7.66667V6.63441H6.33333V8.04301ZM1 8.04301H2.33333V6.63441H1V8.04301ZM6.33333 13.6774H7.66667V12.2688H6.33333V13.6774ZM1 13.6774H2.33333V12.2688H1V13.6774Z" stroke="#383838"/>
    </svg>
  )
}