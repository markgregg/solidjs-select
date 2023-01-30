import './About.css';

const About = () => {
  return (
    <div class="about">
      <h2>The why</h2>
      <p>
        When looking for a select control, I struggled to find anything that
        offered the functionality required, while at the same time not taking up
        large amounts of screen real-estate. It was because of that, and having
        never created an open source React offering, I decided to create
        CompactSelect.
      </p>
      <p>The functional requirements were –</p>
      <p class="indent">
        <b class="bullet">&#x2022;</b>
        <em>
          To support differing numbers of selections. In the project I was
          working on, some fields could have one value, while others could have
          multiple. Additionally, some fields had to have a value, while others
          didn’t
        </em>
      </p>
      <p class="indent">
        <b class="bullet">&#x2022;</b>
        <em>
          Type ahead look-up. Some fields in the project had up to sixty
          thousand options, so the ability to reduce the numbers via a type
          ahead look-up was vital.
        </em>
      </p>
      <p class="indent">
        <b class="bullet">&#x2022;</b>
        <em>
          The ability to paste in up to 200 comma delimited customer codes and
          to have the records selected.
        </em>
      </p>
    </div>
  );
};

export default About;
