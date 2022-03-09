# URL Shortener Microservice

This is an example of a microservice built with nodejs and express. The project is based of one of the [FreeCodeCamp back-end final projects](https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/url-shortener-microservice) and is composed of an express server hosting a default index page at root and a `/api/shorturl` route that responds with a json objects in the format `{"original_url":"google.com","short_url":1}`.

Users can add any valid url to the service and a shortened url will be created at the `/api/:shorturl` route. Visiting the `/api/:shorturl` path will automatically redirect the user to the original page if that path has already been created.

Live version of the microservice can be found [here.](https://url-shortener-12.herokuapp.com/)
