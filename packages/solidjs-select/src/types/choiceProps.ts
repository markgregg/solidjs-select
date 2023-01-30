export interface ChoiceProps<T extends object | string> {
  item: T;
  choiceSelected: boolean;
  choiceHighlighted?: boolean;
  itemText?: (item: T) => string;
  onSelected: (item: T) => void;
  choiceDisabled?: boolean;
}
