from flask import Flask, request, session, g, redirect, url_for, \
     abort, render_template, flash
import json
import requests
import os

app = Flask(__name__)
name = "joesonchiang"

@app.route('/')
def index(data=None):
	data = requests.get('https://api.tintup.com/v1/feed/' + name + '?api_token=' + str(os.environ.get('TINT_API_KEY')));
	images = []
	comments = []
	data = data.json()['data']
	for i in range(19):
		images.append(data[i]['image'])
		comments.append(data[i]['comments'])
	return render_template('index.html', data=[images, comments])

if __name__ == '__main__':
    app.run()