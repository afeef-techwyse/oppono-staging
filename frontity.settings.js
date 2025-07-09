import { config } from "dotenv";
config();
// const wpSiteUrl = 'https://codesign82.com/oppono';
// const wpSiteUrl = 'https://master-7rqtwti-oer23r2mz66wc.ca-1.platformsh.site';
const wpSiteUrl = 'https://oppono-app.com';
const frontEndSiteUrl = 'https://oppono-app-staging.vercel.app';
// const frontEndSiteUrl = 'http://localhost:3000';


const settings = {
  'name': 'oppono-frontity',
  'state': {
    'frontity': {
      'url': frontEndSiteUrl,
      'title': 'Oppono',
      'description': '',
      'options': {
        publicPath: `/static/`
      }
    },
  },
  'packages': [
    {
      
      'name': '@frontity/wp-source',
      'state': {
        'source': {
          'api': `${wpSiteUrl}/wp-json`,
          homepage: '/home',
          postsPage: '/blog',
        },
      },
    },
    '@frontity/tiny-router',
    '@frontity/html2react',
    '@frontity/head-tags',
    {
      'name': 'oppono-theme',
    },
  ],
};

export default settings;
