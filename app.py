from flask import Flask, render_template
import json
import requests
import os

app = Flask(__name__)

name = "joesonchiang"
api_key = str(os.environ.get('TINT_API_KEY'))

@app.route('/')
def index(data=None):
	data = requests.get('https://api.tintup.com/v1/feed/' + name + '?api_token=' + api_key);
	images = []
	comments = []
	data = data.json()['data']
	for i in range(len(data)):
		images.append(json.dumps(data[i]['image']))
		comments.append(json.dumps(data[i]['comments']))
	return render_template('index.html', data=[images, comments])

if __name__ == '__main__':
    app.run()