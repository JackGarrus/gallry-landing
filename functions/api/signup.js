const EMAIL_REGEX =
  /^(?=.{1,254}$)(?=.{1,64}@)[A-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[A-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[A-Z0-9](?:[A-Z0-9-]{0,61}[A-Z0-9])?\.)+(?:[A-Z]{2,63}|XN--[A-Z0-9](?:[A-Z0-9-]{0,57}[A-Z0-9])?)$/i;

const TEN_MINUTES = 10 * 60 * 1000;
const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;

function json(data, status = 200) {
  return Response.json(data, { status });
}

function createToken() {
  const bytes = crypto.getRandomValues(new Uint8Array(32));

  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

function supabaseHeaders(env) {
  return {
    apikey: env.SUPABASE_SECRET_KEY,
    "Content-Type": "application/json",
  };
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;

  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request" }, 400);
  }

  const email = body.email?.trim().toLowerCase();

  if (!email || !EMAIL_REGEX.test(email)) {
    return json({ error: "Invalid email" }, 400);
  }

  // Look for an existing signup
  const lookupUrl = new URL(`${env.SUPABASE_URL}/rest/v1/beta_signups`);

  lookupUrl.searchParams.set("select", "id,confirmed_at,confirmation_sent_at");
  lookupUrl.searchParams.set("email", `eq.${email}`);
  lookupUrl.searchParams.set("limit", "1");

  const lookupResponse = await fetch(lookupUrl, {
    headers: supabaseHeaders(env),
  });

  if (!lookupResponse.ok) {
    console.error(await lookupResponse.text());
    return json({ error: "Signup failed" }, 500);
  }

  const rows = await lookupResponse.json();
  const existing = rows[0];

  // Don't reveal whether an address is already confirmed
  if (existing?.confirmed_at) {
    return json({ ok: true });
  }

  // Avoid repeatedly sending confirmation emails
  if (existing?.confirmation_sent_at) {
    const lastSent = new Date(existing.confirmation_sent_at).getTime();

    if (Date.now() - lastSent < TEN_MINUTES) {
      return json({ ok: true });
    }
  }

  const token = createToken();
  const tokenHash = await sha256(token);

  const expiresAt = new Date(Date.now() + TWENTY_FOUR_HOURS).toISOString();

  if (existing) {
    const updateUrl = new URL(`${env.SUPABASE_URL}/rest/v1/beta_signups`);

    updateUrl.searchParams.set("id", `eq.${existing.id}`);

    const updateResponse = await fetch(updateUrl, {
      method: "PATCH",
      headers: supabaseHeaders(env),
      body: JSON.stringify({
        confirmation_token_hash: tokenHash,
        confirmation_expires_at: expiresAt,
      }),
    });

    if (!updateResponse.ok) {
      console.error(await updateResponse.text());
      return json({ error: "Signup failed" }, 500);
    }
  } else {
    const insertResponse = await fetch(
      `${env.SUPABASE_URL}/rest/v1/beta_signups`,
      {
        method: "POST",
        headers: {
          ...supabaseHeaders(env),
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          email,
          confirmation_token_hash: tokenHash,
          confirmation_expires_at: expiresAt,

          utm_source: body.utm_source ?? null,
          utm_medium: body.utm_medium ?? null,
          utm_campaign: body.utm_campaign ?? null,
          referrer: body.referrer ?? null,
        }),
      },
    );

    if (!insertResponse.ok) {
      console.error(await insertResponse.text());
      return json({ error: "Signup failed" }, 500);
    }
  }

  // Build the confirmation URL safely
  const confirmationUrl = new URL("/api/confirm", env.APP_URL);

  confirmationUrl.searchParams.set("token", token);

  const confirmationUrlString = confirmationUrl.toString();

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      from: "Gallry <no-reply@gallry.cc>",
      to: [email],

      subject: "Confirm your Gallry beta signup",

      text:
        `Confirm your Gallry beta signup\n\n` +
        `Confirm this email address to join the Gallry private beta.\n\n` +
        `Confirm your email:\n${confirmationUrlString}\n\n` +
        `This link expires in 24 hours.\n\n` +
        `If this wasn't you, you can ignore this email.`,

      html: `
          <div style="
            margin:0;
            padding:40px 24px;
            background:#181c1e;
            color:#f3f5f4;
            font-family:Arial,sans-serif;
          ">
            <div style="
              max-width:560px;
              margin:0 auto;
              padding:32px 0;
              border-top:1px solid #373b39;
              border-bottom:1px solid #373b39;
            ">
              <p style="
                margin:0 0 40px;
                color:#02d693;
                font-family:monospace;
                font-size:13px;
                letter-spacing:.8px;
              ">
                GALLRY / PRIVATE BETA
              </p>

              <h1 style="
                margin:0 0 24px;
                color:#f3f5f4;
                font-size:30px;
                line-height:1.15;
              ">
                Confirm your email
              </h1>

              <p style="
                margin:0 0 32px;
                color:#b8beba;
                font-size:16px;
                line-height:1.6;
              ">
                Confirm this email address to join the Gallry private beta.
              </p>

              <p style="margin:0 0 32px;">
                <a
                  href="${confirmationUrlString}"
                  style="
                    display:inline-block;
                    padding:14px 18px;
                    border:1px solid #02d693;
                    color:#02d693;
                    font-family:monospace;
                    font-size:14px;
                    text-decoration:none;
                  "
                >
                  [ CONFIRM EMAIL ]
                </a>
              </p>

              <p style="
                margin:0;
                color:#858c88;
                font-size:13px;
                line-height:1.6;
              ">
                This link expires in 24 hours.<br />
                If this wasn't you, you can ignore this email.
              </p>
            </div>
          </div>
        `,
    }),
  });

  if (!emailResponse.ok) {
    console.error(await emailResponse.text());

    return json(
      {
        error: "Confirmation email could not be sent",
      },
      500,
    );
  }

  // Record when the confirmation email was sent
  const sentAtUrl = new URL(`${env.SUPABASE_URL}/rest/v1/beta_signups`);

  sentAtUrl.searchParams.set("email", `eq.${email}`);

  const sentAtResponse = await fetch(sentAtUrl, {
    method: "PATCH",
    headers: supabaseHeaders(env),
    body: JSON.stringify({
      confirmation_sent_at: new Date().toISOString(),
    }),
  });

  if (!sentAtResponse.ok) {
    console.error(await sentAtResponse.text());
  }

  return json({ ok: true });
}
