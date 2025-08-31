import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, subject, message } = await request.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use SMTPS
      auth: {
        user: process.env.NEXT_PUBLIC_EMAIL_USER,
        pass: process.env.NEXT_PUBLIC_EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.NEXT_PUBLIC_EMAIL_USER,
      to: "pshah88669@gmail.com",
      subject: `Contact Form: ${subject}`,
      html: `
        <p>Name: ${firstName} ${lastName}</p>
        <p>Email: ${email}</p>
        <p>Subject: ${subject}</p>
        <p>Message: ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: "Email sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to send email." }, { status: 500 });
  }
}
