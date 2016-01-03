# Vacancy Apply Page

### Install node modules

```sh
$ cd vacancy-page
$ npm install
```

### Install bower packages

```sh
$ cd vacancy-page/app/assets/js/
$ bower install
```

### Run gulp to copy js libs and css libs
```sh
$ cd vacancy-page
$ ./node_modules/.bin/gulp default
```

### Start http server on port 8000
```sh
$ cd vacancy-page
$ node server.js
```

* Run 'node server.js' to be able to send mails (and disable antivirus) for development run ./node_modules/.bin/nodemon server.js

### Open browser and type

* http://localhost:8000/