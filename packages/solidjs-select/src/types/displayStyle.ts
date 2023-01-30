import { JSX } from 'solid-js';

export interface DisplayStyle {
  displayStyle?: JSX.CSSProperties;
  displayDisabledStyle?: JSX.CSSProperties;
  displayClassName?: JSX.CSSProperties;
  displayDisabledClassName?: string;
}
