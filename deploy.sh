cd apps/app || exit
rm -rf build/*
cp .env.production .env
yarn build
# TODO: upload to S3
cd ../service || exit
rm -rf dist/*
cp .env.production .env
yarn build:production
# TODO: upload to EB