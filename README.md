# experiment-react-gpt

## Front

### Develop

In a terminal, simply go to `front/mymentor-gpt/` and run `npm run dev`. It expects to find a `.env` file, make sure to use `.env.template`
as a reference. The username and password should match what the backend sees as correct.

### Deploy

Just run `./deploy.sh`. It expects to already have `gcloud init` executed. Also the artifact registry repository is already expected to be available.
For deploying on cloud run use the file `.env.production`.

## Back

### Develop

Go to `back` and then run `node server.js`. It also expects to have the files `.env` properly setup. Use `env.template` as reference. Notice the
username and password must be the same as from the `front` setting.


### Deploy

Run `./deploy.sh`. For deploying on cloud run use the file `.env.production`.
