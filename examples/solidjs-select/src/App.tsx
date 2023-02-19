import SolidJsSelect from "solidjs-select";
import GettingStarted from './GettingStarted';
import Examples from './Examples';
import Styling from './Styling';
import './App.css';
import { applyTheme, themes, Themes } from './themes/themes';
import { createSignal, onMount } from 'solid-js';

const pages = ['Examples','Get Started', 'Style', 'More Demos'];

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
    if( page === 'More Demos') {
      window.location.href = "https://markgregg.github.io/demo-home/"; 
    } else {
      setPage(page);
    } 
  }

  return (
    <div class="frame">
      <div 
        class={ "page" + (themeName()===Themes.Dark 
          ? " dark"
          : themeName()===Themes.Light
            ? " light"
            : themeName()===Themes.Blue
            ? " blue"
            : " plain")
        }
      >
        <div class='header'>
          <div class="heading">
            <h2 class="title">SolidJs-Select</h2>
            <p class="statement">
              A compact, highly functional select control.
            </p>
          </div>
          <div class="menu-bar">
            <div class="menu-container">
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
                hideDivider
              />
            </div>
          </div>

        </div>
        <div class="body">
          <div class="context">
            {
              (page() === 'Examples' && <Examples />) ||
              (page() === 'Get Started' && <GettingStarted />) ||
              (page() === 'Style' && <Styling />)
            }
          </div>
        </div>
        <div class="footer-container">
          <div class="footer">
            <p class="no-padding">Created by Mark Gregg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
