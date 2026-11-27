# SPG Initiative workspace

A static HTML version of the initiative template, covering the overview and all four lifecycle stages. The personal comment from the source PDF is excluded.

## Run locally

From this directory, run `python3 -m http.server 8000 --bind 0.0.0.0` and open the site in a browser. No package installation or backend is required.

## Complete and export

Answers save automatically in local browser storage. Use **Download draft** to keep a JSON backup and **Open draft** to restore it, including on another device. Browser storage can be cleared and is not encrypted; use an appropriate device for internal information.

Use **Copy for Confluence** and paste into a Confluence page in edit mode. Rich clipboard copying needs HTTPS or localhost and browser permission. Alternatively, download the completed HTML, open it, and copy its rendered contents into Confluence. Review formatting before publishing; compatibility with the organisation's editor still needs to be verified. This exports page content and does not submit to a Confluence forms plugin or update Confluence automatically.

## Host

Publish `index.html`, `style.css`, `app.js`, and the `fonts/` directory together on a static host, such as GitHub Pages. For GitHub Pages, deploy the repository root from the desired branch through Settings → Pages where the repository plan and permissions support it. No hosting deployment has been made by this project. Use HTTPS for formatted clipboard copying. The site has no analytics, external scripts, or server-side answer storage. BBC Reith v2.300 web fonts are served locally from `fonts/`, using the archive supplied by the project owner. Arial and Georgia provide fallbacks. Include the `fonts/` directory when deploying. The visual styling follows the supplied BBC Help screenshots: white backgrounds, bold sans headings, thin grey borders, black actions, and right-hand navigation on desktop. The local font files have been verified in the development browser.

Do not commit completed forms or draft backups to the repository. Hosting access control must be configured through the chosen host if the form itself must remain private.

## Save a PDF

Choose **Save as PDF** to open a read-only, Confluence-style preview and the browser print dialog. Select **Save as PDF** as the destination. Disable browser headers/footers for a clean document; choose landscape for tables with many entries. The preview has a Print / Save as PDF button if you cancel or want to print again. Allow pop-ups for this site if the preview is blocked. Answers stay on your device. The PDF approximates Confluence page styling; your Confluence theme may differ.

Include `print.css` when deploying the site.
