import { useState } from "react";
import { Link } from "react-router-dom";
import "./GSTCalculator.css";

function GSTCalculator() {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const [calculationType, setCalculationType] =
    useState("exclusive");

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  // =========================================================
  // CALCULATE GST
  // =========================================================

  const calculateGST = () => {
    setError("");
    setResult(null);

    if (amount.trim() === "") {
      setError("Please enter an amount.");
      return;
    }

    const value = Number(amount);
    const rate = Number(gstRate);

    if (!Number.isFinite(value)) {
      setError("Please enter a valid amount.");
      return;
    }

    if (value < 0) {
      setError("Amount cannot be negative.");
      return;
    }

    if (!Number.isFinite(rate) || rate < 0) {
      setError("Please select a valid GST rate.");
      return;
    }

    let baseAmount;
    let gstAmount;
    let totalAmount;

    // =======================================================
    // GST EXCLUSIVE
    // Amount does NOT include GST
    // =======================================================

    if (calculationType === "exclusive") {
      baseAmount = value;

      gstAmount =
        (baseAmount * rate) / 100;

      totalAmount =
        baseAmount + gstAmount;
    }

    // =======================================================
    // GST INCLUSIVE
    // Amount ALREADY includes GST
    // =======================================================

    else {
      totalAmount = value;

      baseAmount =
        totalAmount /
        (1 + rate / 100);

      gstAmount =
        totalAmount - baseAmount;
    }

    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;

    setResult({
      baseAmount,
      gstAmount,
      totalAmount,
      cgst,
      sgst,
      rate,
    });
  };

  // =========================================================
  // RESET
  // =========================================================

  const handleReset = () => {
    setAmount("");
    setGstRate("18");
    setCalculationType("exclusive");

    setResult(null);
    setError("");
  };

  // =========================================================
  // FORMAT CURRENCY
  // =========================================================

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(value);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="gst-calculator-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="gst-calculator-header">

        <div className="container">

          <span className="section-label">
            FINANCIAL TOOLS
          </span>

          <h1>
            GST Calculator
          </h1>

          <p>
            Calculate GST, CGST, SGST, and
            total amount quickly.
          </p>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="gst-calculator-content">

        <div className="container">

          <div className="gst-calculator-card">

            {/* =================================================
                FORM
            ================================================= */}

            <div className="gst-calculator-form">

              {/* AMOUNT */}

              <div className="gst-form-group">

                <label htmlFor="amount">
                  Amount
                </label>

                <div className="gst-input-wrapper">

                  <span>
                    ₹
                  </span>

                  <input
                    id="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={amount}
                    onChange={(event) =>
                      setAmount(
                        event.target.value
                      )
                    }
                    placeholder="Example: 10000"
                  />

                </div>

              </div>


              {/* GST RATE */}

              <div className="gst-form-group">

                <label htmlFor="gstRate">
                  GST Rate
                </label>

                <select
                  id="gstRate"
                  value={gstRate}
                  onChange={(event) =>
                    setGstRate(
                      event.target.value
                    )
                  }
                >

                  <option value="0">
                    0%
                  </option>

                  <option value="5">
                    5%
                  </option>

                  <option value="12">
                    12%
                  </option>

                  <option value="18">
                    18%
                  </option>

                  <option value="28">
                    28%
                  </option>

                </select>

              </div>


              {/* CALCULATION TYPE */}

              <div className="gst-form-group">

                <label htmlFor="calculationType">
                  Calculation Type
                </label>

                <select
                  id="calculationType"
                  value={calculationType}
                  onChange={(event) =>
                    setCalculationType(
                      event.target.value
                    )
                  }
                >

                  <option value="exclusive">
                    GST Exclusive
                  </option>

                  <option value="inclusive">
                    GST Inclusive
                  </option>

                </select>

              </div>


              {/* ERROR */}

              {error && (
                <div className="gst-calculator-error">
                  {error}
                </div>
              )}


              {/* ACTIONS */}

              <div className="gst-calculator-actions">

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={calculateGST}
                >
                  Calculate GST
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

              <div className="gst-calculator-result">

                <span className="section-label">
                  RESULT
                </span>

                <h2>
                  GST Summary
                </h2>


                {/* TOTAL */}

                <div className="gst-main-result">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    {formatCurrency(
                      result.totalAmount
                    )}
                  </strong>

                </div>


                {/* RESULT GRID */}

                <div className="gst-result-grid">

                  <div className="gst-result-item">

                    <span>
                      Base Amount
                    </span>

                    <strong>
                      {formatCurrency(
                        result.baseAmount
                      )}
                    </strong>

                  </div>


                  <div className="gst-result-item">

                    <span>
                      GST ({result.rate}%)
                    </span>

                    <strong>
                      {formatCurrency(
                        result.gstAmount
                      )}
                    </strong>

                  </div>


                  <div className="gst-result-item">

                    <span>
                      CGST
                    </span>

                    <strong>
                      {formatCurrency(
                        result.cgst
                      )}
                    </strong>

                  </div>


                  <div className="gst-result-item">

                    <span>
                      SGST
                    </span>

                    <strong>
                      {formatCurrency(
                        result.sgst
                      )}
                    </strong>

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* =================================================
              BACK
          ================================================= */}

          <div className="gst-calculator-back">

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

export default GSTCalculator;