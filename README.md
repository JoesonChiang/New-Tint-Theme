#Tint Bubble Theme

This is a new Tint theme designed to give the users a bubbly and relaxed feel.
The Bubble Theme allows users to make their pictures and posts float around
in the page in a random fashion.

##Usage

Provided are the static pages and the python file for this theme. To run
it, you will need a server to make requests to the posts that you want to
receive. At this moment, Tint api requests are only available to premium
users. In app.py, you will need to put your name for the variable `name`
and replace the `api_key` variable with your own api key.
Now run your server. I chose to use Flask as my web framework for this project.
If you are using the Flask server, run "python app.py".

When the app is running, you can hover over the pictures to reveal the comments
or statuses. Also, you can also change the speed of the moving pictures by inputting
a number on the top search bar specified by _Speed (seconds)_ (20 seconds by default).

You can also choose to see collisions within the photos by setting `true` on the
top search bar specified by _Collisions (true or false)_ (false by default);


##Installation
The tools needed for this project are Flask, pip, and requests.
These are easy to install with the commands:

* `pip install Flask`
* `pip install requests`

Now you are ready to run the application. You can also easily deploy your
application to heroku by creating a Procfile and installing gunicorn with
`pip install gunicorn` Look at https://www.heroku.com for more details.

## Credits and Acknowledgements

* jQuery and jQueryUI hosted by Google
* jQuery Collision Plugin
* Flask
* Heroku
* Tint



