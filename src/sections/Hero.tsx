import neraValeScreenshot from "../assets/nera-vale.png";

export default function Hero() {
  return (
    <section className="page-section hero">
      <div className="hero-copy">
        <p className="section-label" style={{ color: "#02d693" }}>
          00 / WHAT IS GALLRY
        </p>

        <h1 className="hero-title">You're an artist, not a content creator</h1>

        <p className="section-copy">
          Gallry gives independent artists a place to show the work properly —
          and people a place to discover it without fighting through an
          engagement-first feed.
        </p>

        <div className="hero-audiences">
          <div className="hero-audience">
            <p className="hero-audience-label">MAKE</p>

            <h2>The work comes first</h2>

            <p>
              You DON'T have to perform for the feed or post the same thing over
              and over, hoping reel #11,000 finally reaches someone who actually
              gives a shit about your work.
            </p>
          </div>

          <div className="hero-audience">
            <p className="hero-audience-label">DISCOVER</p>

            <h2>Find art without the noise</h2>

            <p>
              Discover artists within your interests without being interrupted
              by reels that you don't care about.
            </p>
          </div>
        </div>

        <div className="hero-join">
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="hero-join-label" style={{ color: "#02d693" }}>
              PRIVATE BETA{" "}
            </p>
            <p className="hero-note"> · Free · Invitations in waves</p>
          </div>

          <a className="primary-cta" href="#join" style={{ fontSize: 18 }}>
            Join the beta
          </a>
        </div>
      </div>

      <div className="hero-product">
        <img
          src={neraValeScreenshot}
          alt="Gallry artist profile preview for Nera Vale"
        />
      </div>
    </section>
  );
}
