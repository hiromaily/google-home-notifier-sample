CONTAINER_NAME=google-home

init:
	npm init
	npm install google-home-notifier
	#yarn add google-home-notifier

dcbld:
	docker build -t hirokiy/google-home-notifier:latest -f Dockerfile ${HOME}/work/google-home/google-home-notifier-sample

dcbldc:
	docker build --no-cache -t hirokiy/google-home-notifier:latest -f Dockerfile ${HOME}/work/google-home/google-home-notifier-sample

dcrun:
	docker run -it --name ${CONTAINER_NAME} \
	-d hirokiy/google-home-notifier:latest run

dcombld:
	docker-compose build

dcup:
	docker-compose -f docker-compose.yml up

run:
	node main.js

server:
	node server.js
