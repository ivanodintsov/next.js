import * as React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

type HeadMetaProps = {
  title?: string;
  description?: string;
  baseUrl?: string;
  siteName?: string;
  url?: string;
  photo?: string;
  twitterUsername?: string;
  vkImage?: string;
  defaultImage?: string;
};

const HeadMeta = ({
  description,
  photo,
  baseUrl,
  siteName,
  twitterUsername,
  vkImage,
  defaultImage,
  ...rest
}: HeadMetaProps) => {
  const Router = useRouter();
  const url = rest.url || `${baseUrl}${Router.asPath}`;
  const title = rest.title;

  return (
    <Head>
      <title>{title}</title>
      <link rel='canonical' href={url} />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:title' content={title} />
      <meta property='og:url' content={url} />
      <meta property='og:locale' content='ru_RU' />
      {twitterUsername && (
        <meta name='twitter:site' content={twitterUsername} />
      )}
      <meta name='twitter:title' content={title} />
      <meta name='twitter:card' content='summary' />
      {description && (
        <>
          <meta name='description' content={description} />
          <meta name='twitter:description' content={description} />
          <meta property='og:description' content={description} />
        </>
      )}
      {defaultImage && (
        <>
          <link rel='image_src' href={defaultImage} />
          <meta property='ok:image' content={defaultImage} />
        </>
      )}
      {photo && (
        <>
          <meta property='og:image' content={photo} />
          {/* <meta property='og:image:width' content='640' />
          <meta property='og:image:height' content='640' /> */}
          <meta name='twitter:image' content={photo} />
        </>
      )}
      {vkImage && <meta property='vk:image' content={vkImage} />}
    </Head>
  );
};

HeadMeta.defaultProps = {
  photo: undefined,
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  siteName: process.env.NEXT_PUBLIC_SITE_NAME,
  description: process.env.NEXT_PUBLIC_DESCRIPTION,
  title: process.env.NEXT_PUBLIC_TITLE,
};

export default HeadMeta;
