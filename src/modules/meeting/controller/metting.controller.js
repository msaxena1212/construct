const db = require("../../../models");
const nodemailer = require("nodemailer");

const Meeting = db.meeting;
const Project = db.project;
const User = db.user;
const Vendor = db.vendors;


const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === "true", // true for port 465
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASS || "",
  },
});


function parseAttendees(attendees = []) {
  return attendees.map(entry => {
    const match = entry.match(/^(.*?)\s*<(.+)>$/);
    if (match) return { name: match[1].trim(), email: match[2].trim() };
    return { name: entry, email: entry };
  });
}


async function sendMeetingEmails(meeting, projectName = null, vendorName = null, isUpdate = false) {
  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;
  if (!from || !meeting.attendees?.length) return;

  const parsed = parseAttendees(meeting.attendees);
  const validRecipients = parsed.filter(a => a.email && a.email.includes("@"));
  if (!validRecipients.length) return;

  const action = isUpdate ? "Updated" : "Scheduled";
  const dayName = new Date(meeting.date + "T00:00:00").toLocaleDateString("en-IN", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const meetLinkHtml = meeting.meet_link
    ? `<p style="margin:16px 0;">
         <a href="${meeting.meet_link}"
            style="display:inline-block;padding:12px 28px;background:#7c3aed;color:#fff;
                   text-decoration:none;border-radius:8px;font-weight:700;font-size:15px;">
           🎥 Join Meeting
         </a>
       </p>
       <p style="color:#888;font-size:12px;margin-top:4px;">
         Or copy link: <a href="${meeting.meet_link}" style="color:#7c3aed;">${meeting.meet_link}</a>
       </p>`
    : `<p style="color:#888;font-size:13px;margin:12px 0;">No meeting link provided. The organiser will share joining details separately.</p>`;

  const detailsTable = `
    <table style="width:100%;border-collapse:collapse;margin:16px 0;font-size:14px;">
      <tr style="background:#f5f3ff;">
        <td style="padding:10px 14px;font-weight:700;color:#5b21b6;width:36%;">📅 Date</td>
        <td style="padding:10px 14px;color:#1e293b;">${dayName}</td>
      </tr>
      <tr>
        <td style="padding:10px 14px;font-weight:700;color:#5b21b6;">⏰ Time</td>
        <td style="padding:10px 14px;color:#1e293b;">${meeting.time || "10:00"}</td>
      </tr>
      <tr style="background:#f5f3ff;">
        <td style="padding:10px 14px;font-weight:700;color:#5b21b6;">⏱ Duration</td>
        <td style="padding:10px 14px;color:#1e293b;">${meeting.duration || 30} minutes</td>
      </tr>
      ${projectName ? `
      <tr>
        <td style="padding:10px 14px;font-weight:700;color:#5b21b6;">📁 Project</td>
        <td style="padding:10px 14px;color:#1e293b;">${projectName}</td>
      </tr>` : ""}
      ${vendorName ? `
      <tr style="background:#f5f3ff;">
        <td style="padding:10px 14px;font-weight:700;color:#5b21b6;">🏢 Vendor</td>
        <td style="padding:10px 14px;color:#1e293b;">${vendorName}</td>
      </tr>` : ""}
      ${meeting.description ? `
      <tr>
        <td style="padding:10px 14px;font-weight:700;color:#5b21b6;">📝 Agenda</td>
        <td style="padding:10px 14px;color:#1e293b;">${meeting.description}</td>
      </tr>` : ""}
    </table>`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"/></head>
    <body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
      <div style="max-width:580px;margin:32px auto;background:#fff;border-radius:16px;
                  box-shadow:0 4px 24px rgba(0,0,0,0.08);overflow:hidden;">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#7c3aed,#4f46e5);padding:32px 36px;">
          <p style="margin:0 0 6px;color:#c4b5fd;font-size:12px;font-weight:700;
                    letter-spacing:2px;text-transform:uppercase;">Meeting ${action}</p>
          <h1 style="margin:0;color:#fff;font-size:24px;font-weight:800;line-height:1.2;">
            ${meeting.title}
          </h1>
        </div>

        <!-- Body -->
        <div style="padding:28px 36px;">
          <p style="color:#475569;font-size:15px;margin:0 0 20px;">
            You have been invited to a meeting. Please find the details below.
          </p>

          ${detailsTable}
          ${meetLinkHtml}

          <p style="color:#94a3b8;font-size:12px;margin-top:28px;border-top:1px solid #e2e8f0;padding-top:16px;">
            This invitation was sent automatically. Please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>`;

  const emailPromises = validRecipients.map(({ name, email }) =>
    transporter.sendMail({
      from: `"Meeting Scheduler" <${from}>`,
      to: name ? `${name} <${email}>` : email,
      subject: `${isUpdate ? "📝 Updated" : "📅 New"} Meeting: ${meeting.title} — ${dayName}`,
      html,
    }).catch(err => console.error(`Email failed for ${email}:`, err.message))
  );

  await Promise.allSettled(emailPromises);
}


const fullIncludes = [
  { model: Project, as: "project", attributes: ["id", "name", "type", "status"], required: false },
  { model: Vendor, as: "vendor", attributes: ["id", "name"], required: false },
  { model: User, as: "creator", attributes: ["id", "firstname", "lastname", "avatar"], required: false },
];


exports.createMeeting = async (req, res) => {
  try {
    const {
      title, description, date, time,
      duration, attendees, meet_link,
      project_id, vendor_id, vendor_ids,
    } = req.body;

    if (!title || !date) {
      return res.status(400).json({ success: false, message: "Title and date are required." });
    }

    const resolvedVendorId = vendor_id ||
      (Array.isArray(vendor_ids) && vendor_ids.length ? vendor_ids[0] : null);

    const meeting = await Meeting.create({
      title,
      description: description || null,
      date,
      time: time || "10:00",
      duration: duration || 30,
      attendees: Array.isArray(attendees) ? attendees : [],
      vendor_ids: Array.isArray(vendor_ids) ? vendor_ids : [],
      meet_link: meet_link || null,
      project_id: project_id || null,
      vendor_id: resolvedVendorId || null,
      company_id: req.user?.company_id || null,
      created_by: req.user?.id || null,
    });

    const full = await Meeting.findByPk(meeting.id, { include: fullIncludes });

    const projectName = full?.project?.name || null;
    const vendorName = full?.vendor?.name || null;
    sendMeetingEmails(full, projectName, vendorName, false)
      .catch(err => console.error("sendMeetingEmails error:", err));

    return res.status(201).json({
      success: true,
      message: "Meeting created successfully.",
      data: full,
    });
  } catch (error) {
    console.error("createMeeting error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


exports.getAllMeetings = async (req, res) => {
  try {
    const where = {};
    if (req.user?.company_id) where.company_id = req.user.company_id;
    if (req.query.project_id) where.project_id = req.query.project_id;
    if (req.query.vendor_id) where.vendor_id = req.query.vendor_id;
    if (req.query.date) where.date = req.query.date;

    const meetings = await Meeting.findAll({
      where,
      include: fullIncludes,
      order: [["date", "ASC"], ["time", "ASC"]],
    });

    return res.status(200).json({ success: true, data: meetings });
  } catch (error) {
    console.error("getAllMeetings error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


exports.getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id, { include: fullIncludes });
    if (!meeting) {
      return res.status(404).json({ success: false, message: "Meeting not found." });
    }
    return res.status(200).json({ success: true, data: meeting });
  } catch (error) {
    console.error("getMeetingById error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


exports.updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting) {
      return res.status(404).json({ success: false, message: "Meeting not found." });
    }

    const {
      title, description, date, time,
      duration, attendees, meet_link,
      project_id, vendor_id, vendor_ids,
    } = req.body;

    const incomingVendorIds = Array.isArray(vendor_ids) ? vendor_ids : meeting.vendor_ids || [];
    const resolvedVendorId = vendor_id ??
      (incomingVendorIds.length ? incomingVendorIds[0] : meeting.vendor_id);

    await meeting.update({
      title: title ?? meeting.title,
      description: description ?? meeting.description,
      date: date ?? meeting.date,
      time: time ?? meeting.time,
      duration: duration ?? meeting.duration,
      attendees: Array.isArray(attendees) ? attendees : meeting.attendees,
      vendor_ids: Array.isArray(vendor_ids) ? vendor_ids : meeting.vendor_ids,
      meet_link: meet_link ?? meeting.meet_link,
      project_id: project_id ?? meeting.project_id,
      vendor_id: resolvedVendorId,
    });

    const full = await Meeting.findByPk(meeting.id, { include: fullIncludes });

    const projectName = full?.project?.name || null;
    const vendorName = full?.vendor?.name || null;
    sendMeetingEmails(full, projectName, vendorName, true)
      .catch(err => console.error("sendMeetingEmails error (update):", err));

    return res.status(200).json({
      success: true,
      message: "Meeting updated successfully.",
      data: full,
    });
  } catch (error) {
    console.error("updateMeeting error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByPk(req.params.id);
    if (!meeting) {
      return res.status(404).json({ success: false, message: "Meeting not found." });
    }
    await meeting.destroy();
    return res.status(200).json({ success: true, message: "Meeting deleted successfully." });
  } catch (error) {
    console.error("deleteMeeting error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};