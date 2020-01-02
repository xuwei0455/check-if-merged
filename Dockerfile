# Container image that runs your code
FROM debian:10.2-slim

LABEL "com.github.actions.name"="Check if a branch is merged to another"
LABEL "com.github.actions.description"="Check if a branch is merged to another"
LABEL "com.github.actions.icon"="hash"
LABEL "com.github.actions.color"="gray-dark"

LABEL version="1.0.0"
LABEL repository="http://github.com/marcocarvalho/check_if_merged"
LABEL homepage="http://github.com/marcocarvalho/check_if_merged"
LABEL maintainer="Abi Noda <marco.carvalho.swasthya@gmail.com>"

RUN apt-get update; apt-get install -y git

COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
