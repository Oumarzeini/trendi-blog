import { Helmet } from "react-helmet-async";

const SITE_NAME = "Trendi blog";
const SITE_URL = "https://trendi-blog.omarspace.com";

const SEO = ({title, description, image, url, type ="website"}) => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Discover, Read and Share`;

    const canonicalURL = url ? `${SITE_URL}${url}` : SITE_URL

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <link rel="canonical" href={canonicalURL} />

            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:link" content={canonicalURL} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={SITE_NAME} />

            {image && 
                <meta property="og:image" content={image} />
            }

            <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            
            {image && 
                <meta name="twitter:image" content={image} />
             }
        </Helmet>
    )
}

export default SEO;