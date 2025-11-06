import { MergeElementProps } from '@/src/shared/model/reactElement';

const IconStar = ({ ...props }: MergeElementProps<'svg'>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path
      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.813l-2.71 1.968a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.71-1.968a1 1 0 00-1.175 0l-2.71 1.968c-.784
        .57-1.84-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.015 8.722c-.783-.573-.381-1.813.588-1.813h3.462a1 1 0 00.95-.69l1.07-3.292z"
    />
  </svg>
);
export default IconStar;
