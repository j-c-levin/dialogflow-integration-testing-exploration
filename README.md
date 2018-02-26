# dialogflow-integration-testing-exploration
Exploring the possibility of automated integration testing on Dialogflow using CI tools

| Master  | Develop   |
|:-:|:-:|
|  [![CircleCI](https://circleci.com/gh/j-c-levin/dialogflow-integration-testing-exploration/tree/master.svg?style=svg)](https://circleci.com/gh/j-c-levin/dialogflow-integration-testing-exploration/tree/master) | [![CircleCI](https://circleci.com/gh/j-c-levin/dialogflow-integration-testing-exploration/tree/develop.svg?style=svg)](https://circleci.com/gh/j-c-levin/dialogflow-integration-testing-exploration/tree/develop)  |

## Todo Integration testing

1) Create a dialogflow agent ('testing agent')
- Does not appear automatable, so for the moment, having only one build running concurrently appears to be an unavoidable drawback of the system.
2) Export the zip of the development agent
- https://dialogflow.com/docs/reference/api-v2/rest/v2beta1/projects.agent/export
3) Upload development agent to the testing agent
- https://dialogflow.com/docs/reference/api-v2/rest/v2beta1/projects.agent/restore
- https://dialogflow.com/docs/reference/api-v2/rest/v2beta1/projects.agent/train
4) Run integration tests on the testing agent
5) Destroy the testing agent
- For the reasons of step 1), also not possible right now.

## Todo Integration testing

1) Make and store simulator requests
2) Read and feed them into the app and see if it works as expected

## Todo Unit testing

1) Create a factory to generate data for a DialogFlowApp that corresponds to a specific situation
2) Feed that into a function and see if it works as expected

## General Setup

- https://dialogflow.com/docs/reference/v2-auth-setup