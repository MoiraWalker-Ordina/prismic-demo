// In src/pages/Page.js
import React, { useEffect, useState } from 'react'
import { RichText } from 'prismic-reactjs'
import { client, linkResolver } from '../prismic-configuration'
import NotFound from './NotFound'

const MultipleChoice = ({ match }) => {
  const [doc, setDocData] = useState(null)
  const [notFound, toggleNotFound] = useState(false)

  const uid = match.params.uid

  // Get the page document from Prismic
  useEffect(() => {
    const fetchData = async () => {
      // We are using the function to get a document by its UID
      const result = await client.getByUID('multiple-choice', uid)
  
      if (result) {
        // We use the State hook to save the document
        console.log("result", result);
        return setDocData(result)
      } else {
        // Otherwise show an error message
        console.warn('Multiple CHoice document not found. Make sure it exists in your Prismic repository')
        toggleNotFound(true)
      }
    }
    fetchData()
  }, [uid]) // Skip the Effect hook if the UID hasn't changed

  if (doc) {
    return (
      <div className="page">
        {/* This is how to render a Rich Text field as plain text */}
        <h1>{RichText.asText(doc.data.vraag)}</h1>
        {doc.data.body[0].items.map((item) => <p className="answer">{item.antwood[0].text}</p>)}
        {/* This is how to render a Rich Text field into your template as HTML */}
        <RichText render={doc.data.description} linkResolver={linkResolver} />
      </div>
    )
  } else if (notFound) {
    return <NotFound />
  }
  return null
}

export default MultipleChoice