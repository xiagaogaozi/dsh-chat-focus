import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const component = readFileSync(join(root, 'src/client/chat/bubbles/RuntimeFoldBox.tsx'), 'utf8')
const stylesheet = readFileSync(join(root, 'src/client/chat/bubbles/RuntimeFoldBox.module.css'), 'utf8')

// A fold box must grow with the activities it contains.  A virtual viewport
// uses estimated row heights and leaves a visible empty region for compact rows.
assert.doesNotMatch(component, /VIRTUAL_(?:ROW_HEIGHT|VIEWPORT_HEIGHT|OVERSCAN|THRESHOLD)/, 'runtime activity must not switch to an estimated-height virtual list')
assert.doesNotMatch(component, /data-chat-fold-virtual/, 'runtime activity must not expose a virtual scroll viewport')
assert.match(component, /insideItems\.map\(\(item, index\)/, 'all runtime activities must render in source order')
assert.doesNotMatch(stylesheet, /max-height:\s*360px/, 'fold body must not reserve a 360px viewport')
assert.doesNotMatch(stylesheet, /overflow-y:\s*auto/, 'fold body height must be content-driven')

console.log('runtime fold adaptive layout contract: PASS')
