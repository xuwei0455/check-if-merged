# Container image that runs your code
FROM debian:10.7-slim

RUN apt-get update; apt-get install -y git

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
