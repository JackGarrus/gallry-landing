export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-brand">
        <span className="footer-wordmark">Gallry</span>

        <p>Art without limits</p>
      </div>

      <nav className="footer-links" aria-label="Footer navigation">
        <a href="/about">ABOUT</a>
        <a href="/privacy">PRIVACY</a>
        <a href="/impressum">IMPRESSUM</a>
        <a href="mailto:hello@gallry.cc">CONTACT</a>
      </nav>

      <p className="footer-meta">© 2026 GALLRY</p>
    </footer>
  );
}
