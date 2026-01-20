import { SVGAttributes } from 'react';

export default function DeveloperIcon({ ...props }: DeveloperIconProps) {
  return (
    <svg width='84' height='84' viewBox='0 0 84 84' fill='none' {...props}>
      <path
        d='M23.863 77V67.0005C23.317 61.572 19.7155 57.456 16.387 52.5M50.589 77V71.001C67.774 71.001 65.863 51.002 65.863 51.002C65.863 51.002 73.5 51.002 73.5 43.001L65.863 31.003C65.863 15.001 52.8815 7.14701 39.137 7.00351C31.437 6.92301 25.2875 8.85851 20.692 12.25'
        stroke='white'
        stroke-width='5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M45.5 24.5L52.5 33.25L45.5 42M17.5 24.5L10.5 33.25L17.5 42M35 21L28 45.5'
        stroke='white'
        stroke-width='5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  );
}

export interface DeveloperIconProps extends SVGAttributes<SVGElement> {}
