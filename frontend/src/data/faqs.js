// FAQ page (/faq). Also read at build time: the page's FAQPage JSON-LD and
// tools/generate-llms.js. Owner-approved wording 2026-10-20 — every answer is
// a public commitment, so check with the owner before changing facts here.
export const faqSections = [
  {
    title: 'Buying and planning',
    faqs: [
      {
        q: 'What equipment do I need to set up a new physiotherapy department or clinic?',
        a: 'It depends on your patients and your space. Most new departments start with a combination ultrasound and electrotherapy unit, electric hi-lo treatment tables, and core exercise therapy equipment such as parallel bars, a staircase trainer and a quadriceps bench. Shockwave, laser or tecar therapy are often added next. We look at your case mix and budget, recommend a setup, and give you a written quotation with no obligation.',
      },
      {
        q: 'How much does it cost to equip a physiotherapy or rehabilitation centre?',
        a: "There's no fixed price, because every centre is different. The cost depends on the equipment you choose, your budget and the scale of what you're building, whether that's a few essential machines for a new clinic or a complete rehabilitation centre. We start by understanding your patients, your space and your plans, then recommend options that fit your budget, and give you a written quotation with no obligation.",
      },
      {
        q: 'What kinds of facilities do you supply?',
        a: 'Hospitals, rehabilitation centres and physiotherapy clinics. Our customers include AIG Hospitals, Continental Hospitals, the Mallikamba Institute in Hanumakonda and Sneha Sandhya Age Care Foundation, and we supplied the hydrotherapy equipment at Vitanova Rehab, Continental Hospitals, Hyderabad.',
      },
      {
        q: 'What equipment do you supply?',
        a: 'The full Monarc Distribution Network range across eight categories: therapeutic modalities (shockwave, laser, tecar and electrotherapy), exercise therapy, treatment tables including 3D decompression tables, hydrotherapy, interactive and VR rehabilitation, kinesiotherapy (patient lifters, gait trainers, CPM machines), hot and cold therapy, and robotic rehabilitation.',
        showCategories: true,
      },
      {
        q: 'Can I see the equipment working before I buy?',
        a: "Yes, and we encourage it. Some equipment we keep as demo units, which we can bring to your centre so your team can try it in your own space. For larger systems, we can take you to a centre where we've already installed the equipment, so you see it in daily clinical use and can talk to the people who use it. Tell us what you're considering and we'll arrange whichever suits you.",
      },
    ],
  },
  {
    title: 'Where we supply',
    faqs: [
      {
        q: 'Which areas do you supply?',
        a: 'All of Andhra Pradesh and Telangana, including Hyderabad, Secunderabad, Warangal, Karimnagar, Nizamabad, Khammam, Visakhapatnam, Vijayawada, Guntur, Tirupati, Nellore and Kakinada. Swecha Enterprises is the exclusive regional distributor of the Monarc Distribution Network portfolio for both states.',
      },
      {
        q: 'My centre is outside Andhra Pradesh and Telangana. Can you still help?',
        a: "Of course. Swecha Enterprises is the exclusive distributor for Andhra Pradesh and Telangana, and we're part of the Monarc Distribution Network, which covers all of India. Contact us and we'll connect you with Monarc and stay involved until your requirement is fulfilled, whether the equipment comes directly from Monarc, from the Monarc distributor in your region, or from us.",
      },
    ],
  },
  {
    title: 'After the sale',
    faqs: [
      {
        q: 'What warranty comes with the equipment?',
        a: 'Equipment comes with a 1-year manufacturer warranty, and an annual maintenance contract (AMC) is available after that.',
      },
      {
        q: 'What happens if a machine needs service?',
        a: "Call us. Our local representative will call you back the same day to understand the issue, and if it can be fixed over the phone, we'll fix it on that call. If it needs someone on site, our representative will visit your centre within 48 hours and make sure it's taken care of. You deal with one team throughout, backed by Monarc's national service network.",
      },
      {
        q: 'Do you train our physiotherapists to use the equipment?',
        a: 'Yes. Staff training is part of our installation and service support, so your team is confident using the equipment from day one.',
      },
    ],
  },
  {
    title: 'Practical',
    faqs: [
      {
        q: 'How long does delivery take?',
        a: 'Equipment sourced within India is usually delivered in 2 to 4 weeks. Imported equipment normally takes 6 to 8 weeks. We confirm the expected delivery time in your quotation, so you can plan your opening or upgrade with confidence.',
      },
      {
        q: 'Do you provide GST invoices?',
        a: 'Yes. Swecha Enterprises is GST-registered and issues tax invoices.',
      },
      {
        q: 'How do I get a quotation?',
        a: 'Call +91 98858 39555 (Monday to Saturday, 9am to 7pm), email contact@swechaenterprises.com, or use the quote form on this website. You can also download our 2026 catalogue.',
      },
    ],
  },
];

export const allFaqs = faqSections.flatMap((s) => s.faqs);
