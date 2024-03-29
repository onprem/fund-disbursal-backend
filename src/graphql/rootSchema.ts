import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import { addResolversToSchema } from '@graphql-tools/schema';
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import path from 'path';

import { RequiredAuthenticationDirective } from './authentication/RequiedAuthenticationDirective';

const rootSchema = addResolversToSchema({
  schema: loadSchemaSync(path.join(__dirname, './**/schema.graphql'), {
    loaders: [new GraphQLFileLoader()],
  }),
  resolvers: mergeResolvers(loadFilesSync(path.join(__dirname, './**/resolvers.*'))),
  inheritResolversFromInterfaces: true,
});

SchemaDirectiveVisitor.visitSchemaDirectives(rootSchema, {
  requireAuthentication: RequiredAuthenticationDirective,
});

export { rootSchema };
