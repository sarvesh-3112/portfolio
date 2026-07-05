import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

/* ─── Input validation ──────────────────────────────────────────────────── */
function validate(name: string, email: string, message: string) {
  if (!name?.trim())                          return "Name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "A valid email address is required.";
  if (!message || message.trim().length < 10) return "Message must be at least 10 characters.";
  return null;
}

/* ─── Notification email (to Sri Sarvesh) ──────────────────────────────── */
function notificationHtml(name: string, email: string, message: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>New Portfolio Message</title>
</head>
<body style="margin:0;padding:0;background:#050816;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050816;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;border:1px solid rgba(108,99,255,0.3);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6C63FF,#00E5FF);padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;font-family:monospace;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.8);">Portfolio Contact</p>
              <h1 style="margin:8px 0 0;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">New Message</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background:#0d1224;padding:40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <!-- Sender info -->
                <tr>
                  <td style="padding-bottom:24px;">
                    <table cellpadding="0" cellspacing="0" style="background:rgba(108,99,255,0.08);border:1px solid rgba(108,99,255,0.2);border-radius:12px;width:100%;padding:20px;">
                      <tr>
                        <td style="padding-bottom:12px;">
                          <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#64748b;font-family:monospace;">From</span>
                          <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#f1f5f9;">${name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#64748b;font-family:monospace;">Email</span>
                          <p style="margin:4px 0 0;font-size:15px;color:#00E5FF;">${email}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Message -->
                <tr>
                  <td>
                    <span style="font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#64748b;font-family:monospace;">Message</span>
                    <div style="margin-top:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);border-radius:12px;padding:20px;">
                      <p style="margin:0;font-size:15px;line-height:1.7;color:#cbd5e1;white-space:pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#080c1a;padding:20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:12px;color:#475569;font-family:monospace;">Hit Reply to respond directly to ${name} · Sri Sarvesh R Portfolio</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ─── Auto-reply email (to visitor) ────────────────────────────────────── */
function autoReplyHtml(name: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Thanks for reaching out!</title>
</head>
<body style="margin:0;padding:0;background:#050816;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050816;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-radius:16px;overflow:hidden;border:1px solid rgba(108,99,255,0.3);">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6C63FF,#00E5FF);padding:32px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;font-family:monospace;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.8);">Message Received</p>
              <h1 style="margin:8px 0 0;font-size:28px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">Thanks for reaching out!</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background:#0d1224;padding:40px;">
              <p style="margin:0 0 20px;font-size:16px;color:#cbd5e1;line-height:1.7;">Hi <strong style="color:#f1f5f9;">${name}</strong>,</p>
              <p style="margin:0 0 20px;font-size:15px;color:#94a3b8;line-height:1.8;">
                Thank you for reaching out through my portfolio. I've received your message and will get back to you within <strong style="color:#f1f5f9;">24–48 hours</strong>.
              </p>
              <p style="margin:0 0 32px;font-size:15px;color:#94a3b8;line-height:1.8;">
                In the meantime, feel free to explore my work or connect with me on socials below.
              </p>
              <!-- Divider -->
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(108,99,255,0.4),transparent);margin-bottom:32px;"></div>
              <!-- Signature -->
              <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:#f1f5f9;">Sri Sarvesh R</p>
              <p style="margin:0 0 24px;font-size:13px;color:#6C63FF;font-family:monospace;letter-spacing:0.05em;">Software Engineer &amp; Full Stack Developer</p>
              <!-- Social links -->
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a href="https://github.com/srisarvesh" style="display:inline-block;padding:8px 16px;background:rgba(108,99,255,0.15);border:1px solid rgba(108,99,255,0.3);border-radius:8px;color:#a78bfa;text-decoration:none;font-size:13px;font-weight:600;">GitHub</a>
                  </td>
                  <td style="padding-right:12px;">
                    <a href="https://linkedin.com/in/srisarvesh" style="display:inline-block;padding:8px 16px;background:rgba(0,229,255,0.1);border:1px solid rgba(0,229,255,0.25);border-radius:8px;color:#67e8f9;text-decoration:none;font-size:13px;font-weight:600;">LinkedIn</a>
                  </td>
                  <td>
                    <a href="https://leetcode.com/srisarvesh" style="display:inline-block;padding:8px 16px;background:rgba(245,158,11,0.1);border:1px solid rgba(245,158,11,0.25);border-radius:8px;color:#fcd34d;text-decoration:none;font-size:13px;font-weight:600;">LeetCode</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="background:#080c1a;padding:20px 40px;text-align:center;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:12px;color:#475569;font-family:monospace;">This is an automated reply · Please don't reply to this email</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ─── POST handler ──────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body as { name: string; email: string; message: string };

    // Server-side validation
    const validationError = validate(name, email, message);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    // Step 1 — Required: send notification to owner
    const notif = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "srisarvesh2006@gmail.com",
      replyTo: email,
      subject: `New message from ${name} via portfolio`,
      html: notificationHtml(name, email, message),
    });

    if (notif.error) {
      console.error("[contact/route] Notification email failed:", notif.error);
      return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }

    // Step 2 — Best-effort: auto-reply to visitor.
    // Without a verified Resend domain, this only works when `to` is the
    // account-owner email. Failures are logged but do NOT block success.
    resend.emails
      .send({
        from: "Sri Sarvesh R <onboarding@resend.dev>",
        to: email,
        subject: `Thanks for reaching out, ${name}!`,
        html: autoReplyHtml(name),
      })
      .then(({ error }) => {
        if (error) {
          console.warn("[contact/route] Auto-reply skipped (add verified domain at resend.com/domains):", error.message);
        }
      })
      .catch((err) => console.warn("[contact/route] Auto-reply network error:", err));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[contact/route] Unexpected error:", err);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
