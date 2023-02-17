import './GettingStarted.css';
import CodeView, { javaScriptDefault } from 'solidjs-show-code';

const GettingStarted = () => {
  return (
    <div class='started-container'>
      <div class='started'>
        <div>
          <h2 class='no-space-after'>Getting Started</h2>
          <h3>Installation</h3>
          <p>To use SolidJs-Select in your project, follow the below instructions to install the library.</p>
          <pre>
            Install SolidJs-Select by\n
            \n
            npm i --save solidjs-select\n
            or\n
            yarn add solidjs-select\n
          </pre>
          <h3>Adding the control</h3>
          <p>To add the control, copy the below code and paste it into a file within your project.</p>
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
    </div>
  );
};

export default GettingStarted;
