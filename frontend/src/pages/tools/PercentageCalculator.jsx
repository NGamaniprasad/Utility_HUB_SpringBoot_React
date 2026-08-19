import { useState } from "react";
import { Link } from "react-router-dom";
import "./PercentageCalculator.css";

function PercentageCalculator() {
  const [mode, setMode] = useState("percentageOf");

  const [firstValue, setFirstValue] = useState("");
  const [secondValue, setSecondValue] = useState("");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // =========================================================
  // CALCULATE
  // =========================================================

  const calculate = () => {
    setError("");
    setResult(null);

    if (
      firstValue.trim() === "" ||
      secondValue.trim() === ""
    ) {
      setError("Please enter both values.");
      return;
    }

    const first = Number(firstValue);
    const second = Number(secondValue);

    if (
      !Number.isFinite(first) ||
      !Number.isFinite(second)
    ) {
      setError("Please enter valid numbers.");
      return;
    }

    let calculatedResult;

    // =======================================================
    // X% OF Y
    // =======================================================

    if (mode === "percentageOf") {
      calculatedResult = (first / 100) * second;

      setResult({
        label: `${first}% of ${second}`,
        value: calculatedResult,
        suffix: "",
      });
    }

    // =======================================================
    // X IS WHAT % OF Y
    // =======================================================

    else if (mode === "whatPercent") {
      if (second === 0) {
        setError(
          "The second value cannot be zero."
        );
        return;
      }

      calculatedResult =
        (first / second) * 100;

      setResult({
        label: `${first} is what % of ${second}`,
        value: calculatedResult,
        suffix: "%",
      });
    }

    // =======================================================
    // PERCENTAGE INCREASE
    // =======================================================

    else if (mode === "increase") {
      if (second === 0) {
        setError(
          "The original value cannot be zero."
        );
        return;
      }

      calculatedResult =
        ((first - second) / second) * 100;

      setResult({
        label: "Percentage Increase",
        value: calculatedResult,
        suffix: "%",
      });
    }

    // =======================================================
    // PERCENTAGE DECREASE
    // =======================================================

    else if (mode === "decrease") {
      if (first === 0) {
        setError(
          "The original value cannot be zero."
        );
        return;
      }

      calculatedResult =
        ((first - second) / first) * 100;

      setResult({
        label: "Percentage Decrease",
        value: calculatedResult,
        suffix: "%",
      });
    }
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    setFirstValue("");
    setSecondValue("");
    setResult(null);
    setError("");
    setMode("percentageOf");
  };

  // =========================================================
  // FORMAT
  // =========================================================

  const formatNumber = (value) => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 2,
    }).format(value);
  };

  // =========================================================
  // CHANGE MODE
  // =========================================================

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setFirstValue("");
    setSecondValue("");
    setResult(null);
    setError("");
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="percentage-calculator-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="percentage-calculator-header">

        <div className="container">

          <span className="section-label">
            MATHEMATICAL TOOLS
          </span>

          <h1>
            Percentage Calculator
          </h1>

          <p>
            Calculate percentages, percentage
            increases, and percentage decreases.
          </p>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="percentage-calculator-content">

        <div className="container">

          <div className="percentage-calculator-card">

            {/* =================================================
                FORM
            ================================================= */}

            <div className="percentage-calculator-form">

              <label>
                Calculation Type
              </label>

              <select
                value={mode}
                onChange={(event) =>
                  handleModeChange(
                    event.target.value
                  )
                }
              >

                <option value="percentageOf">
                  What is X% of Y?
                </option>

                <option value="whatPercent">
                  X is what % of Y?
                </option>

                <option value="increase">
                  Percentage Increase
                </option>

                <option value="decrease">
                  Percentage Decrease
                </option>

              </select>


              {/* =================================================
                  FIRST VALUE
              ================================================= */}

              <div className="percentage-form-group">

                <label htmlFor="firstValue">
                  {mode === "percentageOf"
                    ? "Percentage (%)"
                    : mode === "whatPercent"
                    ? "Value"
                    : "Original Value"}
                </label>

                <input
                  id="firstValue"
                  type="number"
                  step="any"
                  value={firstValue}
                  onChange={(event) =>
                    setFirstValue(
                      event.target.value
                    )
                  }
                  placeholder={
                    mode === "percentageOf"
                      ? "Example: 20"
                      : "Example: 500"
                  }
                />

              </div>


              {/* =================================================
                  SECOND VALUE
              ================================================= */}

              <div className="percentage-form-group">

                <label htmlFor="secondValue">
                  {mode === "percentageOf"
                    ? "Value"
                    : mode === "whatPercent"
                    ? "Total Value"
                    : "New Value"}
                </label>

                <input
                  id="secondValue"
                  type="number"
                  step="any"
                  value={secondValue}
                  onChange={(event) =>
                    setSecondValue(
                      event.target.value
                    )
                  }
                  placeholder={
                    mode === "percentageOf"
                      ? "Example: 500"
                      : "Example: 600"
                  }
                />

              </div>


              {/* =================================================
                  ERROR
              ================================================= */}

              {error && (
                <div className="percentage-calculator-error">
                  {error}
                </div>
              )}


              {/* =================================================
                  ACTIONS
              ================================================= */}

              <div className="percentage-calculator-actions">

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={calculate}
                >
                  Calculate
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


            {/* =================================================
                RESULT
            ================================================= */}

            {result && (

              <div className="percentage-calculator-result">

                <span className="section-label">
                  RESULT
                </span>

                <h2>
                  Calculation Result
                </h2>

                <div className="percentage-main-result">

                  <span>
                    {result.label}
                  </span>

                  <strong>
                    {formatNumber(
                      result.value
                    )}
                    {result.suffix}
                  </strong>

                </div>

              </div>

            )}

          </div>


          {/* =================================================
              BACK
          ================================================= */}

          <div className="percentage-calculator-back">

            <Link
              to="/user/dashboard"
              className="btn btn-secondary"
            >
              ← Back to Dashboard
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}

export default PercentageCalculator;
