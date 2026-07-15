export default async function handler(req, res) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  const missing = [];
  if (!spreadsheetId) missing.push("GOOGLE_SHEET_ID");
  if (!serviceAccountEmail) missing.push("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  if (!privateKey) missing.push("GOOGLE_PRIVATE_KEY");

  if (missing.length > 0) {
    return res.status(200).json({ ok: false, error: `Missing: ${missing.join(", ")}` });
  }

  function normalizePrivateKey(key) {
    let k = key.trim();
    if (k.startsWith('"') && k.endsWith('"')) k = k.slice(1, -1);
    k = k.replace(/\\n/g, "\n");
    return k;
  }

  try {
    const crypto = await import("crypto");
    const now = Math.floor(Date.now() / 1000);

    const header = { alg: "RS256", typ: "JWT" };
    const payload = {
      iss: serviceAccountEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    };

    const base64url = (obj) =>
      Buffer.from(JSON.stringify(obj)).toString("base64url");

    const signingInput = `${base64url(header)}.${base64url(payload)}`;
    const sign = crypto.createSign("RSA-SHA256");
    sign.update(signingInput);
    sign.end();
    const signature = sign.sign(normalizePrivateKey(privateKey), "base64url");

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${signingInput}.${signature}`,
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return res.status(200).json({
        ok: false,
        step: "token",
        error: tokenData.error,
        details: tokenData.error_description,
      });
    }

    const sheetsRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Logs!A:F:append?valueInputOption=RAW`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [
            [
              new Date().toISOString(),
              "TESTE CONEXAO",
              "conexao ok",
              "NAO",
              "",
              "test",
            ],
          ],
        }),
      }
    );

    const sheetsData = await sheetsRes.json();

    if (sheetsData.error) {
      return res.status(200).json({
        ok: false,
        step: "sheets",
        error: sheetsData.error.message,
      });
    }

    return res.status(200).json({ ok: true, result: sheetsData });
  } catch (error) {
    return res.status(200).json({ ok: false, error: error.message });
  }
}
