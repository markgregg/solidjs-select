import SolidJsSelect from "solidjs-select";
import GettingStarted from './GettingStarted';
import Examples from './Examples';
import Styling from './Styling';
import './App.css';
import { applyTheme, themes, Themes } from './themes/themes';
import { createSignal, onMount } from 'solid-js';

const pages = ['Examples','Getting Started', 'Styling', 'Back To Demos'];

const App = () => {
  const [themeName, setThemeName] = createSignal<string>(
    Themes.Plain.toString()
  );
  const [page, setPage] = createSignal<string>('Examples');

  onMount(() => {
    applyTheme(Themes.Plain);
  });

  const setTheme = (theme: string[]) => {
    setThemeName(theme[0]);
    applyTheme(theme[0]);
  };

  const openPage = (page: string) => {
    if( page === 'Back To Demos') {
      window.location.href = "https://markgregg.github.io/demo-home/"; 
    } else {
      setPage(page);
    } 
  }

  return (
    <div class="frame">
      <div class="page">
        <div class='header'>
          <div class="heading">
            <h1 class="title">SolidJs-Select</h1>
            <p class="statement">
              A compact, highly functional select control for SolidJs
            </p>
          </div>
          <div class="menu-bar">
            <div class="menu">
              {pages.map((pg) => (
                <div class="menu-item" onClick={() => openPage(pg)}>
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

        </div>
        <div class="body">
          <div class="context">
            {
              (page() === 'Examples' && <Examples />) ||
              (page() === 'Getting Started' && <GettingStarted />) ||
              (page() === 'Styling' && <Styling />)
            }
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
