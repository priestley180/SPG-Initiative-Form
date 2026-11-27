# Product development forms

Two independent static forms with BBC Help styling and locally hosted Reith fonts.

| Form | URL path | Files |
| --- | --- | --- |
| Initiative Opportunity Brief | `initiative/` | `initiative/index.html`, `app.js`, `style.css`, `print.css`, `fonts/` (all within `initiative/`) |
| Intake Form | `intake/` | `intake/index.html`, `app.js`, `style.css`, `print.css`, `fonts/` (all within `intake/`) |

Each folder is self-contained. Edit its files to change only that form. The root `index.html` and `intake.html` redirect old bookmarks to the new locations. Deploy the whole repository root to retain those redirects, or deploy either form folder independently. The initiative page's optional link to Intake assumes both folders are deployed together.

## Run

From the repository root: `python3 -m http.server 8000 --bind 0.0.0.0`. Open `/initiative/` or `/intake/`. No dependency installation or build is required.

## Drafts and exports

Answers save locally in separate browser storage keys. Download draft creates a JSON backup; Open draft restores it. Drafts for the other form are rejected. Existing Opportunity Brief drafts remain supported. Browser storage is not encrypted; use an appropriate device for internal information. Do not commit completed forms or backups.

Clear form asks for confirmation before removing answers and the saved browser draft. The forms retain separate drafts on the same hosting origin even after moving into folders.

Copy for Confluence copies formatted content to paste into a page in edit mode. HTTPS or localhost and clipboard permission are required. Download completed HTML is an alternative; open it and copy the rendered contents. Review formatting before publishing. This does not update Confluence automatically or submit to a forms plugin.

Save as PDF opens a Confluence-style read-only preview and the browser print dialog. Select Save as PDF, disable browser headers and footers, and choose landscape for wide tables. Allow pop-ups if needed. A Print / Save as PDF button lets you reopen the dialog. The styling approximates Confluence; themes may differ.

## Hosting

Both folders are static and have no server-side answer storage, analytics or external scripts. Each has its own copy of the Reith v2.300 web fonts supplied by the project owner, with Arial and Georgia fallbacks. Include font folders and print stylesheets when deploying. Configure private hosting access through the host if required.

For GitHub Pages, deploy the repository root from the desired branch. New paths are `/SPG-Initiative-Form/initiative/` and `/SPG-Initiative-Form/intake/`.

The Intake Form follows the supplied seven-question Confluence PDF. Its example-form links were omitted because their target URLs were not supplied.
