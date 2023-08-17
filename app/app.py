from flask import Flask, render_template, request
import requests

app = Flask(__name__)

def fetch_movie_data(movie_title, api_key):
    response = requests.get(f"https://api.themoviedb.org/3/search/movie", params={"query": movie_title, "api_key": api_key})
    data = response.json()
    
    return data

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        api_key = '36d1b7e9b248138487ef3d9b64e8d6ce'
        movie_title = request.form['movie_title']
        movie_data = fetch_movie_data(movie_title, api_key)
        if movie_data['results']:
            movie = movie_data['results'][0]
            return render_template('index.html', movie=movie)
        else:
            return render_template('index.html', error="No movie found with that title.")
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)