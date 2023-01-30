import { JSX } from 'solid-js';

export interface ToolTipProps {
  tip: string;
  show: boolean;
  children?: JSX.Element;
}
