# SolidJsSelect

SolidJsSelect is a solidjs, highly functional select control

For examples and help [solidjs-select](https://markgregg.github.io/SolidJsSelect/)

## To install

yarn add solidjs-select

npm i --save solidjs-select

## Quick start

A simple string list
```js
<SolidJsSelect
  title="test"
  choices={choices}
/>
```
## Behaviour properties

- title - select control title and use as a key for caching items
- maximumSelections - min items that can be selected
- minimumSelections - max items that can be selected
- selectType - how the control behaves "standard" | "dropdown" | "switch"
- choices - available static choices
- selected - currently selected items
- itemValue - if using a complex class how to access the key value
- itemText - if using a complex class how to access the display value
- itemDisabled - if using a complex class how to access the disabled value
- typeAheadLookUp - type ahead lookup callback
- noEmptyStringLookUp - don't loook up if the input string is blank
- itemSearch? - item search for when pasting from the clipboard
- cacheLookUp - should the control cache items
- cacheTimeToLive - how long should items exist for, in seconds
- cacheExpiryCheck - how often should item expiry be checked, in seconds
- onChange - notify of change
- disabled - is control disable
- loadingText - custom loading text
- noItemText - custom no item text
- caseSensitive - perform case sensitive matching
- toolTipValueLimit - maxium number of items to display in the tooltip

## Apperance properties

### solidjs select
- style
- selectStyle
- selectDisabledStyle
- className
- disabledClassName
- inputStyle
- inputDisabledStyle
- inputClassName
- inputDisabledClassName
- clearSelectionStyle
- clearSelectionDisabledStyle
- clearSelectionClassName
- clearSelectionDisabledClassName
- titleStyle
- titleDisabledStyle
- titleClassName
- titleDisabledClassName
- choiceListStyle
- choiceListClassName
- dropdownIconStyle
- dropdownIconDisabledStyle
- dropIconClassName
- dropIconDisabledClassName
- hideDropdownIcon
- dropdownIcon
- clearSelectionIcon
- hideTitle
- height
- minHeight
- maxHeight
- width
- minWidth
- maxWidth

### options
- choiceStyle
- choiceSelectedStyle
- choiceHoverStyle
- choiceDisabledStyle
- choiceClassName
- choiceSelectedClassName
- choiceDisabledClassName
- choiceHoverClassName
- choiceSelectedIconStyle
- choiceSelectedIconClassName
- choiceSelectedIcon
- hideSelectedIcon

### item display
- displayStyle
- displayDisabledStyle
- displayClassName
- displayDisabledClassName

### Tool tip
- toolTipClassName
- toolTipStyle
- toolTipPosition    'above' | 'below' | 'left' | 'right';

## Styling
Add any of the below vairbales to a css/scss file.

```css
:root {
  --solidjsSelectBackgroundColor: #14061F;
  --solidjsSelectFontColor: White;
  --solidjsSelectDisabledBackgroundColor: #353576;
  --solidjsSelectToolTipBackgroundColor: #5555ad;
  --solidjsSelectHighlightedBackgroundColor: #9c9ccb;
  --solidjsSelectBorder: WhiteSmoke solid 2px;
  --pageColor1: rgb(195, 212, 233);
  --pageColor2: #353576;
  --pageColor3: #9c9ccb;
  --pageFont: Black;
}
```

### General
- --solidjsSelectFontWeight
- --solidjsSelectFontFamily
- --solidjsSelectFontSize
- --solidjsSelectFontStyle
- --solidjsSelectFontColor    (default black)
- --solidjsSelectBorder   (default 2px solid WhiteSmoke)
- --solidjsSelectBackgroundColor
- --solidjsSelectBackgroundImage
- --solidjsSelectDisabledBackgroundColor
- --solidjsSelectDisabledBackgroundImage

### Input box
- --solidjsSelectInputTextMaxWidth (default 100%)

### Title 
- --solidjsSelectTitleFontSize  (default small)

### Option list
- --solidjsSelectChoiceListMaxHeight (default 300)

### Clear seletion icon
- --solidjsSelectClearSelectionIconSize  (default large)

### Options
- --solidjsSelectChoiceSelectedIndicatorBorder
- --solidjsSelectSelectedFontColor  (default black)
- --solidjsSelectSelectedBackgroundColor
- --solidjsSelectHighlightedFontColor   (default black)
- --solidjsSelectHighlightedBackgroundColor  (default lightgray)
- --solidjsSelectDisabledFontColor  (default darkgray)
- --solidjsSelectDisabledBackgroundColor   (default Gainsboro)
- --solidjsSelectSelectedIconSize  (default large)
- --solidjsSelectSelectedIconColor  (default green)
- --solidjsSelectChoiceBackgroundImage
- --solidjsSelectSelectedBackgroundImage
- --solidjsSelectHighlightedBackgroundImage
- --solidjsSelectDisabledBackgroundImage

### Tool tip
- --solidjsSelectToolTipFontColor   (default black)
- --solidjsSelectToolTipFontWeight
- --solidjsSelectFontFamily
- --solidjsSelectToolTipFontSize (default small)
- --solidjsSelectToolTipFontStyle
- --solidjsSelectToolTipTextAlign  (default center)
- --solidjsSelectToolTipBorder
- --solidjsSelectToolTipBackgroundColor
- --solidjsSelectToolTipBackgroundImage

## Components
- toolTipComponent
- choiceComponent
- displayComponent