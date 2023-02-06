import './Styling.css';

const Styling = () => {
  return (
    <div class='started'>
      <div>
        <h2 class='no-space-after'>Styling</h2>
        <p>
          It is possible to perform a great deal of the control's styling using variables. The variables can either be set globally, 
          if you want to style all instances of the control, or locally, if you only want to style a single instance. 
        </p>
        <h3 class='no-space-after'>Style Varaibales</h3>
        <h4 class='no-space-after'>Main</h4>
        <ul class='style-list'>
          <li>--solidjsSelectBorder</li>
          <li>--solidjsSelectClearSelectionIconSize</li>
          <li>--solidjsSelectInputTextMaxWidth</li>
          <li>--solidjsSelectSelectedItemFontWeight</li>
        </ul>
        <h4 class='no-space-after'>General</h4>
        <ul class='style-list'>
          <li>--solidjsSelectFontColor</li>
          <li>--solidjsSelectDisabledFontColor</li>
          <li>--solidjsSelectFontWeight</li>
          <li>--solidjsSelectFontFamily</li>
          <li>--solidjsSelectFontSize</li>
          <li>--solidjsSelectFontStyle</li>
          <li>--solidjsSelectBackgroundColor</li>
          <li>--solidjsSelectBackgroundImage</li>
          <li>--solidjsSelectDisabledBackgroundColor</li>
          <li>--solidjsSelectDisabledBackgroundImage</li>
        </ul>
        <h4 class='no-space-after'>Choice</h4> 
        <ul class='style-list'>
          <li>--solidjsSelectHighlightedFontColor</li>
          <li>--solidjsSelectHighlightedBackgroundColor</li>
          <li>--solidjsSelectHighlightedBackgroundImage</li>
          <li>--solidjsSelectSelectedBackgroundBackgroundColor</li>
          <li>--solidjsSelectSelectedFontColor</li>
          <li>--solidjsSelectSelectedBackgroundColor</li>
          <li>--solidjsSelectSelectedBackgroundImage</li>
          <li>--solidjsSelectChoiceBackgroundImage</li>
          <li>--solidjsSelectChoiceSelectedIndicatorBorder</li>
          <li>--solidjsSelectSelectedIconSize</li>
          <li>--solidjsSelectSelectedIconColor</li>
        </ul>
        <h4 class='no-space-after'>Title</h4> 
        <ul class='style-list'>
          <li>--solidjsSelectTitleFontSize</li>
          <li>--solidjsSelectTitleFontWeight</li>
        </ul>
        <h4 class='no-space-after'>ToolTip</h4> 
        <ul class='style-list'>
          <li>--solidjsSelectToolTipFontColor</li>
          <li>--solidjsSelectToolTipFontWeight</li>
          <li>--solidjsSelectToolTipFontSize</li>
          <li>--solidjsSelectToolTipFontStyle</li>
          <li>--solidjsSelectToolTipTextAlign</li>
          <li>--solidjsSelectToolTipBorder</li>
          <li>--solidjsSelectToolTipBackgroundColor</li>
          <li>--solidjsSelectToolTipBackgroundImage</li>
        </ul>
        <h4 class='no-space-after'>Scrollbar</h4> 
        <ul class='style-list'>
          <li>--scrollbarColor</li>
          <li>--scrollbarArrowColor</li>
          <li>--scrollbarArrowHoverColor</li>
          <li>--scrollbarArrowHoverBackground</li>
          <li>--scrollbarThumbColor</li>
          <li>--scrollbarThumbHoverColor</li>
        </ul>
      </div>
    </div>
  );
};

export default Styling;
