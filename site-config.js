// ============================================================
// TIRENIFY — SITE CONFIGURATION
// ------------------------------------------------------------
// Two values the owner sets. Everything else in the site works
// without them; when a value is left empty the related UI is
// hidden or degrades gracefully (never a broken form).
// ============================================================

window.TIRENIFY_CONFIG = {

  // Where the /contact and /products forms POST their submissions.
  // Leave empty until a form handler exists. While it is empty the
  // forms still validate, show success/error states and point people
  // to support@tirenify.app instead of silently failing.
  // Example: 'https://forms.tirenify.app/contact'
  FORM_ENDPOINT: '',

  // Optional attribution line for the breach data source, rendered on
  // /how-it-works under "Where the data comes from" ONLY when non-empty.
  // Left empty deliberately: no data provider is confirmed yet, and some
  // providers (e.g. breach data licensed CC BY 4.0) require visible
  // attribution with a link. The owner decides the wording and link.
  BREACH_DATA_SOURCE_NOTE: ''

};