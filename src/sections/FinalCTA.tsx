import { useState, type SyntheticEvent } from "react";
import { supabase } from "../lib/supabase";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(
    event: SyntheticEvent<HTMLFormElement, SubmitEvent>,
  ) {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) return;

    setStatus("submitting");

    const params = new URLSearchParams(window.location.search);

    const { error } = await supabase.from("beta_signups").insert({
      email: normalizedEmail,
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      referrer: document.referrer || null,
    });

    if (error) {
      // unique violation = email already registered
      if (error.code === "23505") {
        setStatus("success");
        return;
      }

      console.error(error);
      setStatus("error");
      return;
    }

    setStatus("success");
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
        <p className="signup-success">[ YOU'RE ON THE LIST ]</p>
      ) : (
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="YOUR EMAIL"
            required
            disabled={status === "submitting"}
          />

          <button type="submit" disabled={status === "submitting"}>
            {status === "submitting" ? "[ JOINING... ]" : "[ JOIN THE BETA ]"}
          </button>
        </form>
      )}

      {status === "error" && (
        <p className="signup-error">Something went wrong. Try again.</p>
      )}

      <p className="signup-note">No spam. Beta updates and invitations only.</p>
    </section>
  );
}
