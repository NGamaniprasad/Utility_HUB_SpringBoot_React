
import { useState } from "react";
import "./AgeCalculator.css";

function AgeCalculator() {
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculateAge = () => {
    setError("");
    setResult(null);

    if (!dateOfBirth) {
      setError("Please select your date of birth.");
      return;
    }

    const birthDate = new Date(`${dateOfBirth}T00:00:00`);
    const today = new Date();

    if (Number.isNaN(birthDate.getTime())) {
      setError("Please enter a valid date of birth.");
      return;
    }

    if (birthDate > today) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;

      const previousMonthLastDay = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      ).getDate();

      days += previousMonthLastDay;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor(
      (today - birthDate) / (1000 * 60 * 60 * 24)
    );

    const totalMonths = years * 12 + months;

    const nextBirthday = new Date(
      today.getFullYear(),
      birthDate.getMonth(),
      birthDate.getDate()
    );

    if (nextBirthday < today) {
      nextBirthday.setFullYear(
        today.getFullYear() + 1
      );
    }

    const millisecondsUntilBirthday =
      nextBirthday - today;

    const daysUntilBirthday = Math.ceil(
      millisecondsUntilBirthday /
        (1000 * 60 * 60 * 24)
    );

    const birthdayDay = birthDate.toLocaleDateString(
      "en-US",
      {
        weekday: "long",
      }
    );

    setResult({
      years,
      months,
      days,
      totalMonths,
      totalDays,
      daysUntilBirthday,
      birthdayDay,
    });
  };

  const handleReset = () => {
    setDateOfBirth("");
    setResult(null);
    setError("");
  };

  return (
    <main className="age-calculator-page">

      <section className="age-calculator-header">
        <div className="container">

          <span className="section-label">
            UTILITYHUB
          </span>

          <h1>Age Calculator</h1>

          <p>
            Calculate your exact age from your date of birth.
          </p>

        </div>
      </section>

      <section className="age-calculator-content">

        <div className="container">

          <div className="age-calculator-card">

            <div className="age-calculator-form">

              <label htmlFor="dateOfBirth">
                Date of Birth
              </label>

              <input
                id="dateOfBirth"
                type="date"
                value={dateOfBirth}
                max={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                onChange={(event) =>
                  setDateOfBirth(event.target.value)
                }
              />

              {error && (
                <div className="age-calculator-error">
                  {error}
                </div>
              )}

              <div className="age-calculator-actions">

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={calculateAge}
                >
                  Calculate Age
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleReset}
                >
                  Reset
                </button>

              </div>

            </div>

            {result && (

              <div className="age-calculator-result">

                <h2>Your Age</h2>

                <div className="age-main-result">

                  <strong>
                    {result.years}
                  </strong>

                  <span>Years</span>

                  <strong>
                    {result.months}
                  </strong>

                  <span>Months</span>

                  <strong>
                    {result.days}
                  </strong>

                  <span>Days</span>

                </div>

                <div className="age-details">

                  <div className="age-detail">
                    <span>Total Months</span>
                    <strong>
                      {result.totalMonths}
                    </strong>
                  </div>

                  <div className="age-detail">
                    <span>Total Days</span>
                    <strong>
                      {result.totalDays.toLocaleString()}
                    </strong>
                  </div>

                  <div className="age-detail">
                    <span>Born On</span>
                    <strong>
                      {result.birthdayDay}
                    </strong>
                  </div>

                  <div className="age-detail">
                    <span>Next Birthday</span>
                    <strong>
                      {result.daysUntilBirthday === 0
                        ? "Today 🎉"
                        : `${result.daysUntilBirthday} days`}
                    </strong>
                  </div>

                </div>

              </div>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default AgeCalculator;

