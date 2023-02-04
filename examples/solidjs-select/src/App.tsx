import SolidJsSelect from "solidjs-select";
import GettingStarted from './GettingStarted';
import Examples from './Examples';
import VirtualisationExample from './VirtualisationExample';
import './App.css';
import { applyTheme, themes, Themes } from './themes/themes';
import { createSignal, onMount } from 'solid-js';

const pages = ['Getting Started', 'Examples','Virtual Container'];

const App = () => {
  const [themeName, setThemeName] = createSignal<string>(
    Themes.Plain.toString()
  );
  const [page, setPage] = createSignal<string>('Getting Started');

  onMount(() => {
    applyTheme(Themes.Plain);
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
            <h1 class="title">SolidJs-Select</h1>
            <p class="statement">
              A compact, highly functional select control for SolidJs
            </p>
          </div>
          <div class="menu-bar">
            <div class="menu">
              {pages.map((pg) => (
                <div class="menu-item" onClick={() => setPage(pg)}>
                  {
                    ( pg === page()) 
                    ? <u><p class="menu-text">{pg}</p></u>
                    : <p class="menu-text">{pg}</p> 
                  }
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
              (page() === 'Getting Started' && <GettingStarted />) ||
              (page() === 'Virtual Container' && <VirtualisationExample theme={themeName()}/>)}
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
