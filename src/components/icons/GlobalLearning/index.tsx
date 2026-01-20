import { SVGAttributes } from 'react';

export default function GlobalLearningIcon({ ...props }: GlobalLearningIconProps) {
  return (
    <svg width='84' height='84' viewBox='0 0 84 84' fill='none' {...props}>
      <path
        d='M6.39453 36.8619C6.39453 28.7258 9.62661 20.9228 15.3798 15.1697C21.1329 9.41653 28.9359 6.18445 37.072 6.18445C45.2082 6.18445 53.0111 9.41653 58.7643 15.1697C64.5174 20.9228 67.7495 28.7258 67.7495 36.8619H6.39453ZM6.39453 36.8619C6.39489 42.6409 8.02664 48.3024 11.1021 53.1951C14.1775 58.0878 18.5717 62.013 23.779 64.5189'
        stroke='white'
        stroke-width='5'
      />
      <path
        d='M33.2395 6.18445L23.6495 36.8619L27.0445 47.7119M39.949 6.18445L50.4945 36.8619M55.538 45.1744L33.173 54.8659V56.4094L55.538 66.1044L77.9065 56.4094V54.8659L55.538 45.1744Z'
        stroke='white'
        stroke-width='5'
      />
      <path
        d='M42.3466 61.6875L42.3676 71.7955L55.5381 77.9695L68.7261 71.7955V61.684'
        stroke='white'
        stroke-width='5'
      />
      <path d='M33.173 70.6195V55.7655' stroke='white' stroke-width='5' stroke-linejoin='round' />
    </svg>
  );
}

export interface GlobalLearningIconProps extends SVGAttributes<SVGElement> {}
