import { JSX } from 'solid-js';

export type ToolTipPosition = 'above' | 'below' | 'left' | 'right';

export interface ToolTipStyle {
  toolTipClassName?: string;
  toolTipStyle?: JSX.CSSProperties;
  toolTipPosition?: ToolTipPosition;
}
