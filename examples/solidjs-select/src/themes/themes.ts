export enum Themes {   None = 'None',
  Dark = 'Dark',
  Light = 'Light',
  Blue = 'Blue',
}

export const themes = Object.keys(Themes).filter((item) => {
  return isNaN(Number(item));
});

export const applyTheme = (theme: string) => {
  switch (theme) {
    case Themes.Blue:
      document.documentElement.style.setProperty(
        '--solidjsSelectBackgroundColor',
        '#4444B1'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFontColor',
        'White'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipFontColor',
        'White'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFonHighlightColor',
        'LightGray'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDisabledBackgroundColor',
        '#5555ad'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipBackgroundColor',
        '#5555ad'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectHighlightedBackgroundColor',
        '#9c9ccb'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedBackgroundBackgroundColor',
        '#7676b0'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectBorder',
        'none'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectBorder', 
        '#0d0d7a 2px Solid'
      );
      document.documentElement.style.setProperty(
        '--pageColor1',
        'rgb(195, 212, 233)'
      );
      document.documentElement.style.setProperty('--pageColor2', '#4444B1');
      document.documentElement.style.setProperty('--pageColor3', '#9c9ccb');
      document.documentElement.style.setProperty('--pageFont', 'Black');
      document.documentElement.style.setProperty('--scrollbarColor', '#4444B1');
      document.documentElement.style.setProperty(
        '--scrollbarArrowColor',
        'White'
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverColor',
        'darkgray'
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverBackground',
        '#4444B1'
      );
      document.documentElement.style.setProperty(
        '--scrollbarThumbColor',
        'White'
      );
      document.documentElement.style.setProperty(
        '--scrollbarThumbHoverColor',
        'darkgray'
      );
      break;
    case Themes.Dark:
      document.documentElement.style.setProperty(
        '--solidjsSelectBackgroundColor',
        '#681CA1'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFontColor',
        'lightgray'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipFontColor',
        'lightgray'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFonHighlightColor',
        'DarkGray'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDisabledBackgroundColor',
        '#512E6B'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipBackgroundColor',
        '#512E6B'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectHighlightedBackgroundColor',
        '#9C2BF1'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedBackgroundBackgroundColor',
        '#823bb8'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectBorder',
        '#873ac1 2px Solid'
      );
      document.documentElement.style.setProperty(
        '--pageColor1',
        'black'
      );
      document.documentElement.style.setProperty('--pageColor2', '#681CA1');
      document.documentElement.style.setProperty('--pageColor3', ' #9C2BF1');
      document.documentElement.style.setProperty(
        '--pageFont',
        'lightgray'
      );
      document.documentElement.style.setProperty('--scrollbarColor', '#681CA1');
      document.documentElement.style.setProperty(
        '--scrollbarArrowColor',
        'lightgray'
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverColor',
        'white'
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverBackground',
        '#681CA1'
      );
      document.documentElement.style.setProperty(
        '--scrollbarThumbColor',
        'lightgray'
      );
      document.documentElement.style.setProperty(
        '--scrollbarThumbHoverColor',
        'white'
      );
      break;
    case Themes.Light:
      document.documentElement.style.setProperty(
        '--solidjsSelectBackgroundColor',
        '#F7E575'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFontColor',
        '#3D350B'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipFontColor',
        '#3D350B'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFonHighlightColor',
        'DarkGray'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDisabledBackgroundColor',
        '#edde87'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipBackgroundColor',
        '#d5b70e'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectHighlightedBackgroundColor',
        '#EFD233'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedBackgroundBackgroundColor',
        '#eadb85'
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectBorder', 
        '#EFD233 2px Solid'
      );
      document.documentElement.style.setProperty('--pageColor1', '#FFFADB');
      document.documentElement.style.setProperty('--pageColor2', '#F7E575');
      document.documentElement.style.setProperty('--pageColor3', '#EFD233');
      document.documentElement.style.setProperty('--pageFont', '#3D350B');
      document.documentElement.style.setProperty('--scrollbarColor', '#F7E575');
      document.documentElement.style.setProperty(
        '--scrollbarArrowColor',
        '#d5b70e'
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverColor',
        '#d5b70e'
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverBackground',
        '#e0cd60'
      );
      document.documentElement.style.setProperty(
        '--scrollbarThumbColor',
        '#d5b70e'
      );
      document.documentElement.style.setProperty(
        '--scrollbarThumbHoverColor',
        '#e0cd60'
      );
      break;
    case Themes.None:
      document.documentElement.style.setProperty(
        '--solidjsSelectBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFontColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipFontColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectFonHighlightColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectDisabledBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectToolTipBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectHighlightedBackgroundColor',
        null
      );
      document.documentElement.style.setProperty(
        '--solidjsSelectSelectedBackgroundBackgroundColor',
        null
      );
      document.documentElement.style.setProperty('--solidjsSelectBorder', null);
      document.documentElement.style.setProperty('--pageColor1', 'White');
      document.documentElement.style.setProperty('--pageColor2', '#dce916');
      document.documentElement.style.setProperty('--pageColor3', '#eaff5c');
      document.documentElement.style.setProperty('--pageFont', 'Black');
      document.documentElement.style.setProperty('--scrollbarColor', null);
      document.documentElement.style.setProperty('--scrollbarArrowColor', null);
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverColor',
        null
      );
      document.documentElement.style.setProperty(
        '--scrollbarArrowHoverBackground',
        null
      );
      document.documentElement.style.setProperty('--scrollbarThumbColor', null);
      document.documentElement.style.setProperty(
        '--scrollbarThumbHoverColor',
        null
      );
      break;
  }
};



