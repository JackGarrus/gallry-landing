import { track } from "../lib/analytics";

export default function Header() {
  return (
    <header className="header">
      <a className="wordmark" href="/">
        GALLRY
      </a>

      <a
        className="header-cta"
        href="#join"
        onClick={() => {
          track("Join Beta HEADER Click");
        }}
      >
        Join the beta
      </a>
    </header>
  );
}
