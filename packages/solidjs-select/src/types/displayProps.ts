export interface DisplayProps<T extends object | string> {
  title: string;
  text: string;
  selected: T[];
  choicesShown: boolean;
  selectType?: 'standard' | 'dropdown' | 'switch';
  disabled?: boolean;
}
