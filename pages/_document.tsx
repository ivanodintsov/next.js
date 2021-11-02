import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import config from '~/config';

export class HeadWithoutPreload extends Head {
  getPreloadDynamicChunks() {
    return [];
  }

  getPreloadMainLinks() {
    return [];
  }
}

type DocumentFiles = {
  sharedFiles: readonly string[];
  pageFiles: readonly string[];
  allFiles: readonly string[];
};

function dedupe<T extends { file: string }>(bundles: T[]): T[] {
  const files = new Set<string>();
  const kept: T[] = [];

  for (const bundle of bundles) {
    if (files.has(bundle.file)) {
      continue;
    }
    files.add(bundle.file);
    kept.push(bundle);
  }
  return kept;
}

export class DeferredNextScript extends NextScript {
  getScripts(files: DocumentFiles) {
    return super.getScripts(files).map((script: JSX.Element) => {
      return React.cloneElement(script, {
        // eslint-disable-next-line @typescript-eslint/tslint/config
        key: script.props.src,
        defer: true,
        async: false,
      });
    });
  }
  getDynamicChunks(files: DocumentFiles) {
    const {
      dynamicImports,
      assetPrefix,
      devOnlyCacheBusterQueryString,
    } = this.context;

    return dedupe(dynamicImports).map((bundle) => {
      let modernProps = {};
      if (process.env.__NEXT_MODERN_BUILD) {
        modernProps = bundle.file.endsWith('.module.js')
          ? { type: 'module' }
          : { noModule: true };
      }

      if (
        !bundle.file.endsWith('.js') ||
        files.allFiles.includes(bundle.file)
      ) {
        return null;
      }

      return (
        <script
          defer={true}
          key={bundle.file}
          src={`${assetPrefix}/_next/${encodeURI(
            bundle.file
          )}${devOnlyCacheBusterQueryString}`}
          nonce={this.props.nonce}
          crossOrigin={
            this.props.crossOrigin || process.env.__NEXT_CROSS_ORIGIN
          }
          {...modernProps}
        />
      );
    });
  }
}

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='ru' prefix='og: https://ogp.me/ns#'>
        <HeadWithoutPreload>
          <meta charSet='utf-8' />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='/images/favicons/apple-touch-icon.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='32x32'
            href='/images/favicons/favicon-32x32.png'
          />
          <link
            rel='icon'
            type='image/png'
            sizes='16x16'
            href='/images/favicons/favicon-16x16.png'
          />
          <link rel='manifest' href='/images/favicons/site.webmanifest' />
          <link
            rel='mask-icon'
            href='/images/favicons/safari-pinned-tab.svg'
            color='#5bbad5'
          />
          <link rel='shortcut icon' href='/images/favicons/favicon.ico' />
          <meta name='msapplication-TileColor' content='#da532c' />
          <meta
            name='msapplication-config'
            content='/images/favicons/browserconfig.xml'
          />
          <meta name='theme-color' content='#000000' />
          {/* <!-- Facebook Pixel Code --> */}
          {config.FB_PIXEL_ID && (
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', '${config.FB_PIXEL_ID}');
                  fbq('track', 'PageView');
                `,
              }}
              async
            />
          )}
          {/* <!-- End Facebook Pixel Code --> */}
        </HeadWithoutPreload>
        <body>
          {/* <!-- Google Tag Manager (noscript) --> */}
          {config.GTM_TRACKING_ID && (
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${config.GTM_TRACKING_ID}`}
                height='0'
                width='0'
                style={{ display: 'none', visibility: 'hidden' }}
              ></iframe>
            </noscript>
          )}
          {/* <!-- End Google Tag Manager (noscript) --> */}
          {config.YM_TRACKING_ID && (
            <noscript>
              <div>
                <img
                  src={`https://mc.yandex.ru/watch/${config.YM_TRACKING_ID}`}
                  style={{ position: 'absolute', left: '-9999px' }}
                  alt=''
                />
              </div>
            </noscript>
          )}
          {config.FB_PIXEL_ID && (
            <noscript>
              <img
                height='1'
                width='1'
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${config.FB_PIXEL_ID}&ev=PageView&noscript=1`}
              />
            </noscript>
          )}
          <Main />
          <DeferredNextScript />
          {/* <!-- Google Tag Manager --> */}
          {config.GTM_TRACKING_ID && (
            <script
              type='text/javascript'
              dangerouslySetInnerHTML={{
                __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','${config.GTM_TRACKING_ID}');
                `,
              }}
              async
            />
          )}
          {/* <!-- End Google Tag Manager --> */}
          {/* Global site tag (gtag.js) - Google Analytics */}
          {config.GA_TRACKING_ID && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${config.GA_TRACKING_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', '${config.GA_TRACKING_ID}');
                  `,
                }}
              />
            </>
          )}
          {/* <!-- Yandex.Metrika counter --> */}
          {config.YM_TRACKING_ID && (
            <script
              type='text/javascript'
              dangerouslySetInnerHTML={{
                __html: `
                  (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                  m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                  (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                
                  ym(${config.YM_TRACKING_ID}, "init", {
                      clickmap:true,
                      trackLinks:true,
                      accurateTrackBounce:true,
                      webvisor:true
                  });
                `,
              }}
              async
            />
          )}
          {/* <!-- /Yandex.Metrika counter --> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
