import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description: "Send a message to Skincare Picks Guide for editorial corrections, partnership questions, and product review inquiries.",
  pathname: "/contact"
});

export default function ContactPage() {
  return (
    <section className="container-luxe py-16 md:py-24">
      <p className="kicker">Contact</p>
      <h1 className="mt-4 font-display text-[2.35rem] leading-[0.96] sm:text-5xl md:text-6xl">Send A Message</h1>
      <p className="mt-5 max-w-3xl text-[14px] leading-7 text-secondary/72 md:mt-6 md:text-base md:leading-8">
        Use the contact form below for editorial corrections, brand inquiries, product suggestions, or partnership questions. Keep the message clear so it can be routed faster.
      </p>

      <div className="mt-10 max-w-4xl border border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.05)] sm:p-8 md:p-10">
        <form action="mailto:hello@skincarepicksguide.com" method="post" encType="text/plain" className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-[0.18em] text-secondary/62">Name</span>
              <input
                type="text"
                name="name"
                className="min-h-[50px] border border-black/12 bg-[#fffdf9] px-4 text-[15px] text-black outline-none transition focus:border-black/30"
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2">
              <span className="text-xs uppercase tracking-[0.18em] text-secondary/62">Email</span>
              <input
                type="email"
                name="email"
                className="min-h-[50px] border border-black/12 bg-[#fffdf9] px-4 text-[15px] text-black outline-none transition focus:border-black/30"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.18em] text-secondary/62">Subject</span>
            <input
              type="text"
              name="subject"
              className="min-h-[50px] border border-black/12 bg-[#fffdf9] px-4 text-[15px] text-black outline-none transition focus:border-black/30"
              placeholder="What is this about?"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-xs uppercase tracking-[0.18em] text-secondary/62">Message</span>
            <textarea
              name="message"
              rows={8}
              className="border border-black/12 bg-[#fffdf9] px-4 py-3 text-[15px] leading-7 text-black outline-none transition focus:border-black/30"
              placeholder="Write your message here"
            />
          </label>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-secondary/62">
              This form opens your mail app with the message draft so you can review it before sending.
            </p>
            <button type="submit" className="btn-commerce-primary min-h-[52px] px-6 text-[11px] tracking-[0.18em]">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
