export interface ChoiceProps<T extends object | string> {
  item: T;
  index: number;
  highlightedIndex: () => number;
  selectedItems: () => T[];
  itemText?: (item: T) => string;
  onSelected: (item: T) => void;
  choiceDisabled?: boolean;
}
