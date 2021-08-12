import Prismic from 'prismic-javascript'

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
export const apiEndpoint = 'https://test-nierkeuze.cdn.prismic.io/api/v2'

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
const accessToken = 'MC5ZTERVaHhBQUFDVUFhQmdT.AhHvv71r77-977-9IO-_vUBh77-9eO-_vXsMRu-_ve-_vVJHZ--_ve-_vUJ7elk577-9LGbvv70'

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (doc.type === 'page') return `/page/${doc.uid}`
  else if (doc.type === 'multiple-choice') return `/multiple-choice/${doc.uid}`
  return '/'
}

// Client method to query documents from the Prismic repo
export const client = Prismic.client(apiEndpoint, { accessToken })
