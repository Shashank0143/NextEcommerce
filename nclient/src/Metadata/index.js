import React from 'react'
import Helmet from "react-helmet";
function MetaData({title, description, link, keywords}) {
  return (
  <Helmet>
    <meta charSet='utf-8' />
     <title>{title}</title>
     {description && <meta name="description" content={description} />}
     {link && <link rel="canonical" href={link} />}
     {keywords && <meta name='keywords' content={keywords}/>}
  </Helmet>
  )
}

export default MetaData