import { VNode } from './vnode';

export interface RendererOptions<HostNode = RendererNode> {
    createElement(type: string): HostNode

    createText(text: string): HostNode

    setElementText(node: HostNode, text: string): void

    insert(child: HostNode, parent: HostNode, anchor?: HostNode | null): void
}

export interface RendererNode {
    [key: string]: any
}

export interface RendererElement extends RendererNode {
}

export type RootRenderFunction<HostElement = RendererElement> = (
    message: string,
    container: HostElement,
) => void

export function createRenderer(options: RendererOptions) {
    const {
        setElementText: hostSetElementText,
        createElement: hostCreateElement,
        createText: hostCreateText,
        insert: hostInsert
    } = options

    function renderVNode(node: VNode | string) {
        if (typeof node === 'string') {
            return hostCreateText(node)
        }
        const element = hostCreateElement(node.type)
        for (const child of node.children) {
            const childElement = renderVNode(child)
            hostInsert(childElement, element)
        }
        return element
    }

    const render: RootRenderFunction = (vnode, container) => {
        const element = renderVNode(vnode)
        hostInsert(element, container)
    }

    return { render }
}
