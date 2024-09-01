import { RendererOptions } from '../runtime-core'

export const nodeOps: RendererOptions<Node> = {
    setElementText(node, text) {
        node.textContent = text
    },
    createElement(type) {
        return document.createElement(type)
    },
    createText(text) {
        return document.createTextNode(text)
    },
    insert(child, parent, anchor) {
        parent.insertBefore(child, anchor || null)
    },
}
