# React template with CI

[![Continuous Integration](https://github.com/emeraldigital/react-template/actions/workflows/integration.yml/badge.svg?branch=staging)](https://github.com/emeraldigital/react-template/actions/workflows/integration.yml)

[![Continuous Deployment](https://github.com/emeraldigital/react-template/actions/workflows/deployment.yml/badge.svg)](https://github.com/emeraldigital/react-template/actions/workflows/deployment.yml)

This project uses [create-react-app](https://create-react-app.dev/) as base to create a basic (but powerfull) CI/CD pipeline blank project with [github actions](https://docs.github.com/es/actions).

## Workflow

This workflow uses at least 3 branches:

1. **release**, main branch with released code (build from staging).
2. **staging**, this branch integrate the code of all working branches.
3. **development**, working branch (optional).

![workflow](./docs/workflow.png)

## Jobs
This workflow runs two jobs on push for the branches (staging and release)

on staging branch push:
1. **stop_prev**, stop previous pipelines
2. **lint**, runs code linter to fix syntax
3. **build**
4. **deploy** to test env
5. **test**, unit and e2e tests
6. **push**, generate automated push to release branch

on release branch push:

1. **stop_prev**, stop previous pipelines
2. **deploy** to production env

Configurations for Deploy ([source](https://github.com/marketplace/actions/ssh-remote-commands)):

1. In local machine, create ssh key
2. Copy the **private key** to github project's secrets _(Settings/Secrets/Actions)_
3. Create repository secrets to:
    * SERVER_HOST
    * SERVER_USER
    * SERVER_PASSWORD
4. Copy the **public key** into server's file ```~/.ssh/authorized_keys```
Configurations:

---
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).