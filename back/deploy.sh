LOCATION=us-east1
PROJECT_ID=$(gcloud config list --format 'value(core.project)')
REPOSITORY=${PROJECT_ID}
IMG=mymenthorback
SERVICE_NAME=mymenthorback

docker build -t ${LOCATION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMG}:latest .

docker push ${LOCATION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMG}:latest

gcloud run deploy ${SERVICE_NAME} \
    --image=${LOCATION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMG}:latest \
    --region=${LOCATION} \
    --platform=managed \
    --allow-unauthenticated
