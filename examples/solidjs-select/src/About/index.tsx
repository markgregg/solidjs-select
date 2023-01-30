import './About.css';

const About = () => {
  return (
    <div class="about">
      <h2>The why</h2>
      <p>
        I came across SolidJs a year ago and had planned to do something with it, but the opportunity
        never arose. Then, after coming across it again, I deiced to convert a React control I had written. 
        For most part the conversion was easy, but I was surprised that despite being so alike, there are 
        very different approaches reqired to exploit React's and SolidJs's reactivity.
        Anyway SolidJsSelect is my effort and it's a slight improvement on the React implementation. For one it 
        has virtualisation, and Solid is fast, very fast.
      </p>
      <p>The original requirements were –</p>
      <p class="indent">
        <b class="bullet">&#x2022;</b>
        <em>
          To support differing numbers of selections. In the project I was working on for my company, some fields 
          could have one value, while others could have multiple. Additionally, some fields had to have a value, 
          while others didn’t.
        </em>
      </p>
      <p class="indent">
        <b class="bullet">&#x2022;</b>
        <em>
          Type ahead look-up. Some fields in the project had up to sixty thousand options, so the ability to reduce 
          the numbers via a type ahead look-up was vital.
        </em>
      </p>
      <p class="indent">
        <b class="bullet">&#x2022;</b>
        <em>
          The ability to paste in up to 2000 comma delimited customer codes and to have the records selected. I test
           this at work with 10000. Incidently I was using Oracle as backend, which has a limit of 1000 values. To
           overcome Oracle's limitation I split the query into multiple promises and joined the results.
        </em>
      </p>
      <p class="indent">
        <b class="bullet">&#x2022;</b>
        <em>
          As I mentioned above, I also added virtualisation to the Solid version. It wasn't need in the version used 
          at work, becasue we opted for a typeahead approach. 
        </em>
      </p>
    </div>
  );
};

export default About;
