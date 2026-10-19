# Optional features

Every feature is its own file in `js/features/`. `features.js` loads them; edit its FEATURES list to switch any feature on or off.

| File | What it adds | Where you see it |
|---|---|---|
| core.js | Helpers and the "More" menu (keep on) | Navigation bar |
| dark-mode.js | Dark / light toggle | Header button |
| favourites.js | Star on cards, Favourites page | Cards, More > Favourites |
| recycle-bin.js | 30-day restore for deleted uploads | More > Recycle bin |
| view-toggle.js | Grid / list switch | Issued, Uploaded, Search |
| tags-notes.js | Tags and private notes | Document details, cards |
| drag-drop-upload.js | Drag-and-drop box, progress, preview | Uploaded page |
| expiry-reminders.js | Expiry dates, badges, notifications | Document details, cards |
| folders.js | Your own folders | More > Folders |
| bulk-actions.js | Tick cards, act on many | Issued, Uploaded, Search |
| qr-code.js | QR code linking to Check document | Document details |
| esign.js | Draw a demo signature, download PNG | More > eSign (demo) |
| consent-log.js | Share-link views, withdraw consent | More > Consent log |
| admin-chart.js | Activity line chart | Admin dashboard |
| tour.js | First-visit tour | Dashboard, More > Take the tour |
| polish.js | Skeleton loaders, empty icon, print styles, Print button | Lists, details |
| accessibility.js | Text size and high contrast | Bottom-left button |
| pwa.js + manifest.webmanifest + sw.js + icon.svg | Installable app | Browser install icon |
| demo-guide.js | Demo guide + architecture diagram | More > Demo guide |

Not included: language switcher (needs reviewed translations).

## Added in the second feature batch

| File | What it adds | Where you see it |
|---|---|---|
| language-switcher.js | English / Hindi / Malayalam for menus and main headings (have the words reviewed) | Language box in header |
| storage-meter.js | Storage used bar | Profile |
| idle-logout.js | Inactivity warning and auto sign-out | Any page |
| legal-pages.js | Terms, Privacy, 404 page, footer links | Footer |
| cookie-banner.js | Dismissible demo notice | Bottom of page |
| feedback.js | Star rating and comment form, admin list | Footer, admin "!" menu |
| profile-photo.js | Cropped avatar in header | Profile |
| help-search.js | FAQ search box | Help |
| issuer-directory.js | Browse fictional issuers | "!" menu |
| help-assistant.js | Rule-based help bot | Bottom-right button |
| doc-history.js | Replace a file, keep older versions | Uploaded document details |
| signin-history.js | Sign-in history table (made-up devices) | Profile |
| nominees.js | Nominee list with allowed documents | "!" menu |
| export-data.js | CSV and JSON export | Profile |
| undo-toast.js | Undo bar after deleting an upload | Uploaded page |
| announcements.js | Admin announcements sent as notifications | Admin "!" menu |
| review-queue.js | Approve or reject flagged documents | Admin "!" menu |
| admin-charts-2.js | Pie and bar charts | Admin dashboard |
| admin-import.js | CSV user import with preview | Admin "!" menu |
| admin-settings.js | Upload size and file type rules | Admin "!" menu |

Admin pages now show a "!" menu too, listing the admin-only pages.

| messages.js | "Your sent messages" list (with admin replies) under the Help form, plus an admin inbox | Help page, admin "!" menu > Messages |

| dashboard-layout.js | Left sidebar menu, header with Accessibility / Language / Profile on the right, new dashboard (welcome, issued row, Digivault Utilities, documents you might need). Keep last in features.js | User pages |
