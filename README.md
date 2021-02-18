![screenshot](screenshot.png)
# arilaverty.dev
Live: http://arilaverty.dev

My personal page takes inspiration from Facebook, and serves a feed of user posts. To create a post a user must first sign up. Authentication is provided for by Firebase Auth (GCP Identity Platform).

Posts get stored in Firestore, a NoSQL database by Google. Firestore enables real-time updates, so when comments or likes are added to a post, the data is propagated instantly to every client connected.

## Tech Stack
* GCP
* Firestore
* Firebase Auth
* AppEngine
* (optional) Cloud Run / Kubernetes

## Features
* Signup
* Login
* Password Reset
* Image Upload
* Post Commenting
* Post Sharing / Liking
* Theme "dark mode"

## Deployment
* To deploy to AppEngine, `app.yaml` can be used to configure and automate the deployment.
* Use the `Dockerfile` and `nginx.conf` for deployments to Cloud Run or Kubernetes as a container

## Project setup
Clone the repository, setup your own `firebase.js` file in `src/` then:
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
