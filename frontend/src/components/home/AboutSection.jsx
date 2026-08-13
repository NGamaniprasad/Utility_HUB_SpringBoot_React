import "./AboutSection.css";

function AboutSection() {
  const features = [
    "Calculations",
    "Conversions",
    "Text Utilities",
    "Developer Utilities",
    "Student Utilities",
    "Document Utilities",
    "Productivity Utilities",
  ];

  return (
    <section className="about-section">
      <div className="container about-container">

        <div className="about-heading">
          <span className="section-label">
            ABOUT UTILITYHUB
          </span>

          <h2>
            Everything You Need in One Platform
          </h2>
        </div>

        <div className="about-content">
          <p>
            UtilityHub brings useful everyday utilities into one
            professional platform, so you do not have to visit
            multiple websites for simple tasks.
          </p>

          <div className="about-features">
            {features.map((feature) => (
              <div
                className="about-feature"
                key={feature}
              >
                {feature}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default AboutSection;