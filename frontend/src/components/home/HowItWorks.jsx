import "./HowItWorks.css";

function HowItWorks() {
  const userSteps = [
    {
      number: "01",
      title: "Create an Account",
      description: "Register your UtilityHub account.",
    },
    {
      number: "02",
      title: "Login",
      description: "Securely sign in to your account.",
    },
    {
      number: "03",
      title: "Open Your Dashboard",
      description: "Access your personalized dashboard.",
    },
    {
      number: "04",
      title: "Choose a Tool",
      description: "Select the utility you need.",
    },
    {
      number: "05",
      title: "Use and Favourite",
      description: "Use tools and save your favourites.",
    },
  ];

  const adminSteps = [
    {
      number: "01",
      title: "Admin Login",
      description: "Sign in using your Admin ID.",
    },
    {
      number: "02",
      title: "Admin Dashboard",
      description: "Manage the UtilityHub platform.",
    },
    {
      number: "03",
      title: "Manage Platform",
      description: "Control users, tools and platform settings.",
    },
  ];

  return (
    <section className="how-it-works">
      <div className="container">

        <div className="how-heading">
          <span className="section-label">
            HOW IT WORKS
          </span>

          <h2>
            Simple, Organized and Easy to Use
          </h2>

          <p>
            UtilityHub keeps everyday tasks simple for both users
            and administrators.
          </p>
        </div>

        {/* User Flow */}
        <div className="workflow-group">
          <h3>User Flow</h3>

          <div className="steps-grid">
            {userSteps.map((step) => (
              <div
                className="step-card"
                key={step.number}
              >
                <span className="step-number">
                  {step.number}
                </span>

                <h4>{step.title}</h4>

                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Flow */}
        <div className="workflow-group">
          <h3>Admin Flow</h3>

          <div className="steps-grid admin-steps">
            {adminSteps.map((step) => (
              <div
                className="step-card"
                key={step.number}
              >
                <span className="step-number">
                  {step.number}
                </span>

                <h4>{step.title}</h4>

                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

export default HowItWorks;