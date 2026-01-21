import { SVGAttributes } from 'react';

export default function CommentIcon({
  width = 22,
  height = 22,
  ...props
}: CommentIconProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 22 22'
      fill='none'
      {...props}
    >
      <path
        d='M10.75 20.75C12.7278 20.75 14.6612 20.1635 16.3057 19.0647C17.9502 17.9659 19.2319 16.4041 19.9888 14.5768C20.7457 12.7496 20.9437 10.7389 20.5578 8.7991C20.172 6.85929 19.2196 5.07746 17.8211 3.67894C16.4225 2.28041 14.6407 1.328 12.7009 0.942152C10.7611 0.5563 8.75042 0.754333 6.92316 1.51121C5.0959 2.26809 3.53412 3.54981 2.4353 5.1943C1.33649 6.83879 0.75 8.77219 0.75 10.75C0.75 12.4033 1.15 13.9611 1.86111 15.3356L0.75 20.75L6.16444 19.6389C7.53778 20.3489 9.09778 20.75 10.75 20.75Z'
        stroke='black'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}

export interface CommentIconProps extends SVGAttributes<SVGElement> {}
