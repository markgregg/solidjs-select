import './GettingStarted.css';
import CodeView, { javaScriptDefault } from 'solidjs-show-code';

const GettingStarted = () => {
  return (
    <div class='started'>
      <div>
        <h2 class='no-space-after'>Getting Started</h2>
        <p>Follow the below instructions to inlcude SolidJs-Select in your SolidJs project. The theme dropdwon, in top-right hand side of the page, 
           changes the styling varaibles used by the control.
        </p>
        <pre>
          Install SolidJs-Select by\n
          \n
          npm i --save solidjs-select\n
          or\n
          yarn add solidjs-select\n
        </pre>
        <p>Add the control to your project</p>
        <CodeView 
          code={`import SolidJsSelect from "solidjs-select";
 
const Examples = () => {
  return (
    <div>
      <SolidJsSelect
        title="title"
        choices={['choice1', 'choice2', 'choice3']}
      />    
    </div>
  );
};`       }
          styleSheet={javaScriptDefault}
        />
      </div>
    </div>
  );
};

export default GettingStarted;
