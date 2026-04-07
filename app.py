# ============================================================
#  Netflix Data Visualization Dashboard — Flask Application
#  Author : Anshika Mittal  |  USN: 1AUA23BIT005
# ============================================================

from flask import Flask, render_template
import os

app = Flask(__name__)

# ── Chart discovery helpers ──────────────────────────────────
CHARTS_DIR        = os.path.join(app.root_path, 'charts')
STATIC_CHARTS_DIR = os.path.join(app.root_path, 'static', 'charts')

def get_png_charts(prefix=None):
    """Return a list of PNG filenames from /charts (optionally filtered by prefix)."""
    try:
        files = [f for f in os.listdir(CHARTS_DIR) if f.endswith('.png')]
        if prefix:
            files = [f for f in files if f.startswith(prefix)]
        return sorted(files)
    except FileNotFoundError:
        return []

def get_html_charts(prefix=None):
    """Return a list of HTML chart filenames from /static/charts."""
    try:
        files = [f for f in os.listdir(STATIC_CHARTS_DIR) if f.endswith('.html')]
        if prefix:
            files = [f for f in files if f.startswith(prefix)]
        return sorted(files)
    except FileNotFoundError:
        return []


# ── Routes ───────────────────────────────────────────────────

@app.route('/')
def home():
    """Landing / Hero page."""
    return render_template('home.html')


@app.route('/analysis')
def analysis():
    """Main dashboard — EDA charts overview."""
    png_charts = [
        {'file': 'movies_vs_tv.png',          'title': 'Movies vs TV Shows'},
        {'file': 'ratings_distribution.png',   'title': 'Ratings Distribution'},
        {'file': 'content_added_per_year.png', 'title': 'Content Added Per Year'},
        {'file': 'monthly_addition_trend.png', 'title': 'Monthly Addition Trend'},
        {'file': 'stacked_year_type.png',      'title': 'Yearly Type Breakdown'},
        {'file': 'heatmap_year_month.png',     'title': 'Year × Month Heatmap'},
        {'file': 'duration_analysis.png',      'title': 'Duration Analysis'},
        {'file': 'tv_season_buckets.png',      'title': 'TV Show Season Buckets'},
        {'file': 'content_age_decade.png',     'title': 'Content Age & Decade'},
        {'file': 'type_rating_heatmap.png',    'title': 'Type × Rating Heatmap'},
    ]
    html_charts = [
        {'file': 'timeseries_additions.html', 'title': 'Interactive Time-Series Trend'},
    ]
    return render_template('analysis.html',
                           png_charts=png_charts,
                           html_charts=html_charts)


@app.route('/genres')
def genres():
    """Genre insights page."""
    png_charts = [
        {'file': 'top_genres.png',       'title': 'Top 15 Genres'},
    ]
    html_charts = [
        {'file': 'treemap_genre.html',   'title': 'Genre Distribution — Treemap'},
    ]
    return render_template('genres.html',
                           png_charts=png_charts,
                           html_charts=html_charts)


@app.route('/countries')
def countries():
    """Country insights page."""
    png_charts = [
        {'file': 'top_countries.png',            'title': 'Top 10 Content-Producing Countries'},
    ]
    html_charts = [
        {'file': 'sunburst_country_genre.html',  'title': 'Country → Genre Sunburst'},
    ]
    return render_template('countries.html',
                           png_charts=png_charts,
                           html_charts=html_charts)


# ── Run ──────────────────────────────────────────────────────
if __name__ == '__main__':
    app.run(debug=True)
