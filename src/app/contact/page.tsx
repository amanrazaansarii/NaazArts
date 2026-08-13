import { ContactForm } from "@/components/ContactForm";

export const metadata = {
  title: "Contact — Naaz Arts",
  description:
    "Get in touch for custom orders, wholesale inquiries, or workshop questions.",
};

export default function ContactPage() {
  return (
    <>
      <header className="page-header">
        <span className="eyebrow">Contact</span>
        <h1 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", marginTop: "6px" }}>
          Let&apos;s talk
        </h1>
        <p className="lede" style={{ margin: "10px auto 0" }}>
          Custom orders, wholesale/bulk jars, workshop questions — reach out
          below.
        </p>
      </header>

      <div className="contact-container">
        <ContactForm />
      </div>
    </>
  );
}
