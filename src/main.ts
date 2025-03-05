import './assets/sass/main.scss'

import { hydrate } from 'svelte'
import { ClientApp } from 'svelte-pilot'

import router from './router'

router.start(
  () => {
    hydrate(ClientApp, {
      props: { router },
      target: document.getElementById('app')!
    })
    // @ts-ignore
    delete window.__SSR_STATE__
  },
  {
    // @ts-ignore
    ssrState: window.__SSR_STATE__
  }
)
