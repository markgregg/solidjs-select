import CSS from 'csstype';
import SolidJsSelect, { SolidJsSelectProps } from "solidjs-select";
import { ClipboardCopy } from '../components';
import { AiOutlineCopy, AiOutlineCode } from 'solid-icons/ai';
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
import CodeView, { javaScriptDefault } from 'solidjs-show-code';

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
  bindSelection?: string;
  fontSize?: string;
  extraContent?: JSX.Element;
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
      <h3 class="demo-title">{props.title}</h3>
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
        ))
      }
      {
        props.extraContent !== undefined && props.extraContent
      }
      {
        showCode() === props.title && <div class="code">
          <CodeView
            code={props.code ?? ''}
            styleSheet={javaScriptDefault}
          />
        </div>
      }
      <div class='seperator-parent'>
        <div class="seperator"/>
      </div>
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
            width: '280px',
            title: 'String Bind',
            choices: choices,
          }}
          code={`import SolidJsSelect from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Object binding"
          description="Binding to an array of JSON objects is possible, but requires itemValue and itemText properties to be supplied.."
          props={{
            width: '280px',
            title: 'Object Bind',
            choices: objectChoices,
            itemValue: (item) => item.name,
            itemText: (item) => item.name,
            itemDisabled: (item) => item.disabled,
          }}
          code={`import SolidJsSelect from "solidjs-select";

const choices = [
  {name:'choice1', value: 1},
  {name:'choice2', value: 2},
  {name:'choice3', value: 3}
]
const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={choices}
        itemValue={item => item.value}
        itemText={item => item.name}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Typed object binding"
          description="If the objects support the choice interface, then the itemValue and itemText properties are not required."
          props={{
            width: '280px',
            title: 'Typed Bind',
            choices: typedObjectChoices,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const choices: Choice[] = [
  {name:'choice1', value: 1},
  {name:'choice2', value: 2},
  {name:'choice3', value: 3}
]
const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={choices}
      />
    </div>
  );
};

export default Styling;`}
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
            width: '280px',
            title: 'One item',
            choices: choices,
            maximumSelections: 1,
            minimumSelections: 1,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        maximumSelections={1}
        minimumSelections={1}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Single or none"
          description="It is possible to configure the control to allow the user to select 1 or no items."
          props={{
            width: '280px',
            title: 'One Or None',
            choices: objectChoices,
            maximumSelections: 1,
            itemValue: (item) => item.name,
            itemText: (item) => item.name,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        maximumSelections={1}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Single on change"
          description="The below example demonstrates listening to the onChange event for a single selection control."
          props={{
            width: '280px',
            title: 'Single Change',
            choices: choices,
            maximumSelections: 1,
            minimumSelections: 1,
          }}
          bindSelection="single"
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        maximumSelections={1}
        minimumSelections={1}
        onChange={selection => console.log(selection)}
      />
    </div>
  );
};

export default Styling;`}
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
            width: '280px',
            title: 'Multiple',
            choices: choices,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Limited selection"
          description="If there is a requirement to limit the number of selections that is possible. In this case the max is 3."
          props={{
            width: '280px',
            title: 'Three Items',
            choices: objectChoices,
            maximumSelections: 3,
            itemValue: (item) => item.name,
            itemText: (item) => item.name,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        maximumSelections={3}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Multiple on change"
          description="The below example demonstrates listening to the onChange event when using mutiple selection control."
          props={{
            width: '280px',
            title: 'Multiple Change',
            choices: choices,
          }}
          bindSelection="multi"
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        onChange={selection => console.log(selection)}
      />
    </div>
  );
};

export default Styling;`}
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
          description="Font size is variable and the control can potentially handle any size. It is also possible to change the tooltip and title font size, but that hasn't been done for these examples."
          fontSize="x-large"
          props={{
            width: '280px',
            title: 'Extra Large Font',
            choices: choices,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        fontSize='x-large'
        choices={['choice1','choice2','choice3']}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Large font"
          description="Some sizes are better than others."
          fontSize="large"
          props={{
            width: '280px',
            title: 'Large Font',
            choices: choices
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        fontSize='large'
        choices={['choice1','choice2','choice3']}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Meduium font"
          description="Meduium font"
          fontSize="medium"
          props={{
            width: '280px',
            title: 'Meduium Font',
            choices: choices
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        fontSize='medium'
        choices={['choice1','choice2','choice3']}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Small font"
          description="Small font"
          fontSize="small"
          props={{
            width: '280px',
            title: 'Small Font',
            choices: choices,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        fontSize='small'
        choices={['choice1','choice2','choice3']}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Very Small font"
          description="Very small font"
          fontSize="x-small"
          props={{
            width: '280px',
            title: 'Very small font',
            choices: choices,
          }}
          extraContent={
            <div style={{height: '100px'}}/>
          }
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        fontSize='x-small'
        choices={['choice1','choice2','choice3']}
      />
    </div>
  );
};

export default Styling;`}
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
            width: '280px',
            title: 'Tooltip Default',
            choices: choices,
            selected: ['Nuala', 'Sarah', 'Jane', 'Dianna']
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Tooltip above"
          description="It is possible to place the tooltip above."
          props={{
            width: '280px',
            title: 'Tooltip Above',
            choices: choices,
            selected: ['Nuala', 'Sarah', 'Jane', 'Dianna'],
            toolTipPosition: 'above'
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        toolTipPosition: 'above'
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Tooltip left"
          description="Or to the left of the control."
          props={{
            width: '280px',
            title: 'Tooltip Left',
            choices: choices,
            selected: ['Nuala', 'Sarah', 'Jane', 'Dianna'],
            toolTipPosition: 'left'
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        toolTipPosition: 'left'
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Tooltip right"
          description="Or to the right of the control."
          props={{
            width: '280px',
            title: 'Tooltip Right',
            choices: choices,
            selected: ['Nuala', 'Sarah', 'Jane', 'Dianna'],
            toolTipPosition: 'right'
          }}
          extraContent={
            <div style={{height: '200px'}}/>
          }
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        toolTipPosition: 'right'
      />
    </div>
  );
};

export default Styling;`}
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
            width: '280px',
            title: 'Icon Style',
            choices: choices,
          }}
         code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Border style"
          description="If a change of icon isn't what you are after, you can use a border indicator."
          props={{
            width: '280px',
            title: 'Border Style',
            selectionType: 'Border',
            choices: choices,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        selectionType='Border'
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Background Style"
          description="Or the options background colour."
          props={{
            width: '280px',
            title: 'Background Style',
            selectionType: 'Background',
            choices: choices,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        selectionType='Background'
      />
    </div>
  );
};

export default Styling;`}
        />
      </div>
    ),
  },
  {
    name: 'Misc',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="Flat edges"
          description="Flat edges are the default type."
          props={{
            width: '280px',
            title: 'Flat edges',
            choices: choices,
          }}
         code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Round edges"
          description="Round edges are an alternative if you want a softer feel."
          props={{
            width: '280px',
            title: 'Round edges',
            choices: choices,
            edgeType: 'Round'
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        selectionType='Border'
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="No floating title"
          description="The floating title can be removed."
          props={{
            width: '280px',
            title: 'No Floating title',
            choices: choices,
            hideTitle: true,
            selected: [choices[0]]
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        hideTitle
      />
    </div>
  );
};

export default Styling;`}
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
            width: '280px',
            title: 'Dropdown',
            choices: choices,
            maximumSelections: 1,
            selectType: 'dropdown',
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        maximumSelections={1}
        selectType='dropdown'
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Multiple value dropdown"
          description="It is also possible to have multiple value dropdowns."
          props={{
            width: '280px',
            title: 'Values Dropdown',
            choices: objectChoices,
            selectType: 'dropdown',
            itemValue: (item) => item.name,
            itemText: (item) => item.name,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        selectType='dropdown'
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Rounded dropdown list"
          description="A rounded dropdown box."
          props={{
            width: '280px',
            title: 'Rounded Dropdown',
            choices: choices,
            maximumSelections: 1,
            edgeType: 'Round',
            selectType: 'dropdown',
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        maximumSelections={1}
        edgeType='Round'
        selectType='dropdown'
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Solid rounded dropdown list"
          description="A solid rounded dropdown box."
          props={{
            width: '280px',
            title: 'Solid Rounded Dropdown',
            choices: choices,
            maximumSelections: 1,
            edgeType: 'Round',
            solidBox: true,
            selectType: 'dropdown',
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        maximumSelections={1}
        edgeType='Round'
        solidBox
        selectType='dropdown'
      />
    </div>
  );
};

export default Styling;`}
        />
      <DemoItem
          title="Rounded dropdown list with solid ends"
          description="A solid rounded dropdown box."
          props={{
            width: '280px',
            title: 'Solid End Rounded Dropdown',
            choices: choices,
            maximumSelections: 1,
            edgeType: 'Round',
            opaqueEnds: true,
            selectType: 'dropdown',
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        maximumSelections={1}
        edgeType='Round'
        opaqueEnds
        selectType='dropdown'
      />
    </div>
  );
};

export default Styling;`}
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
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        selectType='switch'
        minimumSelections={1}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Round switch"
          description="A switch with rounded corners."
          props={{
            width: '120px',
            hideTitle: true,
            title: 'Round Switch',
            choices: choices,
            selectType: 'switch',
            edgeType: 'Round',
            minimumSelections: 1,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        selectType='switch'
        edgeType='Round'
        minimumSelections={1}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Solid round switch"
          description="A sold switch with rounded corners."
          props={{
            width: '120px',
            hideTitle: true,
            title: 'Solid Round Switch',
            choices: choices,
            selectType: 'switch',
            edgeType: 'Round',
            solidBox: true,
            minimumSelections: 1,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        selectType='switch'
        edgeType='Round',
        solidBox
        minimumSelections={1}
      />
    </div>
  );
};

export default Styling;`}
        />
      </div>
    ),
  },
  {
    name: 'Promises',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="Promise look-up"
          description="If you can't access all avaiable options, then options can be provied by a promise."
          props={{
            width: '280px',
            title: 'Typeahead Look-up',
            typeAheadLookUp: fetchItems,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        typeAheadLookUp={fetchitems}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Cached look-up"
          description="If the source of the options is not performant, then there is the option to cache."
          props={{
            width: '280px',
            title: 'Cached Look-up',
            typeAheadLookUp: slowFetchObjects,
            itemValue: (item) => item.name,
            itemText: (item) => item.name,
            cacheLookUp: true,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        typeAheadLookUp={fetchitems}
        cacheLookUp={true}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Expiring Cached string look-up"
          description="To avoid a build up of memory, the cached items can be given a time to live."
          props={{
            width: '280px',
            title: 'Expiring Cache',
            typeAheadLookUp: slowFetchItems,
            cacheLookUp: true,
            cacheTimeToLive: 10,
            cacheExpiryCheck: 10,
          }}
           code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        typeAheadLookUp={fetchitems}
        cacheLookUp={true}
        cacheTimeToLive={10}
        cacheExpiryCheck={10}
      />
    </div>
  );
};

export default Styling;`}
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
            width: '280px',
            title: 'Disabled',
            choices: choices,
            selected: ['Sarah', 'Dianna'],
            disabled: true,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        disabled={true}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Disbaled items"
          description="Or if using an array of objects that implement the Choice interface, indivual items can be disabled."
          props={{
            width: '280px',
            title: 'Disabled Items',
            choices: typedObjectChoices,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const choices: Choice[] = [
  {name:'choice1', value: 1, disabled: true},
  {name:'choice2', value: 2},
  {name:'choice3', value: 3}
]
const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={choices}
      />
    </div>
  );
};

export default Styling;`}
        />
      </div>
    ),
  },
  {
    name: 'Paste Selections',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="Paste items 1"
          description="It's possible to paste a comma delimited list of strings into the control."
          props={{
            width: '280px',
            title: 'String paste',
            typeAheadLookUp: fetchItems,
            itemSearch: searchItems,
          }}
          extraContent={
            <div class="copy-text">
              <p>Copy for string and object paste</p>
              <ClipboardCopy text={bigString} />
            </div>
          }
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        typeAheadLookUp={fetchItems}
        itemSearch={searchItems}
      />
    </div>
  );
};

export default Styling;`}
        />
        <DemoItem
          title="Pasting for typed objects"
          description="The paste option also works for arrays of objects."
          props={{
            width: '280px',
            title: 'Object paste',
            typeAheadLookUp: fetchTyped,
            itemSearch: searchTyped,
          }}
          extraContent={
            <div class="copy-text">
              <p>Copy for typed paste</p>
              <ClipboardCopy text={bigTypesObjectString} />
            </div>
          }
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={['choice1','choice2','choice3']}
        typeAheadLookUp={fetchItems}
        itemSearch={searchItems}
      />
    </div>
  );
};

export default Styling;`}
        />
      </div>
    ),
  },
  {
    name: 'Virtualised',
    demo: () => (
      <div class="demo">
        <DemoItem
          title="Virtualised"
          description="The only limit to the number of options is memory. The control uses virtualisation, so most options are not rendered until required."
          props={{
            width: '280px',
            title: 'Style',
            choices: massiveChoice,
          }}
          code={`import SolidJsSelect, { Choice } from "solidjs-select";

const bigItemList = [items...];
const Styling = () => {
  return (
    <div class='example'>
      <SolidJsSelect
        title="example"
        choices={bigItemList}
      />
    </div>
  );
};

export default Styling;`}
        />
      </div>
    ),
  },
];