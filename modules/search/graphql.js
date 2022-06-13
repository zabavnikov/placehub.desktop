import { POST_FRAGMENT } from '~/modules/posts/graphql'

export const SEARCH = `
  search(query: $query) {
    ...on Post {
      ${POST_FRAGMENT}
    }
  }
`