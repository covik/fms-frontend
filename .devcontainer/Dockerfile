# syntax=docker/dockerfile:1
FROM node:22.9.0-bullseye-slim@sha256:80c9b96d59e83fa41e14e3d90953d52a875a60447efb74469cb195f0e64457bc AS base
ARG USERNAME=developer
ARG USER_UID=1000
ARG USER_GID=$USER_UID
# avoid warnings like "tput: No value for $TERM and no -T specified"
ENV TERM="xterm"
RUN unlink /usr/local/bin/npm \
    && apt-get update \
    && apt-get --no-install-recommends install -y \
        ca-certificates \
        curl \
        git \
        gnupg2 \
        libgtk2.0-0 \
        libgtk-3-0 \
        libgbm-dev \
        libnotify-dev \
        libnss3 \
        libxss1 \
        libasound2 \
        libxtst6 \
        openssh-client \
        sudo \
        watch \
        wget \
        xauth \
        xvfb \
    && curl -fsSL https://dl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get --no-install-recommends install -y \
      google-chrome-stable \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean
RUN deluser --remove-home node \
    && groupadd --gid $USER_GID $USERNAME \
    && useradd --uid $USER_UID --gid $USER_GID --create-home $USERNAME --shell /bin/bash \
    && echo "$USERNAME ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

USER $USERNAME
RUN mkdir ~/.cache \
    && mkdir ~/.docker \
    && mkdir -p ~/.cache/JetBrains/RemoteDev/dist \
    && git config --global commit.gpgsign true
