import { useState, type SyntheticEvent } from "react";

import { track } from "../lib/analytics";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    setErrorMessage("");
    setStatus("submitting");

    const params = new URLSearchParams(window.location.search);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          utm_source: params.get("utm_source"),
          utm_medium: params.get("utm_medium"),
          utm_campaign: params.get("utm_campaign"),
          referrer: document.referrer || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();

        if (response.status === 400 && data.error === "Invalid email") {
          setErrorMessage("Enter a valid email address");
        } else {
          setErrorMessage("Something went wrong. Try again.");
        }

        setStatus("error");
        return;
      }

      track("Signup Submitted");
      setStatus("success");
    } catch (error) {
      console.error(error);

      setErrorMessage("Something went wrong. Try again.");
      setStatus("error");
    }
  }

  return (
    <section id="join" className="page-section final-cta">
      <p className="section-label">PRIVATE BETA</p>

      <h2 className="section-title">Join the beta</h2>

      <p className="section-copy">
        For independent artists and people looking for independent work worth
        finding.
      </p>

      {status === "success" ? (
        <p className="signup-success">[ CHECK YOUR INBOX ]</p>
      ) : (
        <>
          <form className="signup-form" onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);

                if (status === "error") {
                  setStatus("idle");
                  setErrorMessage("");
                }
              }}
              placeholder="YOUR EMAIL"
              required
              disabled={status === "submitting"}
            />

            <button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "[ JOINING... ]" : "[ JOIN THE BETA ]"}
            </button>
          </form>

          {status === "error" && <p className="signup-error">{errorMessage}</p>}
        </>
      )}

      <p className="signup-note">No spam. Beta updates and invitations only.</p>
    </section>
  );
}
