import { SVGAttributes } from 'react';

export default function NewsDateIcon({
  width = 22,
  height = 22,
  ...props
}: NewsIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 22 22'
      fill='none'
      {...props}
    >
      <path
        d='M10.75 20.75C16.273 20.75 20.75 16.273 20.75 10.75C20.75 5.227 16.273 0.75 10.75 0.75C5.227 0.75 0.75 5.227 0.75 10.75C0.75 16.273 5.227 20.75 10.75 20.75Z'
        stroke='black'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M10.7581 9.258C10.3602 9.258 9.9787 9.41604 9.6974 9.69734C9.41609 9.97864 9.25806 10.3602 9.25806 10.758C9.25806 11.1558 9.41609 11.5374 9.6974 11.8187C9.9787 12.1 10.3602 12.258 10.7581 12.258C11.1559 12.258 11.5374 12.1 11.8187 11.8187C12.1 11.5374 12.2581 11.1558 12.2581 10.758C12.2581 10.3602 12.1 9.97864 11.8187 9.69734C11.5374 9.41604 11.1559 9.258 10.7581 9.258ZM10.7581 9.258V5.75M13.7651 13.77L11.8161 11.822'
        stroke='black'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}

export interface NewsIconProps extends SVGAttributes<SVGElement> {}
