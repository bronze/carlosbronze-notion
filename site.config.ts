import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '172a2395517b80ab99f3c11f5bb41e8f',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Carlos Bronze',
  domain: 'carlosbronze.com.br',
  author: 'Carlos Bronze',

  // open graph metadata (optional)
  description: 'Site pessoal e Curriculo de Carlos Bronze',

  // social usernames (optional)
  twitter: '',
  github: 'bronze',
  linkedin: 'carlosbronze',
  bluesky: 'carlosbronze.com.br',
  onlyfans: 'lol',
  resume:
    'https://docs.google.com/document/d/1QjJRMyWnHIhv6_bAtlz2mGRNnZZw81rjCOGd4ZlmZpY/edit?usp=sharing',
  // mastodon: '#', // optional mastodon profile URL, provides link verification
  // newsletter: '#', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages. To use `navigationLinks`, set `navigationStyle` to `custom`.
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  navigationLinks: [
    {
      title: 'Produto',
      pageId: '126a2395517b8092850bcb198e217ab6'
    },
    {
      title: 'Projetos',
      pageId: '208a2395517b804e8722c86608c0cc42'
    },
    {
      title: 'Sobre',
      pageId: '172a2395517b8015ab5cd9242bfc7586'
    }
    // {
    //   title: 'Contato',
    //   pageId: '195a2395517b8065be5ce1c8bfad2eaa'
    // }
  ]
})
