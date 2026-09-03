export default function WhatYouCanDo() {
  return (
    <section className="page-section capabilities">
      <p className="section-label" style={{ color: "#02d693" }}>
        02 / WHAT YOU CAN DO ON GALLRY
      </p>

      <div className="capabilities-grid">
        <div className="capability">
          <p className="capability-index">01 / SHOW</p>

          <h2>Show the work properly</h2>

          <p className="capability-copy">
            Images, audio and video in one focused portfolio. No digging through
            months of posts to understand what an artist actually does.
          </p>

          <p className="capability-meta">PHOTO · AUDIO · VIDEO · EVENTS</p>
        </div>

        <div className="capability">
          <p className="capability-index">02 / DISCOVER</p>

          <h2>Discover work worth finding</h2>

          <p className="capability-copy">
            Choose what you want to discover. Gallry surfaces relevant
            independent artists locally or worldwide.
          </p>

          <p className="capability-meta">RELEVANCE FIRST · NOT POPULARITY</p>
        </div>

        <div className="capability">
          <p className="capability-index">03 / CONNECT</p>

          <h2>Find people worth making things with</h2>

          <p className="capability-copy">
            See their work first. Reach out when there's a real reason to
            connect.
          </p>

          <p className="capability-meta">LOCAL · REMOTE · COLLABORATION</p>
        </div>
      </div>

      <div className="capabilities-footer" style={{ color: "#02d693" }}>
        <span>PORTFOLIOS</span>•<span>DISCOVERY</span>•<span>FAVOURITES</span>•
        <span>UPCOMING EVENTS</span>•<span>COLLABORATION</span>
      </div>
    </section>
  );
}
