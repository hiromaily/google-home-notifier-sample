FROM node:9

MAINTAINER Hiroki Yasui <hiromaily@gmail.com>

RUN apt-get -y update && \
    apt-get install -y \
        vim \
        python-dev \
        libavahi-compat-libdnssd-dev \
        socat && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p \
    /workspace/googlehome \
    /workspace/googlehome/test
WORKDIR /workspace/googlehome

COPY package.json package-lock.json ./
RUN npm install

COPY . .

ENTRYPOINT ["npm"]
CMD ["start"]
#CMD ["bash"]

