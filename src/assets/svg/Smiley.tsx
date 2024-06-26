import { CSSProperties } from 'react';

interface SmileyProps {
  css?: CSSProperties;
}

const Smiley:React.FC<SmileyProps> = ({ css }) => {
  return (
    <svg
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 18 18"
      width="20"
      height="20"
      style={css}
    >
      <path
        d="M9 0a9 9 0 1 1 0 18A9 9 0 0 1 9 0zm0 1C4.589 1 1 4.589 1 9s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zM5 6.999a1 1 0 1 1 2.002.004A1 1 0 0 1 5 6.999zm5.999 0a1.002 1.002 0 0 1 2.001 0 1 1 0 1 1-2.001 0zM8.959 13.5c-.086 0-.173-.002-.26-.007-2.44-.132-4.024-2.099-4.09-2.182l-.31-.392.781-.62.312.39c.014.017 1.382 1.703 3.37 1.806 1.306.072 2.61-.554 3.882-1.846l.351-.356.712.702-.35.356c-1.407 1.427-2.886 2.15-4.398 2.15z"
        fill="#ADADAD"
      ></path>
    </svg>
  );
};

export default Smiley;
