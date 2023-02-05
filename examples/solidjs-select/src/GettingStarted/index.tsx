import './GettingStarted.css';

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
        <pre>
          <span style={{color:'purple'}}>import</span> <span style={{color:'blue'}}>SolidJsSelect</span> <span style={{color:'purple'}}>from</span> <span style={{color:'orange'}}>"solidjs-select"</span>;\n
          \n
          &lt;<span style={{color:'green'}}>SolidJsSelect</span>\n
            \t<span style={{color:'blue'}}>title=</span><span style={{color:'orange'}}>"title"</span>\n
            \t<span style={{color:'blue'}}>choices=</span><span style={{color:'orange'}}>{["choice1", "choice2", "choice3"]}</span>\n
          /&gt;
        </pre>
      </div>
    </div>
  );
};

export default GettingStarted;
