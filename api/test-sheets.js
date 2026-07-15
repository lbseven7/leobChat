export default async function handler(req, res) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  if (!spreadsheetId || !serviceAccountEmail || !privateKey) {
    return res.status(500).json({ error: "Missing Google env vars" });
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

    let pk = privateKey.trim();
    if (pk.startsWith('"') && pk.endsWith('"')) pk = pk.slice(1, -1);
    pk = pk.replace(/\\n/g, "\n");
    if (!pk.includes("\n")) {
      pk = pk
        .replace(/-----BEGIN PRIVATE KEY-----/g, "-----BEGIN PRIVATE KEY-----\n")
        .replace(/-----END PRIVATE KEY-----/g, "\n-----END PRIVATE KEY-----")
        .replace(/(.{64})/g, "$1\n")
        .replace(/\n\n/g, "\n");
    }

    const signingInput = `${base64url(header)}.${base64url(payload)}`;
    const sign = crypto.createSign("RSA-SHA256");
    sign.update(signingInput);
    sign.end();
    const signature = sign.sign(pk, "base64url");

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${signingInput}.${signature}`,
    });

    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) {
      return res.status(500).json({ error: "Token failed", details: tokenData });
    }

    const sheetsRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Logs!A2:F:append?valueInputOption=USER_ENTERED`,
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
              "TESTE PERGUNTA",
              "TESTE RESPOSTA",
              "NAO",
              "",
              "test",
            ],
          ],
        }),
      }
    );

    const sheetsData = await sheetsRes.json();
    return res.status(200).json({ sheetsData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
