import { CSSProperties } from 'react';

interface ClockProps {
  css?: CSSProperties;
}

const Clock:React.FC<ClockProps> = ({css}) => {
  return (
    <svg style={css} id="Capa_1" enable-background="new 0 0 443.294 443.294" height="15" viewBox="0 0 443.294 443.294" width="15" xmlns="http://www.w3.org/2000/svg"><path d="m221.647 0c-122.214 0-221.647 99.433-221.647 221.647s99.433 221.647 221.647 221.647 221.647-99.433 221.647-221.647-99.433-221.647-221.647-221.647zm0 415.588c-106.941 0-193.941-87-193.941-193.941s87-193.941 193.941-193.941 193.941 87 193.941 193.941-87 193.941-193.941 193.941z" fill="#EB4995"></path><path d="m235.5 83.118h-27.706v144.265l87.176 87.176 19.589-19.589-79.059-79.059z" fill="#EB4995"></path></svg>
  )
}

export default Clock