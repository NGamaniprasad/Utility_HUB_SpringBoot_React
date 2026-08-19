import { useState } from "react";
import { Link } from "react-router-dom";
import "./WordsToNumber.css";

function WordsToNumber() {
  const [words, setWords] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // =========================================================
  // NUMBER WORD VALUES
  // =========================================================

  const values = {
    zero: 0,

    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,

    ten: 10,
    eleven: 11,
    twelve: 12,
    thirteen: 13,
    fourteen: 14,
    fifteen: 15,
    sixteen: 16,
    seventeen: 17,
    eighteen: 18,
    nineteen: 19,

    twenty: 20,
    thirty: 30,
    forty: 40,
    fifty: 50,
    sixty: 60,
    seventy: 70,
    eighty: 80,
    ninety: 90,
  };

  // =========================================================
  // CONVERT WORDS TO SUM
  // =========================================================

  const convertWordsToNumber = (input) => {
    const text = input
      .toLowerCase()
      .replace(/-/g, " ")
      .replace(/,/g, "")
      .trim();

    if (!text) {
      throw new Error(
        "Please enter number words."
      );
    }

    const tokens = text.split(/\s+/);

    let sum = 0;

    for (const word of tokens) {
      // Ignore "and"
      if (word === "and") {
        continue;
      }

      // Normal number words
      if (
        Object.prototype.hasOwnProperty.call(
          values,
          word
        )
      ) {
        sum += values[word];
        continue;
      }

      // Hundred
      if (word === "hundred") {
        sum *= 100;
        continue;
      }

      // Thousand
      if (word === "thousand") {
        sum *= 1000;
        continue;
      }

      // Lakh
      if (word === "lakh") {
        sum *= 100000;
        continue;
      }

      // Crore
      if (word === "crore") {
        sum *= 10000000;
        continue;
      }

      throw new Error(
        `Invalid word: "${word}"`
      );
    }

    return sum;
  };

  // =========================================================
  // CONVERT BUTTON
  // =========================================================

  const handleConvert = () => {
    setError("");
    setResult("");

    try {
      const number =
        convertWordsToNumber(words);

      setResult(
        number.toLocaleString("en-IN")
      );
    } catch (err) {
      setError(
        err.message ||
        "Unable to convert."
      );
    }
  };

  // =========================================================
  // CLEAR
  // =========================================================

  const handleClear = () => {
    setWords("");
    setResult("");
    setError("");
  };

  // =========================================================
  // ENTER KEY
  // =========================================================

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleConvert();
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <main className="words-to-number-page">

      {/* HEADER */}

      <section className="words-to-number-header">

        <div className="container">

          <span className="section-label">
            NUMBER CALCULATOR
          </span>

          <h1>
            Words to Number
          </h1>

          <p>
            Enter number words and calculate
            their total value.
          </p>

        </div>

      </section>


      {/* CONTENT */}

      <section className="words-to-number-content">

        <div className="container">

          <div className="words-to-number-card">

            {/* FORM */}

            <div className="words-to-number-form">

              <label htmlFor="numberWords">
                Enter Number Words
              </label>

              <textarea
                id="numberWords"
                value={words}
                onChange={(event) =>
                  setWords(
                    event.target.value
                  )
                }
                onKeyDown={handleKeyDown}
                placeholder="Example: one two three"
                rows="4"
                autoComplete="off"
              />

              {/* EXAMPLES */}

              <div className="words-to-number-examples">

                <span>
                  Examples:
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setWords(
                      "one two three"
                    )
                  }
                >
                  one two three
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setWords(
                      "one three"
                    )
                  }
                >
                  one three
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setWords(
                      "five ten twenty"
                    )
                  }
                >
                  five ten twenty
                </button>

              </div>


              {/* ERROR */}

              {error && (
                <div className="words-to-number-error">
                  {error}
                </div>
              )}


              {/* BUTTONS */}

              <div className="words-to-number-actions">

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConvert}
                >
                  Calculate
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


            {/* RESULT */}

            {result !== "" && (

              <div className="words-to-number-result">

                <span className="section-label">
                  RESULT
                </span>

                <h2>
                  Total
                </h2>

                <div className="words-main-result">

                  <span>
                    Calculated Number
                  </span>

                  <strong>
                    {result}
                  </strong>

                </div>

              </div>

            )}

          </div>


          {/* BACK */}

          <div className="words-to-number-back">

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

export default WordsToNumber;