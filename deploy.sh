cd apps/app || exit
rm -rf build/*
cp .env.production .env
yarn build
aws s3 sync build s3://shortform-flashcards --acl public-read
# Ensure index.html is not cached
aws s3 cp build/index.html s3://shortform-flashcards/index.html --cache-control no-cache --acl public-read

cd ../service || exit
rm -rf dist/*
cp .env.production .env
# AWS doesn't play nicely with Lerna, so let's prepare the dependencies in a way that EB
# will play with them. Ideally we'd have an automated script do this for us so that we don't
# need to do this manually every time we add a dependency, but for now, since we only have three
# shared packages, we can do this by hand
cp package.json package.json.old
mkdir -p libs
cp -r ../../libs/db-client libs/db-client
cp -r ../../libs/flashcard-common libs/flashcard-common
cp -r ../../libs/types libs/types
sed -i 's|"@shortform-flashcards/db-client": "1.0.0"|"@shortform-flashcards/db-client": "file:./libs/db-client"|g' package.json
sed -i 's|"@shortform-flashcards/flashcard-common": "1.0.0"|"@shortform-flashcards/flashcard-common": "file:./libs/flashcard-common"|g' package.json
sed -i 's|"@shortform-flashcards/types": "1.0.0"|"@shortform-flashcards/types": "file:./libs/types"|g' package.json
sed -i 's|"@shortform-flashcards/types": "1.0.0"|"@shortform-flashcards/types": "file:../types"|g' libs/db-client/package.json
sed -i 's|"@shortform-flashcards/types": "1.0.0"|"@shortform-flashcards/types": "file:../types"|g' libs/flashcard-common/package.json
rm -rf node_modules
npm install
yarn build:production

# Cleanup after deploying
eb deploy
mv package.json.old package.json
rm -rf libs
rm package-lock.json
cd ../../
yarn i
