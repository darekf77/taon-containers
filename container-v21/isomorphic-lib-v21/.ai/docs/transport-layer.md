# Transport layer

Taon selects transport according to the application target. The transports are
not interchangeable: realtime support and access to platform APIs depend on
the runtime.

| Target | Backend location | Communication and runtime notes |
| --- | --- | --- |
| Node.js | Node.js server | HTTP request/response and Socket.IO-based realtime communication are available. Node.js APIs are available only in the backend. |
| Cloudflare Worker | Worker runtime | Use request/response APIs supported by the Worker target. Taon's Cloudflare realtime strategy is not implemented, so do not rely on Socket.IO or realtime subscriptions there. |
| WebSQL | In the browser | Backend logic runs in the browser. It is not a remote Node.js server, and cross-tab realtime communication is not implemented. |
| Electron | Electron main process | Renderer-to-backend communication uses Electron IPC. Keep privileged Node.js APIs in the backend. |

Use the target-specific build and test path to verify transport behavior. A
successful Node.js build does not prove that code is compatible with a
Cloudflare Worker, WebSQL, or Electron.

For code that must vary by runtime, use the markers described in
[Isomorphic code regions](./isomorphic-code-regions.md). For target setup and
limitations, see [Architecture](./architecture.md).
