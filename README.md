# mongoose-relay-connection
Easiest and lightweight way to create a Relay Connection from Mongoose query for paginate thru.

## Install
`npm i mongoose-relay-connection --save`

## Use
Import `connectionFromMongooseQuery` function from package to file with your Relay Connection definition:

```javascript
import connectionFromMongooseQuery from 'mongoose-relay-connection'
```

Use it inside resolver of your connection (don't forget to `await`!):

```javascript
const PostsConnection = {
  type: PostsConnectionType,
  args: connectionArgs,
  resolve: async (relayRoot, args) => {
    const query = Post.find()
    return await connectionFromMongooseQuery(query, args)
  }
}
```

## Example
Full working example could look like so:

```javascript
import { GraphQLInt, GraphQLList } from 'graphql'
import { connectionArgs, connectionDefinitions } from 'graphql-relay'
import GraphQLPost from 'projectRoot/data/schema/types/GraphQLPost'
import Post from 'projectRoot/data/models/Post'
import connectionFromMongooseQuery from 'mongoose-relay-connection'

const { connectionType: PostsConnectionType } = connectionDefinitions({
  name: 'Posts',
  nodeType: GraphQLPost,
  connectionFields: () => ({
    totalCount: {
      type: GraphQLInt,
      resolve: connection => connection.totalCount
    },
    posts: {
      type: new GraphQLList(GraphQLPost),
      resolve: connection => connection.edges.map(edge => edge.node)
    }
  })
})

const PostsConnection = {
  type: PostsConnectionType,
  args: connectionArgs,
  resolve: async (relayRoot, args) => {
    const query = Post.find() // Here you can add any filtering or sorting to your query
    return await connectionFromMongooseQuery(query, args)
  }
}
```
