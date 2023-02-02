import CSS from 'csstype';
import type { JSX } from 'solid-js';
import { IconTypes } from 'solid-icons';
import { ChoiceProps } from './choiceProps';
import { ChoiceStyle } from './choiceStyle';
import { DisplayProps } from './displayProps';
import { DisplayStyle } from './displayStyle';
import { ToolTipProps } from './toolTipProps';
import { ToolTipStyle } from './toolTipStyle';

export interface SelectStyle {
  toolTipComponent?: (props: ToolTipProps & ToolTipStyle) => Element;
  choiceComponent?: <T extends object | string>(
    props: ChoiceProps<T> & ChoiceStyle
  ) => JSX.Element;
  displayComponent?: <T extends object | string>(
    props: DisplayProps<T> & DisplayStyle
  ) => JSX.Element;
  style?: JSX.CSSProperties;
  selectStyle?: JSX.CSSProperties;
  selectDisabledStyle?: JSX.CSSProperties;
  className?: string;
  disabledClassName?: string;
  inputStyle?: JSX.CSSProperties;
  inputDisabledStyle?: JSX.CSSProperties;
  inputClassName?: string;
  inputDisabledClassName?: string;
  clearSelectionStyle?: JSX.CSSProperties;
  clearSelectionDisabledStyle?: JSX.CSSProperties;
  clearSelectionClassName?: string;
  clearSelectionDisabledClassName?: string;
  titleStyle?: JSX.CSSProperties;
  titleDisabledStyle?: JSX.CSSProperties;
  titleClassName?: string;
  titleDisabledClassName?: string;
  choiceListStyle?: JSX.CSSProperties;
  choiceListClassName?: string;
  dropdownIconStyle?: JSX.CSSProperties;
  dropdownIconDisabledStyle?: JSX.CSSProperties;
  dropIconClassName?: string;
  dropIconDisabledClassName?: string;
  hideDropdownIcon?: boolean;
  dropdownIcon?: IconTypes;
  clearSelectionIcon?: IconTypes;
  hideTitle?: boolean;
  height?: CSS.Property.Height;
  minHeight?: CSS.Property.MinHeight;
  maxHeight?: CSS.Property.MaxHeight;
  width?: CSS.Property.Width;
  minWidth?: CSS.Property.MinWidth;
  maxWidth?: CSS.Property.MaxWidth;
}
