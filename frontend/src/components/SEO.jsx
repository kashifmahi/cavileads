import React from "react";
import { Helmet } from "react-helmet-async";
import { SITE_URL } from "../config";

const SEO = ({ title, description, path = "", keywords, schemas = [], noindex = false }) => {
  const url = `${SITE_URL}${path}`;
  const image = `${SITE_URL}/og-image.png`;

  React.useEffect(() => {
    document.querySelectorAll('[data-default="true"]').forEach((el) => el.remove());
  }, []);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
