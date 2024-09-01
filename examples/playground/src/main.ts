import { createApp } from 'chibivue'
import { h } from '../../../packages/runtime-core/h';

const app = createApp({
    render() {
        return h('div', {}, [
            h('h1', {}, ['Hello Chibivue!']),
        ])
    },
})

app.mount('#app')
