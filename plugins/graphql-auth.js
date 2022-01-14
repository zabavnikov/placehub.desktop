export default function ({ app }) {
  app.$graphql.default
      .setHeader('Authorization', app.$auth.strategy.token.get());
}