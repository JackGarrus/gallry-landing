function supabaseHeaders(env) {
  return {
    apikey: env.SUPABASE_SECRET_KEY,
    "Content-Type": "application/json",
  };
}

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
}

function redirect(env, status) {
  return Response.redirect(`${env.APP_URL}/?confirmation=${status}#join`, 302);
}

export async function onRequestGet(context) {
  const { request, env } = context;

  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token || !/^[a-f0-9]{64}$/i.test(token)) {
    return redirect(env, "invalid");
  }

  const tokenHash = await sha256(token);

  const lookupUrl = new URL(`${env.SUPABASE_URL}/rest/v1/beta_signups`);

  lookupUrl.searchParams.set(
    "select",
    "id,confirmed_at,confirmation_expires_at",
  );
  lookupUrl.searchParams.set("confirmation_token_hash", `eq.${tokenHash}`);
  lookupUrl.searchParams.set("limit", "1");

  const response = await fetch(lookupUrl, {
    headers: supabaseHeaders(env),
  });

  if (!response.ok) {
    console.error(await response.text());
    return redirect(env, "invalid");
  }

  const rows = await response.json();
  const signup = rows[0];

  if (!signup) {
    return redirect(env, "invalid");
  }

  if (signup.confirmed_at) {
    return redirect(env, "confirmed");
  }

  if (
    !signup.confirmation_expires_at ||
    new Date(signup.confirmation_expires_at).getTime() < Date.now()
  ) {
    return redirect(env, "expired");
  }

  const updateUrl = new URL(`${env.SUPABASE_URL}/rest/v1/beta_signups`);

  updateUrl.searchParams.set("id", `eq.${signup.id}`);

  const updateResponse = await fetch(updateUrl, {
    method: "PATCH",
    headers: supabaseHeaders(env),
    body: JSON.stringify({
      confirmed_at: new Date().toISOString(),
      confirmation_token_hash: null,
      confirmation_expires_at: null,
    }),
  });

  if (!updateResponse.ok) {
    console.error(await updateResponse.text());
    return redirect(env, "invalid");
  }

  return redirect(env, "confirmed");
}
