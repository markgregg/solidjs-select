import SolidJsSelect from 'solidjs-select';
import About from './About';
import Examples from './Examples';
import HowTo from './HowTo';
import './App.css';
import { applyTheme, themes, Themes } from './themes/themes';
import { createSignal, onMount } from 'solid-js';

const pages = ['About', 'Examples'];

const App = () => {
  const [themeName, setThemeName] = createSignal<string>(
    Themes.None.toString()
  );
  const [page, setPage] = createSignal<string>('Examples');

  onMount(() => {
    applyTheme(Themes.None);
  });

  const setTheme = (theme: string[]) => {
    setThemeName(theme[0]);
    applyTheme(theme[0]);
  };

  return (
    <div class="frame">
      <div class="page">
        <div class="body">
          <div class="header">
            <h1 class="title">Compact Select</h1>
            <p class="statement">
              A simple, flexible select control that's economical in terms of
              realestate
            </p>
          </div>
          <div class="menu-bar">
            <div class="menu">
              {pages.map((pg) => (
                <div class="menu-item" onClick={() => setPage(pg)}>
                  <p class="menu-text">{pg}</p>
                </div>
              ))}
            </div>
            <div class="theme">
              <SolidJsSelect
                maximumSelections={1}
                minimumSelections={1}
                selectType="dropdown"
                title="themes"
                choices={themes}
                selected={themeName()}
                onChange={setTheme}
              />
            </div>
          </div>
          <div class="context">
            {(page() === 'Examples' && <Examples />) ||
              (page() === 'About' && <About />) ||
              (page() === 'How-To' && <HowTo />)}
          </div>
          <div
            class="footer"
            style={{
              'background-color': 'var(--pageColor2)',
              color: 'var(--solidjsSelectFontColor)',
            }}
          >
            <p>Created by Mark Gregg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
