
import { useState } from "react";
import { Link } from "react-router-dom";
import "./EMICalculator.css";

function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTenure, setLoanTenure] = useState("");
  const [tenureType, setTenureType] = useState("years");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // ==========================================
  // CALCULATE EMI
  // ==========================================

  const calculateEMI = () => {
    setError("");
    setResult(null);

    const principal = Number(loanAmount);
    const annualRate = Number(interestRate);
    const tenure = Number(loanTenure);

    if (!loanAmount || !interestRate || !loanTenure) {
      setError("Please enter all loan details.");
      return;
    }

    if (
      !Number.isFinite(principal) ||
      !Number.isFinite(annualRate) ||
      !Number.isFinite(tenure)
    ) {
      setError("Please enter valid numbers.");
      return;
    }

    if (principal <= 0) {
      setError("Loan amount must be greater than zero.");
      return;
    }

    if (annualRate < 0) {
      setError("Interest rate cannot be negative.");
      return;
    }

    if (tenure <= 0) {
      setError("Loan tenure must be greater than zero.");
      return;
    }

    const months =
      tenureType === "years"
        ? Math.round(tenure * 12)
        : Math.round(tenure);

    if (months <= 0) {
      setError("Please enter a valid loan tenure.");
      return;
    }

    const monthlyRate = annualRate / 12 / 100;

    let emi;

    // Zero-interest loan
    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      const factor = Math.pow(
        1 + monthlyRate,
        months
      );

      emi =
        (principal * monthlyRate * factor) /
        (factor - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    setResult({
      emi,
      totalPayment,
      totalInterest,
      principal,
      months,
      interestRate: annualRate,
    });
  };

  // ==========================================
  // RESET
  // ==========================================

  const handleReset = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTenure("");
    setTenureType("years");
    setResult(null);
    setError("");
  };

  // ==========================================
  // CURRENCY FORMAT
  // ==========================================

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <main className="emi-calculator-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <section className="emi-calculator-header">

        <div className="container">

          <span className="section-label">
            FINANCIAL TOOLS
          </span>

          <h1>
            EMI Calculator
          </h1>

          <p>
            Calculate your monthly loan EMI,
            total interest, and total payment.
          </p>

        </div>

      </section>


      {/* ======================================
          CONTENT
      ====================================== */}

      <section className="emi-calculator-content">

        <div className="container">

          <div className="emi-calculator-card">

            {/* ==================================
                FORM
            ================================== */}

            <div className="emi-calculator-form">

              <div className="emi-form-group">

                <label htmlFor="loanAmount">
                  Loan Amount
                </label>

                <div className="emi-input-wrapper">

                  <span>
                    ₹
                  </span>

                  <input
                    id="loanAmount"
                    type="number"
                    min="0"
                    step="1000"
                    value={loanAmount}
                    onChange={(event) =>
                      setLoanAmount(
                        event.target.value
                      )
                    }
                    placeholder="Example: 1000000"
                  />

                </div>

              </div>


              <div className="emi-form-group">

                <label htmlFor="interestRate">
                  Interest Rate (% per year)
                </label>

                <div className="emi-input-wrapper">

                  <input
                    id="interestRate"
                    type="number"
                    min="0"
                    step="0.01"
                    value={interestRate}
                    onChange={(event) =>
                      setInterestRate(
                        event.target.value
                      )
                    }
                    placeholder="Example: 8.5"
                  />

                  <span>
                    %
                  </span>

                </div>

              </div>


              <div className="emi-form-group">

                <label htmlFor="loanTenure">
                  Loan Tenure
                </label>

                <div className="emi-tenure-row">

                  <input
                    id="loanTenure"
                    type="number"
                    min="1"
                    step="1"
                    value={loanTenure}
                    onChange={(event) =>
                      setLoanTenure(
                        event.target.value
                      )
                    }
                    placeholder={
                      tenureType === "years"
                        ? "Example: 5"
                        : "Example: 60"
                    }
                  />

                  <select
                    value={tenureType}
                    onChange={(event) =>
                      setTenureType(
                        event.target.value
                      )
                    }
                  >

                    <option value="years">
                      Years
                    </option>

                    <option value="months">
                      Months
                    </option>

                  </select>

                </div>

              </div>


              {error && (
                <div className="emi-calculator-error">
                  {error}
                </div>
              )}


              <div className="emi-calculator-actions">

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={calculateEMI}
                >
                  Calculate EMI
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


            {/* ==================================
                RESULT
            ================================== */}

            {result && (

              <div className="emi-calculator-result">

                <span className="section-label">
                  RESULT
                </span>

                <h2>
                  Your Loan Summary
                </h2>


                <div className="emi-main-result">

                  <span>
                    Monthly EMI
                  </span>

                  <strong>
                    {formatCurrency(
                      result.emi
                    )}
                  </strong>

                </div>


                <div className="emi-result-grid">

                  <div className="emi-result-item">

                    <span>
                      Loan Amount
                    </span>

                    <strong>
                      {formatCurrency(
                        result.principal
                      )}
                    </strong>

                  </div>


                  <div className="emi-result-item">

                    <span>
                      Total Interest
                    </span>

                    <strong>
                      {formatCurrency(
                        result.totalInterest
                      )}
                    </strong>

                  </div>


                  <div className="emi-result-item">

                    <span>
                      Total Payment
                    </span>

                    <strong>
                      {formatCurrency(
                        result.totalPayment
                      )}
                    </strong>

                  </div>


                  <div className="emi-result-item">

                    <span>
                      Loan Tenure
                    </span>

                    <strong>
                      {result.months} months
                    </strong>

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* ==================================
              BACK
          ================================== */}

          <div className="emi-calculator-back">

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

export default EMICalculator;

