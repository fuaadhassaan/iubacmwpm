# TypeBattle WPM Contest — Setup Guide

## What you have
| File | Purpose |
|---|---|
| `wpm-contest.html` | The full website — students use this to participate |
| `apps-script.gs`  | Google Apps Script backend — saves results to your Sheet |

---

## Step 1 — Create your Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a **new blank spreadsheet**.
2. Name it anything, e.g. **"TypeBattle Results"**.
3. Leave it open — you'll come back to it in Step 2.

---

## Step 2 — Set up Google Apps Script

1. Inside your Google Sheet, click **Extensions → Apps Script**.
2. Delete all the default code in the editor.
3. Open `apps-script.gs` (the file you downloaded) and **paste all of it** into the editor.
4. Click **Save** (the floppy disk icon). Name the project **"TypeBattle API"**.
5. Run `setupSheet` once to initialise the headers:
   - In the toolbar, select the function `setupSheet` from the dropdown.
   - Click ▶ **Run**.
   - Accept the permissions popup when it appears.

---

## Step 3 — Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the ⚙ gear icon next to "Select type" → choose **Web app**.
3. Fill in:
   - **Description**: TypeBattle API
   - **Execute as**: Me *(your Google account)*
   - **Who has access**: **Anyone** ← this is important
4. Click **Deploy**.
5. **Copy the Web App URL** — it looks like:
   `https://script.google.com/macros/s/ABC123.../exec`

---

## Step 4 — Paste the URL into the website

1. Open `wpm-contest.html` in a text editor (Notepad, VS Code, etc.).
2. Find this line near the top of the `<script>` section:
   ```javascript
   SCRIPT_URL: 'YOUR_APPS_SCRIPT_URL_HERE',
   ```
3. Replace `YOUR_APPS_SCRIPT_URL_HERE` with the URL you copied in Step 3.
4. Optionally change the admin password on the next line:
   ```javascript
   ADMIN_PW: 'admin1234',
   ```
5. Save the file.

---

## Step 5 — Host the website

Choose any option:

### Option A — GitHub Pages (free, easiest)
1. Create a free account at [github.com](https://github.com).
2. Create a new repository.
3. Upload `wpm-contest.html` — rename it to `index.html`.
4. Go to **Settings → Pages → Source → main branch**.
5. Your site is live at `https://yourusername.github.io/your-repo/`.

### Option B — Netlify Drop (instant, no account needed)
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop `wpm-contest.html` (rename to `index.html` first).
3. Get a live URL instantly.

### Option C — Google Drive (simple, no hosting needed)
1. Upload `wpm-contest.html` to Google Drive.
2. Right-click → **Share → Anyone with the link can view**.
3. Share the link directly with students.

---

## How students participate

1. Open the website URL on any device (phone, laptop, PC).
2. Click **Join Contest**.
3. Enter **Name**, **Student ID**, and **Email**.
4. Click **Start Test** and type for 60 seconds.
5. Score is automatically saved to your Google Sheet.

---

## How you view rankings (Admin)

1. Open the website URL.
2. Click **⚙ Admin Panel** (top right).
3. Enter your admin password (`admin1234` by default).
4. See the full leaderboard with podium + ranked table.
5. Click **⟳ Refresh** to get the latest results.

> You can also open your Google Sheet directly to see the raw data.

---

## Important notes

- **Each student can submit multiple times** — the leaderboard always keeps their **best score**.
- Students can retake the test on different days; only their personal best counts.
- The admin panel works from **any device, any browser** — just open the URL and log in.
- If you update/redeploy the Apps Script, copy the new URL back into `wpm-contest.html`.

---

## Troubleshooting

| Problem | Fix |
|---|---|
| Scores not saving | Check the SCRIPT_URL is correct; redeploy Apps Script if needed |
| Leaderboard empty | Verify "Who has access" is set to **Anyone** in the deployment |
| Permission error | Re-run `setupSheet` in Apps Script and accept permissions |
| Site not loading | Make sure the HTML file is served over HTTPS (GitHub Pages / Netlify) |
