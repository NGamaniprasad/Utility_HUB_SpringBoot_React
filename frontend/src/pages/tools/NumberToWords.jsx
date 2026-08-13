
import { useState } from "react";
import { Link } from "react-router-dom";
import "./NumberToWords.css";

function NumberToWords() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // WORD ARRAYS
  // ==========================================

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  // ==========================================
  // CONVERT 0 - 99
  // ==========================================

  const convertBelowHundred = (value) => {
    if (value < 20) {
      return ones[value];
    }

    const ten = Math.floor(value / 10);
    const remainder = value % 10;

    return (
      tens[ten] +
      (remainder > 0 ? ` ${ones[remainder]}` : "")
    );
  };

  // ==========================================
  // CONVERT 0 - 999
  // ==========================================

  const convertBelowThousand = (value) => {
    if (value < 100) {
      return convertBelowHundred(value);
    }

    const hundred = Math.floor(value / 100);
    const remainder = value % 100;

    return (
      `${ones[hundred]} Hundred` +
      (remainder > 0
        ? ` ${convertBelowHundred(remainder)}`
        : "")
    );
  };

  // ==========================================
  // INDIAN NUMBER SYSTEM
  // Crore / Lakh / Thousand / Hundred
  // ==========================================

  const numberToWords = (value) => {
    if (value === 0) {
      return "Zero";
    }

    let remaining = value;
    const parts = [];

    // Crore
    if (remaining >= 10000000) {
      const crore = Math.floor(
        remaining / 10000000
      );

      parts.push(
        `${convertBelowThousand(crore)} Crore`
      );

      remaining %= 10000000;
    }

    // Lakh
    if (remaining >= 100000) {
      const lakh = Math.floor(
        remaining / 100000
      );

      parts.push(
        `${convertBelowThousand(lakh)} Lakh`
      );

      remaining %= 100000;
    }

    // Thousand
    if (remaining >= 1000) {
      const thousand = Math.floor(
        remaining / 1000
      );

      parts.push(
        `${convertBelowThousand(thousand)} Thousand`
      );

      remaining %= 1000;
    }

    // Remaining
    if (remaining > 0) {
      parts.push(
        convertBelowThousand(remaining)
      );
    }

    return parts.join(" ");
  };

  // ==========================================
  // CONVERT
  // ==========================================

  const handleConvert = () => {
    setError("");
    setResult("");

    const value = number.trim();

    if (!value) {
      setError("Please enter a number.");
      return;
    }

    // Only positive whole numbers
    if (!/^\d+$/.test(value)) {
      setError(
        "Please enter a valid whole number."
      );
      return;
    }

    // Remove leading zeroes
    const normalized = value.replace(/^0+/, "") || "0";

    // JavaScript Number safe integer limit
    const numericValue = Number(normalized);

    if (
      !Number.isSafeInteger(numericValue)
    ) {
      setError(
        "Please enter a number up to 15 digits."
      );
      return;
    }

    // Current implementation supports up to 99,99,99,999
    if (numericValue > 999999999) {
      setError(
        "Please enter a number up to 99,99,99,999."
      );
      return;
    }

    setResult(
      numberToWords(numericValue)
    );
  };

  // ==========================================
  // CLEAR
  // ==========================================

  const handleClear = () => {
    setNumber("");
    setResult("");
    setError("");
  };

  // ==========================================
  // ENTER KEY
  // ==========================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleConvert();
    }
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <main className="number-to-words-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <section className="number-to-words-header">

        <div className="container">

          <span className="section-label">
            TEXT TO WORDS
          </span>

          <h1>
            Number to Words
          </h1>

          <p>
            Convert numbers into words using
            the Indian numbering system.
          </p>

        </div>

      </section>


      {/* ======================================
          CONTENT
      ====================================== */}

      <section className="number-to-words-content">

        <div className="container">

          <div className="number-to-words-card">

            <div className="number-to-words-form">

              <label htmlFor="number">
                Enter Number
              </label>

              <input
                id="number"
                type="text"
                inputMode="numeric"
                value={number}
                onChange={(event) =>
                  setNumber(event.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Example: 1234567"
                autoComplete="off"
              />

              {error && (
                <div className="number-to-words-error">
                  {error}
                </div>
              )}


              <div className="number-to-words-actions">

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConvert}
                >
                  Convert to Words
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClear}
                >
                  Clear
                </button>

              </div>

            </div>


            {/* ==================================
                RESULT
            ================================== */}

            {result && (

              <div className="number-to-words-result">

                <span className="section-label">
                  RESULT
                </span>

                <h2>
                  Number in Words
                </h2>

                <div className="number-to-words-output">

                  <strong>
                    {result}
                  </strong>

                </div>

                <div className="number-to-words-original">

                  <span>
                    Number
                  </span>

                  <strong>
                    {Number(
                      number
                    ).toLocaleString("en-IN")}
                  </strong>

                </div>

              </div>

            )}

          </div>


          {/* ==================================
              BACK TO DASHBOARD
          ================================== */}

          <div className="number-to-words-back">

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

export default NumberToWords;

