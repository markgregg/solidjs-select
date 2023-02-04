import CSS from 'csstype';
import SolidJsSelect, { SolidJsSelectProps } from "solidjs-select";
import { ClipboardCopy } from '../components';
import { AiOutlineEdit, AiOutlineCopy, AiOutlineCode } from 'solid-icons/ai';
import {
  bigString,
  bigTypesObjectString,
  choices,
  massiveChoice,
  objectChoices,
  typedObjectChoices,
} from '../data/data';
import {
  fetchItems,
  fetchTyped,
  searchItems,
  searchTyped,
  slowFetchItems,
  slowFetchObjects,
} from '../utils';
import './Examples.css';
import { createSignal, JSX } from 'solid-js';

const itemDisplay = (
  text: string,
  color: CSS.Property.Color,
  highlight: boolean
): JSX.Element => (
  <div
    style={{
      display: 'flex',
      'flex-direction': 'row',
      'align-items': 'center',
      'column-gap': '10px',
    }}
  >
    {text !== '' && (
      <div
        style={{
          'background-color': color,
          height: '10px',
          width: '10px',
          'border-radius': '15px',
        }}
      />
    )}
    <p
      style={{
        'margin-block-start': '0px',
        'margin-block-end': '0px',
        color: highlight ? 'lightgreen' : undefined,
        'font-weight': highlight ? 'bold' : 'normal',
      }}
    >
      {text}
    </p>
  </div>
);


interface DemoItemProperties<T extends object | string> {
  title: string;
  description: string;
  props: SolidJsSelectProps<T>;
  code?: string;
  sandbox?: string;
  bindSelection?: string;
  fontSize?: string;
}
const DemoItem = <T extends object | string>(props: DemoItemProperties<T>) => {
  const [showCode, setShowCode] = createSignal<string>('');
  const [showCopied, setShowCopied] = createSignal<boolean>(false);
  const [selection, setSelection] = createSignal<T[]>([]);
  const [multiSelection, setMultiSelection] = createSignal<T[]>([]);

  const selectionChanged = (items: T[], single: boolean) => {
    if (single) {
      setSelection(items);
    } else {
      setMultiSelection(items);
    }
  };

  const compactSelectProps = (): SolidJsSelectProps<T> => {
    switch (props.bindSelection) {
      case 'single':
        return {
          selected: selection(),
          onChange: (items) => selectionChanged(items, true),
          ...props.props,
        };
      case 'multi':
        return {
          selected: multiSelection(),
          onChange: (items) => selectionChanged(items, false),
          ...props.props,
        };
      default:
        return {
          ...props.props,
        };
    }
  };

  return (
    <div class="demo">
      <h2 class="demo-title">{props.title}</h2>
      <div class="demo-description">
        <p>{props.description}</p>
      </div>
      <div class="demo-item"
        style={{
          '--solidjsSelectFontSize': props.fontSize ?? 'large',
          '--solidjsSelectSelectedIconSize': props.fontSize ?? 'large',
          '--solidjsSelectClearSelectionIconSize': props.fontSize ?? 'large',
          '--solidjsSelectDropDownIconSize': props.fontSize ?? 'large'
          }}
      >
        <SolidJsSelect {...compactSelectProps()} />
        <div class="icons">
          <AiOutlineCode
            onClick={() => {
              setShowCode(showCode() === props.title ? '' : props.title);
            }}
          />
          <div class="copy-wrapper">
            <AiOutlineCopy
              onClick={() => {
                navigator.clipboard.writeText(props.code ?? '');
                setShowCopied(true);
                setTimeout(() => setShowCopied(false), 2000);
              }}
            />
            {showCopied() && <p class="copied-text">Copied</p>}
          </div>
          <AiOutlineEdit onClick={() => window.open(props.sandbox, '_blank')} />
        </div>
      </div>
      {(props.bindSelection === 'single' && (
        <div>
          <p>selection={selection().toString()}</p>
        </div>
      )) ||
        (props.bindSelection === 'multi' && (
          <div>
            <p>selection={multiSelection().toString()}</p>
          </div>
        ))}
      {showCode() === props.title && <div class="code"></div>}
    </div>
  );
};

export interface Category {
  name: string;
  demo: () => JSX.Element;
}

export const categories: Category[] = [
  {
    name: 'Binding',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="String binding"
          description="The below example demonstrates binding to an array of strings."
          props={{
            width: '300px',
            title: 'String Bind',
            choices: choices,
          }}
          code={`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/string-binding-9jlrb0"
        />
        <DemoItem
          title="Object binding"
          description="Binding to an array of JSON objects is possible, but requires itemValue and itemText properties to be supplied.."
          props={{
            width: '300px',
            title: 'Object Bind',
            choices: objectChoices,
            itemValue: (item) => item.name,
            itemText: (item) => item.name,
            itemDisabled: (item) => item.disabled,
          }}
          code={`import SolidJsSelect from "compact-select";
import { objectChoices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={objectChoices}
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
        itemDisabled={(item) => item.disabled}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/object-binding-forked-d54u70"
        />
        <DemoItem
          title="Typed object binding"
          description="If the objects support the choice interface, then the itemValue and itemText properties are not required."
          props={{
            width: '300px',
            title: 'Typed Bind',
            choices: typedObjectChoices,
          }}
          code={`import SolidJsSelect from "compact-select";
import { typedObjectChoices } from "./data";
import "./styles.css";

export default function App() {
return (
<div class="Space">
  <SolidJsSelect
    title="test"
    choices={typedObjectChoices}
  />
</div>
);
}`}
          sandbox="https://codesandbox.io/s/typed-binding-cdhsme"
        />
      </div>
    ),
  },
  {
    name: 'Single selection',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="Single value"
          description="The below example demonstrates a control where the user has to select at least 1 item."
          props={{
            width: '300px',
            title: 'One item',
            choices: choices,
            maximumSelections: 1,
            minimumSelections: 1,
          }}
          code={`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices},
        maximumSelections={1} 
        minimumSelections={1}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/simple-single-string-compact-select-j6hpei"
        />
        <DemoItem
          title="Single or none"
          description="It is possible to configure the control to allow the user to select 1 or no items."
          props={{
            width: '300px',
            title: 'One Or None',
            choices: objectChoices,
            maximumSelections: 1,
            itemValue: (item) => item.name,
            itemText: (item) => item.name,
          }}
          code={`import SolidJsSelect from "compact-select";
import { objectChoices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={objectChoices}
        maximumSelections={1}
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/simple-single-no-value-compact-select-oskfme"
        />
        <DemoItem
          title="Single on change"
          description="The below example demonstrates listening to the onChange for a single selection."
          props={{
            width: '300px',
            title: 'Single Change',
            choices: choices,
            maximumSelections: 1,
            minimumSelections: 1,
          }}
          bindSelection="single"
          code={`import SolidJsSelect from "compact-select";
          import { useState } from "react";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  maximumSelections={1}
                  minimumSelections={1}
                  onChange={setSelected}
                />
              </div>
            );
          }`}
          sandbox="https://codesandbox.io/s/simple-single-string-compact-select-bound-to-sate-tlbmhf"
        />
      </div>
    ),
  },
  {
    name: 'Multi select',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="Multiple selection"
          description="The below example demonstrates a contorl configured for ultimate number of selections."
          props={{
            width: '300px',
            title: 'Multiple',
            choices: choices,
          }}
          code={`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-2wbrc2"
        />
        <DemoItem
          title="Limited selection"
          description="If there is a requirement to limit the number of selections that is possible. In this case the max is 3."
          props={{
            width: '300px',
            title: 'Three Items',
            choices: objectChoices,
            maximumSelections: 3,
            itemValue: (item) => item.name,
            itemText: (item) => item.name,
          }}
          code={`import SolidJsSelect from "compact-select";
import { objectChoices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={objectChoices}
        maximumSelections={3}
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-bound-gr13pq"
        />
        <DemoItem
          title="Multiple on change"
          description="The below example demonstrates listening to the onchange of mutiple selection control."
          props={{
            width: '300px',
            title: 'Multiple Change',
            choices: choices,
          }}
          bindSelection="multi"
          code={`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-2wbrc2"
        />
      </div>
    ),
  },
  {
    name: 'Font Size',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="Extra large font"
          description="Font size is variable and the control can potentially handle any size. It is also possible to change the tooltip and title size, but hasn't been done for these examples."
          fontSize="x-large"
          props={{
            width: '400px',
            title: 'Extra Large Font',
            choices: choices,
          }}
          code={`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-2wbrc2"
        />
        <DemoItem
          title="Large font"
          description="Some sizes are better than others."
          fontSize="large"
          props={{
            width: '300px',
            title: 'Large Font',
            choices: choices
          }}
          code={`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-2wbrc2"
        />
        <DemoItem
          title="Meduium font"
          description="Meduium font"
          fontSize="medium"
          props={{
            width: '300px',
            title: 'Meduium Font',
            choices: choices
          }}
          code={`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-2wbrc2"
        />
        <DemoItem
          title="Small font"
          description="Small font"
          fontSize="small"
          props={{
            width: '300px',
            title: 'Small Font',
            choices: choices,
          }}
          code={`import SolidJsSelect from "compact-select";
import { objectChoices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={objectChoices}
        maximumSelections={3}
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-bound-gr13pq"
        />
        <DemoItem
          title="Very Small font"
          description="Very small font"
          fontSize="x-small"
          props={{
            width: '300px',
            title: 'Very small font',
            choices: choices,
          }}
          code={`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-2wbrc2"
        />
      </div>
    ),
  },
  {
    name: 'Tooltip',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="Tooltip default"
          description="By default the tooltip is place beneath the control."
          props={{
            width: '400px',
            title: 'Tooltip Default',
            choices: choices,
            selected: ['Nuala', 'Sarah', 'Jane', 'Dianna']
          }}
          code={`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-2wbrc2"
        />
        <DemoItem
          title="Tooltip above"
          description="It is possible to place the tooltip above."
          props={{
            width: '400px',
            title: 'Tooltip Above',
            choices: choices,
            selected: ['Nuala', 'Sarah', 'Jane', 'Dianna'],
            toolTipPosition: 'above'
          }}
          code={`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-2wbrc2"
        />
        <DemoItem
          title="Tooltip left"
          description="Or to the left of the control."
          props={{
            width: '400px',
            title: 'Tooltip Left',
            choices: choices,
            selected: ['Nuala', 'Sarah', 'Jane', 'Dianna'],
            toolTipPosition: 'left'
          }}
          code={`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-2wbrc2"
        />
        <DemoItem
          title="Tooltip right"
          description="Or to the right of the control. In this instance the tooltip is trimming by the containing div's overflow setting."
          props={{
            width: '400px',
            title: 'Tooltip Right',
            choices: choices,
            selected: ['Nuala', 'Sarah', 'Jane', 'Dianna'],
            toolTipPosition: 'right'
          }}
          code={`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-2wbrc2"
        />
      </div>
    ),
  },
  {
    name: 'Select style',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="Icon style"
          description="There are a few options fot the selection indication. The default is a tick icon, which can be changed."
          props={{
            width: '300px',
            title: 'Icon Style',
            choices: choices,
          }}
          code={`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-2wbrc2"
        />
        <DemoItem
          title="Border style"
          description="If a change of icon isn't what you are after, you can use a border indicator."
          props={{
            width: '300px',
            title: 'Border Style',
            selectionType: 'Border',
            choices: choices,
          }}
          code={`import SolidJsSelect from "compact-select";
import { objectChoices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={objectChoices}
        maximumSelections={3}
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-bound-gr13pq"
        />
        <DemoItem
          title="Background Style"
          description="Or the options background colour."
          props={{
            width: '300px',
            title: 'Background Style',
            selectionType: 'Background',
            choices: choices,
          }}
          code={`import { useState } from "react";
          import SolidJsSelect from "compact-select";
          import { choices } from "./data";
          import "./styles.css";
          
          export default function App() {
            const [selected, setSelected] = useState<String[]>([]);
            
            return (
              <div class="Space">
                <SolidJsSelect
                  title="test"
                  choices={choices}
                  selected={selected}
                  onChange={setSelected}
                />
              </div>
            );
          }`}
          sandbox="https://codesandbox.io/s/multi-string-compact-select-2wbrc2"
        />
      </div>
    ),
  },
  {
    name: 'Dropdown lists',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="Single dropdown list"
          description="As well as combo controls, simple dropdowns are available."
          props={{
            width: '300px',
            title: 'Dropdown',
            choices: choices,
            maximumSelections: 1,
            selectType: 'dropdown',
          }}
          code={`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
        maximumSelections={1}
        selectType="dropdown"
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/single-string-dropdown-er55j4"
        />
        <DemoItem
          title="Multiple value dropdown"
          description="It is also possible to have multiple value dropdowns."
          props={{
            width: '300px',
            title: 'Values Dropdown',
            choices: objectChoices,
            selectType: 'dropdown',
            itemValue: (item) => item.name,
            itemText: (item) => item.name,
          }}
          code={`import SolidJsSelect from "compact-select";
import { objectChoices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={objectChoices}
        selectType="dropdown" 
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/multi-value-dropdown-z5sbbo"
        />
      </div>
    ),
  },
  {
    name: 'Switches',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="Switch"
          description="Switches are also possible. Useful if there are a limited number of options."
          props={{
            width: '120px',
            hideTitle: true,
            title: 'Switch',
            choices: choices,
            selectType: 'switch',
            minimumSelections: 1,
          }}
          code={`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
        selectType="switch"
        minimumSelections={1}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/string-switch-0zf049"
        />
      </div>
    ),
  },
  {
    name: 'Typeahead Look-ups',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="Typeahead look-up"
          description="If you can't access all avaiable options, then options can be provied by a promise."
          props={{
            width: '300px',
            title: 'Typeahead Look-up',
            typeAheadLookUp: fetchItems,
          }}
          code={`import SolidJsSelect from "compact-select";
import { fetchItems } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        typeAheadLookUp={fetchItems}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/string-look-up-go9qds"
        />
        <DemoItem
          title="Cached look-up"
          description="If the source of the options is not performant, then there is the option to cache."
          props={{
            width: '300px',
            title: 'Cached Look-up',
            typeAheadLookUp: slowFetchObjects,
            itemValue: (item) => item.name,
            itemText: (item) => item.name,
            cacheLookUp: true,
          }}
          code={`import SolidJsSelect from "compact-select";
import { slowFetchObjects } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        typeAheadLookUp={slowFetchObjects}
        itemValue={(item) => item.name} 
        itemText={(item) => item.name}
        cacheLookUp={true}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/cached-value-look-up-t40j5f"
        />
        <DemoItem
          title="Expiring Cached string look-up"
          description="To avoid a build up of memory, the cached items can be given a time to live."
          props={{
            width: '300px',
            title: 'Expiring Cache',
            typeAheadLookUp: slowFetchItems,
            cacheLookUp: true,
            cacheTimeToLive: 10,
            cacheExpiryCheck: 10,
          }}
          code={`import SolidJsSelect from "compact-select";
import { slowFetchItems } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        typeAheadLookUp={slowFetchItems}
        cacheLookUp={true}
        cacheTimeToLive={10}
        cacheExpiryCheck={10}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/cache-string-and-expire-6yz4cg"
        />
      </div>
    ),
  },
  {
    name: 'Disabled',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="Disbaled Control"
          description="Controls can be completely disabled."
          props={{
            width: '300px',
            title: 'Disabled',
            choices: choices,
            selected: ['Sarah', 'Dianna'],
            disabled: true,
          }}
          code={`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
        selected={["Sarah", "Dianna"]}
        disabled={true}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/disabled-string-1tl6jk"
        />
        <DemoItem
          title="Disbaled items"
          description="Or if using an array of objects that implement the Choice interface, indivual items can be disabled."
          props={{
            width: '300px',
            title: 'Disabled Items',
            choices: typedObjectChoices,
          }}
          code={`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/disabled-items-8e2h2h"
        />
      </div>
    ),
  },
  {
    name: 'Paste Selections',
    demo: () => (
      <div class="demo">
        <div class="copy-text">
          <p>Copy for string and object paste</p>
          <ClipboardCopy text={bigString} />
        </div>
        <DemoItem
          title="Paste items 1"
          description="It's possible to paste a comma delimited list of strings into the control."
          props={{
            width: '300px',
            title: 'String paste',
            typeAheadLookUp: fetchItems,
            itemSearch: searchItems,
          }}
          code={`import SolidJsSelect from "compact-select";
import { fetchItems, searchItems } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        typeAheadLookUp={fetchItems}
        itemSearch={searchItems}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/paste-strings-vebiz6"
        />
        <div class="copy-text">
          <p>Copy for typed paste</p>
          <ClipboardCopy text={bigTypesObjectString} />
        </div>
        <DemoItem
          title="Pasting for typed objects"
          description="The paste option also works for arrays of objects."
          props={{
            width: '300px',
            title: 'Object paste',
            typeAheadLookUp: fetchTyped,
            itemSearch: searchTyped,
          }}
          code={`import SolidJsSelect from "compact-select";
import { fetchTyped,searchTyped } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        typeAheadLookUp={fetchTyped}
        itemSearch={searchTyped}
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/paste-vales-sccd7y"
        />
      </div>
    ),
  },
  {
    name: 'Virtualised',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="virtualised"
          description="The only limit to the number of options is memory. The control uses virtualisation, so most options are not rendered until required."
          props={{
            width: '300px',
            title: 'Style',
            choices: massiveChoice,
          }}
          code={`import SolidJsSelect from "compact-select";
import { choices } from "./data";
import "./styles.css";

export default function App() {
  return (
    <div class="Space">
      <SolidJsSelect
        title="test"
        choices={choices}
        selected={["Nuala", "Andrew"]}
        selectStyle={{
          boxShadow: "5px 5px 10px 2px rgba(0,0,0,.8)"
        }}
        clearSelectionclass="icon-spin"
        choiceStyle={{
          textShadow: "2px 2px black"
        }}
        choiceSelectedIconclass="icon-blink"
      />
    </div>
  );
}`}
          sandbox="https://codesandbox.io/s/custom-styles-dwlc5y"
        />
      </div>
    ),
  },
];
