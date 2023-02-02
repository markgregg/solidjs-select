import { IconTypes } from 'solid-icons';
import { JSX } from 'solid-js';

export type SelectionType = 'Icon' | 'Border' | 'Background' | 'None';

export interface ChoiceStyle {
  choiceStyle?: JSX.CSSProperties;
  choiceSelectedStyle?: JSX.CSSProperties;
  choiceHoverStyle?: JSX.CSSProperties;
  choiceDisabledStyle?: JSX.CSSProperties;
  choiceClassName?: string;
  choiceSelectedClassName?: string;
  choiceDisabledClassName?: string;
  choiceHoverClassName?: string;
  choiceSelectedIconStyle?: JSX.CSSProperties;
  choiceSelectedIconClassName?: string;
  choiceSelectedIcon?: IconTypes;
  selectionType?: SelectionType;
}
