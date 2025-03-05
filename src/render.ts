import { render } from 'svelte/server'
import { ServerApp } from 'svelte-pilot'

import router from './router'

// @ts-ignore
export default async function ({ template, url }) {
  try {
    const route = await router.handleServer(
      new URL(url, 'http://127.0.0.1').href
    )

    if (!route) {
      return {
        body: import.meta.env.DEV
          ? `${url} did not match any routes. Did you forget to add a catch-all route?`
          : '404 Not Found',
        statusCode: 404
      }
    }

    const html = render(ServerApp, {
      props: { route, router }
    })

    return {
      body: template
        .replace('</head>', `${html.head}</head>`)
        .replace(
          '<div id="app">',
          `<div id="app">${
            html.body
          }<script>__SSR_STATE__ = ${serialize(route.ssrState)}</script>`
        ),

      headers: {
        'Content-Type': 'text/html'
      },

      statusCode: 200
    }
  }
  catch (e) {
    console.error(e)

    return {
      body: import.meta.env.DEV && e instanceof Error ? e.message : '',
      statusCode: 500
    }
  }
}

function serialize(data:any) {
  return JSON.stringify(data).replace(/</g, '\\u003C').replace(/>/g, '\\u003E')
}
