# Gift-Giver GraphQL Server

## Starting the app

```
$ npm run start
```

App listens on port 1337

## Testing

Default test command:

```
$ npm run test
```

runs clean, format, and lint

## GraphQL

POST /graphql

```json
{
  "query": "{createUser(email: fake@email.com, password: fakepassword)}"
}
```
