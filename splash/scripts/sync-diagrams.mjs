// Copy delivered Archify diagrams from context-v/diagrams/ into public/diagrams/
// so the splash can embed them. context-v/diagrams/ stays the single source:
// each diagram is a <name>.workflow.json (or other type) plus the <name>.html
// that `archify deliver` produced from it. The copies are gitignored.
import { mkdirSync, readdirSync, copyFileSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, '..', '..', 'context-v', 'diagrams');
const target = join(here, '..', 'public', 'diagrams');

rmSync(target, { recursive: true, force: true });
mkdirSync(target, { recursive: true });

const files = readdirSync(source).filter((f) => f.endsWith('.html') && !f.includes('.visual-check'));
for (const f of files) copyFileSync(join(source, f), join(target, f));
console.log(`sync-diagrams: copied ${files.length} diagram(s) into public/diagrams/`);
