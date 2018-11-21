# Graphql-dynamo-poc

The purpose of this project is to demonstrate how GraphQL could be leveraged in production. The expectation is that "production ready" patterns are used to create a scalable, deployable node application that serves a single GraphQL endpoint to query/mutate data in a dynamoDB table. Another focus of this app is to try to demonstrate use of "developer centric" tools that could improve node development.

## Style Guide

Styling should default to close to prettier settings (check `.prettierrc.yaml` for any deviation), auto formatting can be done from the command `npm run format`, alternatively most IDE's support prettier plugins that will format on save (my intent of using prettier in my personal node apps).

## Staring the app

`$ npm run start` will start the app, listening on `http://localhost:1337/graphql`.

`$ npm run dev` will start the app with nodemon watching for file changes.

## GraphQL / Apollo

This project uses the apollo-server to serve a single graphql endpoint. While the app is running, the "GraphQL Playground" can be accessed from `http://localhost:1337/graphql` from any browser. The graphql endpoint can be accessed by sending a POST request with a query in th body to `http://localhost:1337/graphql`

![alt text](./graphql-screenshot.png 'http://localhost:1337/graphql')

### Healthcheck Query example:

```
curl -X POST \
  http://localhost:1337/graphql \
  -H 'Content-Type: application/json' \
  -d '{
	"query": "{healthcheck}"
    }'
```

### Reponse:

```
{"data":{"healthcheck":"success"}}
```

_**Note:** One downside I have found in regards querying is that not all tools (postman) support multi line strings in their json bodies. The above example is fine for a simple request, but as your queries get more complex the need for multi-line string queries becomes apparent. There are some newer tools such as [insomnia](https://insomnia.rest/graphql/ 'insomnia')
, that support graphql queries out of the box. The graphql playground expose at `http://localhost:1337/graphql` is also handy for testing queries._

## Dynamo

Local development utilizes a docker image of local-dynamo. After bringing up the container with `npm run dynamo-up`, you can verify it is functioning by accessing the shell at `http://localhost:8000/shell/`. Similarly you can take the container down with `npm run dynamo-down`.

![alt text](./local-dynamo-screenshot.png 'http://localhost:8000/shell')

## VSCode

I have included my vscode debug config in source control so that use of the node/debugger breakpoints are supported out of the box. Code users will see two debug configurations for attching to the docker container and one for running mocha tests.

## TODO:

    - cf templates for application/elb, dynamo permissions
    - prod modules (trace,logging,auth... etc)
    - pipeline
    - unit test coverage
    - schema/resolver test solution
    - get dynamo working local/int
    - find out (and implement) if healthchecks can post w/ body instead of a 200 in AWS
    - playground in production? <= find answer to this question
    - add create table/user scripts in gulp to be used in tests
