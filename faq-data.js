// ============================================================
// TIRENIFY — FAQ CONTENT
// ------------------------------------------------------------
// Single source of truth for the FAQ. The homepage shows the
// first SHORT_COUNT items, /faq shows all of them.
// To add a question later, add an object here — no markup edits.
//   { q: 'Question?', a: 'Answer.', link: { href: 'products.html', text: 'See products' } }
// ============================================================

window.TIRENIFY_FAQ = {

  // Items flagged `short: true` are the four shown on the homepage.
  items: [
    {
      q: 'Is it really free?',
      short: true,
      a: 'Breach Guard is free, and there\u2019s no account. If that changes later, paid features would be new tools, not a paywall in front of the check.'
    },
    {
      q: 'Do I need an account?',
      short: true,
      a: 'No. You enter an email, you get a result.'
    },
    {
      q: 'Is it safe to enter my email here?',
      short: true,
      a: 'Yes. The email you check isn\u2019t stored. The only exception is if you choose to subscribe to our newsletter, in which case we keep that address so we can send it to you.'
    },
    {
      q: 'What if my email shows up as exposed?',
      a: 'Work through the steps in your result. Change the password on that service, change it anywhere you reused it, turn on two-factor authentication.'
    },
    {
      q: 'Does \u201Csafe\u201D mean I\u2019m fully secure?',
      short: true,
      a: 'No. It means no known breach contains your address. Breaches get disclosed late, and some never are.'
    },
    {
      q: 'Can you remove my data from a breach?',
      a: 'No. Nobody can undo a leak. What we can do is show you what\u2019s exposed and what to do about it.'
    },
    {
      q: 'Are more products coming?',
      a: 'Yes. Breach Guard is the first. Tell us what you want protected next and we\u2019ll let you know when it\u2019s here.',
      link: { href: 'products.html', text: 'See what we\u2019re building next' }
    },
    {
      q: 'Do you do anything for businesses?',
      a: 'Not yet. That\u2019s further out on the roadmap, and it\u2019ll start with teams that hold customer data.'
    }

    // Deliberately no "Where does the breach data come from?" item yet.
    // The owner adds it here once a data source can be named. On
    // /how-it-works the same wording belongs in BREACH_DATA_SOURCE_NOTE
    // (site-config.js).
  ]

};