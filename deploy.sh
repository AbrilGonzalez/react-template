#!/bin/bash

# Get the last commit log
OUTPUT=$(git log -1 --oneline)
# Get the version from commit log
VERSION=$(echo "${OUTPUT}" | cut -c1-8)

printf "Deploy version ${VERSION} from commit: \n\t -> ${OUTPUT}\n"

echo 1. Build react-template:${VERSION}
echo  - docker build -t react-template:${VERSION} .
docker build -t react-template:${VERSION} .

echo 2. Remove latest prev container
echo  - docker rm -f react-template-prev
docker rm -f react-template-prev

echo 3. Rename current container to prev
echo  - docker rename react-template react-template-prev
docker rename react-template react-template-prev

echo 4. Stop new current prev container
echo  - docker stop react-template-prev
docker stop react-template-prev

echo 5. Run new container from build image
echo  - docker run -itd --name react-app -p 8080:80 react-template:${VERSION}
docker run -itd --name react-template --restart=always -p 8080:80 react-template:${VERSION}