import { track } from "../lib/analytics";

export default function Header() {
  const confirmation = new URLSearchParams(window.location.search).get(
    "confirmation",
  );

  const hasConfirmationError = confirmation === "expired";

  const message =
    confirmation === "expired"
      ? "Confirmation link expired"
      : "Confirmation link invalid or expired";

  return (
    <header className={`header ${hasConfirmationError ? "header-error" : ""}`}>
      <a className="wordmark" href="/">
        GALLRY
      </a>

      {hasConfirmationError && (
        <div className="confirmation-notice">
          <strong> • {message} • </strong>

          <span>
            Submit your email again to receive a new confirmation link
          </span>
        </div>
      )}

      {hasConfirmationError ? (
        <a className="header-cta" href="#join">
          TRY AGAIN
        </a>
      ) : (
        <a
          className="header-cta"
          href="#join"
          onClick={() => {
            track("Join Beta HEADER Click");
          }}
        >
          Join the beta
        </a>
      )}
    </header>
  );
}
