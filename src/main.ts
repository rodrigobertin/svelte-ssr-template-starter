import './app.css'

import { mount } from 'svelte'
import { ClientApp } from 'svelte-pilot'

import router from './router'

router.start(() =>
  mount(ClientApp, {
    props: { router },
    target: document.getElementById('app')!
  })
)
