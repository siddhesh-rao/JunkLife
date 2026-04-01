import { Contact } from "../models/Contact.js";
import { sendEmail } from "../services/emailService.js";

export const createContact = async (req, res) => {
  const query = await Contact.create(req.body);

  await sendEmail({
    to: req.body.email,
    subject: "We received your JunkLife message",
    html: "<p>Thanks for contacting JunkLife. Our team will get back to you shortly.</p>"
  });

  res.status(201).json({ success: true, data: query });
};

export const getContacts = async (_req, res) => {
  const queries = await Contact.find().sort({ createdAt: -1 });
  res.json({ success: true, data: queries });
};
