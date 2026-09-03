export default function Why() {
  return (
    <section className="page-section why">
      <p className="section-label" style={{ color: "#02d693" }}>
        01 / THE PROBLEM
      </p>

      <h2 className="section-title">
        Social feeds are built for engagement, not discovery
      </h2>

      <p className="section-copy why-intro">
        Other platforms optimise for reactions and time spent scrolling. Artists
        end up feeding the content machine, while people looking for art have to
        dig through whatever keeps them engaged.
      </p>

      <div className="why-groups">
        <div className="why-group">
          <p className="why-group-label" style={{ color: "#02d693" }}>
            IF YOU MAKE ART, YOU HAVE TO:
          </p>

          <div className="why-points">
            <div>
              <span>01</span>
              <p>Turn the work into content</p>
            </div>

            <div>
              <span>02</span>
              <p>Keep posting to stay visible</p>
            </div>

            <div>
              <span>03</span>
              <p>Build numbers before getting seen</p>
            </div>
          </div>
        </div>

        <div className="why-group">
          <p className="why-group-label" style={{ color: "#02d693" }}>
            IF YOU'RE LOOKING FOR IT, YOU HAVE TO ENDURE:
          </p>

          <div className="why-points">
            <div>
              <span>01</span>
              <p>Ragebait</p>
            </div>

            <div>
              <span>02</span>
              <p>Content you actually don't give a fuck about</p>
            </div>

            <div>
              <span>03</span>
              <p>An Alghoritm that doesn't give a fuck about you either</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
