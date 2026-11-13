# ALRANQQY — alranqy.com

Static front-end website for **ALRANQQY**, glass & aluminium installation and maintenance,
Mai Tower 1502, Al Nahda 1, Dubai. Plain HTML/CSS/JS: no build step, no database, no server code.

## Files

```
index.html            the page
assets/css/style.css  all styles (colours are the variables at the top)
assets/js/main.js     animations, gallery, calculator, form; services / projects / FAQs are in the DATA block at the top
assets/img/           logo and photos
```

## Hosting

### Option A: cPanel / Hostinger / any shared hosting
1. Open **File Manager**, then `public_html` (the web root of alranqy.com).
2. Back up or delete the old site files.
3. Upload `alranqy-website.zip` and choose **Extract**, or upload `index.html` and the whole `assets` folder.
   `index.html` must sit directly inside `public_html`.
4. Open https://alranqy.com and hard-refresh (Ctrl+F5).

### Option B: from GitHub (free)
- **Netlify** or **Vercel**: "Import from GitHub", pick this repo, leave the build command empty,
  publish directory `/`. Then add `alranqy.com` under Domains and update the DNS records they show.
- **GitHub Pages**: Settings, then Pages, then deploy from branch, folder `/ (root)`, and add the custom domain.

## Contact form
The "Request Callback" form opens WhatsApp (052 119 5673) with the customer's details filled in,
so no database or backend is needed. If you later want enquiries saved or emailed, add one of:
a form service (Formspree, Web3Forms), a small PHP mail script on cPanel, or a backend with a MySQL database.
