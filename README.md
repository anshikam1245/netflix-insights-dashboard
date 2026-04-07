# Netflix Data Visualization Dashboard

A Flask-based multi-page web dashboard that explores Netflix's global content catalog through exploratory data analysis, static charts, and fully interactive Plotly visualizations — wrapped in a custom Netflix-inspired UI.

---

## Overview

This project analyses 8,800+ Netflix titles to surface patterns in content type, genre distribution, country production, ratings, duration trends, and catalog growth over time. The dashboard is split across four pages — a cinematic landing page and three dedicated insight sections — each combining static EDA charts with embedded interactive Plotly charts.

---

## Features

### Cinematic Landing Page
A full-screen hero section with a Netflix-styled layout, animated stat cards, and a key findings section. Clicking **"Explore Dashboard"** triggers the iconic Netflix startup sound and a smooth page transition before navigating to the analysis view.

### Multi-Page Dashboard
Four Flask routes serve separate pages — Home, Full Analysis, Genre Insights, and Country Insights — each rendered via Jinja2 templates that extend a shared base layout.

### Static EDA Charts (PNG)
Ten charts generated from the Jupyter Notebook EDA and served as static assets:
- Movies vs TV Shows breakdown
- Ratings distribution
- Content added per year
- Monthly addition trend
- Yearly type breakdown (stacked)
- Year × Month heatmap
- Duration analysis (movies and TV)
- TV Show season buckets
- Content age and decade profile
- Type × Rating heatmap

### Interactive Plotly Charts (HTML)
Three fully interactive charts embedded directly in the browser:
- Time-series of content additions (Full Analysis page)
- Genre distribution treemap (Genres page)
- Country → Genre sunburst chart (Countries page)

### Chart Lightbox
Clicking any static chart image opens a full-screen lightbox overlay with zoom, keyboard (`Escape`) dismiss, and a close button — without any external library.

### Scroll-Triggered Animations
Cards and sections animate into view using the `IntersectionObserver` API, with a subtle stagger delay per batch.

### Responsive Navigation
Fixed navbar transitions from transparent to a blurred solid background on scroll. A hamburger menu with animated toggle handles mobile viewports.

### Netflix-Inspired Design System
Custom CSS built on a dark design system using CSS custom properties — `#141414` background, `#E50914` red accent, Bebas Neue display font, DM Sans body font, glassmorphism card surfaces, and red glow effects.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Python 3, Flask 3.x |
| Templating | Jinja2 |
| EDA & Charts | Jupyter Notebook, Pandas, Matplotlib, Seaborn, Plotly |
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Data | `netflix_titles.csv` (~8,800 titles) |
| Fonts | Google Fonts (Bebas Neue, DM Sans) |
| Assets | Custom Netflix favicon, logo PNG, Netflix sound MP3 |

---

## Project Structure

```
Netflix_Dashboard/
├── app.py                        # Flask application & route definitions
├── requirements.txt              # Python dependencies
├── data/
│   └── netflix_titles.csv        # Source dataset
├── notebooks/
│   └── Netflix_EDA_Analysis.ipynb  # Full exploratory data analysis
├── static/
│   ├── assets/
│   │   ├── netflix_icon.ico
│   │   ├── netflix_logo.png
│   │   └── netflix_sound.mp3     # CTA button sound effect
│   ├── charts/                   # Interactive Plotly HTML charts
│   │   ├── sunburst_country_genre.html
│   │   ├── timeseries_additions.html
│   │   └── treemap_genre.html
│   ├── charts_png/               # Static EDA chart exports
│   │   ├── movies_vs_tv.png
│   │   ├── ratings_distribution.png
│   │   ├── content_added_per_year.png
│   │   ├── monthly_addition_trend.png
│   │   ├── stacked_year_type.png
│   │   ├── heatmap_year_month.png
│   │   ├── duration_analysis.png
│   │   ├── tv_season_buckets.png
│   │   ├── content_age_decade.png
│   │   └── type_rating_heatmap.png
│   ├── css/
│   │   └── styles.css            # Full design system stylesheet
│   └── js/
│       └── main.js               # Interactions, animations, lightbox
└── templates/
    ├── base.html                 # Shared navbar, footer, layout
    ├── home.html                 # Landing / hero page
    ├── analysis.html             # Full EDA dashboard
    ├── genres.html               # Genre insights page
    └── countries.html            # Country insights page
```

---

## Screenshots

### Home — Hero Section
![Hero Section](<screenshot_hero.png>)

### Full Analysis Page
![Analysis Dashboard](<screenshot_analysis.png>)

### Genre Insights — Treemap
![Genre Treemap](<screenshot_genres.png>)

### Country Insights — Sunburst
![Country Sunburst](<screenshot_countries.png>)

---

## How to Run

**Prerequisites:** Python 3.9+ installed.

**Step 1 — Clone or unzip the project**
```bash
cd Netflix_Dashboard
```

**Step 2 — Create a virtual environment (recommended)**
```bash
python3 -m venv venv
source venv/bin/activate       # macOS / Linux
venv\Scripts\activate          # Windows
```

**Step 3 — Install dependencies**
```bash
pip install -r requirements.txt
```

**Step 4 — Run the Flask development server**
```bash
python app.py
```

**Step 5 — Open in browser**
```
http://127.0.0.1:5000
```

No database, no environment variables, no build step required.

---

## Key Highlights

- **Sound + cinematic transition on CTA** — The "Explore Dashboard" button plays the Netflix startup audio and triggers a full-screen fade transition before routing to the analysis page, adding a theatrical first impression.
- **Hybrid chart approach** — Static Matplotlib/Seaborn PNGs for clean summary views; embedded Plotly HTML files for fully interactive drill-down charts, all served from a single Flask app with zero JavaScript charting libraries.
- **No external JS dependencies** — The lightbox, scroll animations, hamburger menu, and sound interaction are written in plain Vanilla JS using browser-native APIs.
- **EDA-first workflow** — All insights originate from a documented Jupyter Notebook, keeping the analysis reproducible and independent of the web layer.
- **Self-contained deployment** — A single `pip install` and `python app.py` is all that's needed; no Node, no webpack, no database.

---

## Key Findings

- **TV-MA is the dominant rating** across both Movies and TV Shows, confirming Netflix's primary focus on mature adult audiences.
- **2019 was peak content year** — additions dropped sharply after as COVID disrupted global production.
- **International Movies is the #1 genre tag**, reflecting Netflix's deliberate investment in non-English content.
- **India ranks 2nd globally** in content production, second only to the United States.
- **60%+ of TV Shows have just 1 season** — Netflix strongly favours limited series over multi-season franchises.
- **Most movies fall in the 80–120 minute range**, optimised for a single uninterrupted streaming session.

---

## Future Improvements

- **Search and filter UI** — Allow users to filter charts by content type, year range, or country directly in the browser.
- **Director and cast analytics** — Surface which directors and actors appear most frequently across the catalog.
- **Word cloud of descriptions** — Visualise recurring themes and keywords from title descriptions.
- **Dark/light mode toggle** — Extend the design system to support a light variant.
- **Exportable chart images** — Add a download button to each chart card for PNG export.

---

## Author

**Anshika Mittal**  
USN: 1AUA23BIT005  
Semester 6  
B.Tech Information and Communication Technology  
Adani University


---

## License

MIT License. See `LICENSE` for full terms.
