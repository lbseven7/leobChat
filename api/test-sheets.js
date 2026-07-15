export default async function handler(req, res) {
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY;

  const info = {
    hasSheetId: !!spreadsheetId,
    sheetIdLength: spreadsheetId ? spreadsheetId.length : 0,
    hasEmail: !!serviceAccountEmail,
    emailEnd: serviceAccountEmail ? serviceAccountEmail.slice(-10) : null,
    hasPrivateKey: !!privateKey,
    privateKeyLength: privateKey ? privateKey.length : 0,
    privateKeyStarts: privateKey ? privateKey.slice(0, 30) : null,
    privateKeyEnds: privateKey ? privateKey.slice(-20) : null,
    hasNewlines: privateKey ? privateKey.includes("\n") : false,
    hasLiteralBackslashN: privateKey ? privateKey.includes("\\n") : false,
  };

  if (!privateKey) {
    return res.status(200).json({ ok: false, step: "env", info });
  }

  function normalizePrivateKey(key) {
    let k = key.trim();
    if (k.startsWith('"') && k.endsWith('"')) k = k.slice(1, -1);
    k = k.replace(/\\n/g, "\n");
    return k;
  }

  const normalized = normalizePrivateKey(privateKey);

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
    const signature = sign.sign(normalized, "base64url");

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
        info,
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
              "TESTE DEBUG",
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
        info,
      });
    }

    return res.status(200).json({ ok: true, info });
  } catch (error) {
    return res.status(200).json({ ok: false, error: error.message, info });
  }
}
