/** Turns qa-report/results.json into a readable QA_SUMMARY.md (for you or your AI agent). */
import fs from 'fs';
import path from 'path';

type Row = { project: string; title: string; file: string; status: string; error: string };

const file = path.join(__dirname, '..', 'qa-report', 'results.json');
if (!fs.existsSync(file)) {
  console.error('qa-report/results.json not found — run "npm run test:nodiscover" first.');
  process.exit(1);
}
const json = JSON.parse(fs.readFileSync(file, 'utf-8'));
const rows: Row[] = [];

const strip = (s: string) => s.replace(/\u001b\[[0-9;]*m/g, '');

function walk(suite: any, titles: string[]) {
  const t = suite.title && !/\.spec\.ts$/.test(suite.title) ? [...titles, suite.title] : titles;
  for (const spec of suite.specs ?? []) {
    for (const test of spec.tests ?? []) {
      const results = test.results ?? [];
      const last = results[results.length - 1];
      const errors = (last?.errors ?? []).map((e: any) => strip(e.message ?? '').split('\n').filter((l: string) => l.trim() && !/^\s*(at |\d+ \||>? ?\d+ \|)/.test(l)).slice(0, 16).join('\n'));
      rows.push({
        project: test.projectName,
        title: [...t, spec.title].join(' › '),
        file: spec.file,
        status: test.status,
        error: errors.join('\n---\n'),
      });
    }
  }
  for (const s of suite.suites ?? []) walk(s, t);
}
for (const s of json.suites ?? []) walk(s, []);

const count = (st: string) => rows.filter((r) => r.status === st).length;
const failed = rows.filter((r) => r.status === 'unexpected');
const flaky = rows.filter((r) => r.status === 'flaky');

const perProject = new Map<string, { pass: number; fail: number; skip: number }>();
for (const r of rows) {
  const p = perProject.get(r.project) ?? { pass: 0, fail: 0, skip: 0 };
  if (r.status === 'expected' || r.status === 'flaky') p.pass++;
  else if (r.status === 'skipped') p.skip++;
  else p.fail++;
  perProject.set(r.project, p);
}

let md = `# QA Summary\n\nGenerated: ${new Date().toISOString()}\n\n`;
md += `**Total:** ${rows.length} · **Passed:** ${count('expected')} · **Failed:** ${failed.length} · **Flaky:** ${flaky.length} · **Skipped:** ${count('skipped')}\n\n`;
md += `## By viewport\n\n| Project | Pass | Fail | Skip |\n|---|---|---|---|\n`;
for (const [k, v] of perProject) md += `| ${k} | ${v.pass} | ${v.fail} | ${v.skip} |\n`;

md += `\n## Failures (${failed.length})\n\n`;
const byTitle = new Map<string, Row[]>();
for (const r of failed) byTitle.set(r.title, [...(byTitle.get(r.title) ?? []), r]);
for (const [title, list] of byTitle) {
  md += `### ${title}\nViewports: ${list.map((l) => l.project).join(', ')}\n\n\`\`\`\n${list[0].error || 'no error message'}\n\`\`\`\n\n`;
}
if (flaky.length) md += `## Flaky\n${flaky.map((r) => `- ${r.title} [${r.project}]`).join('\n')}\n`;

fs.writeFileSync(path.join(__dirname, '..', 'QA_SUMMARY.md'), md);
console.log(`QA_SUMMARY.md written — ${failed.length} failing test(s) across ${byTitle.size} distinct check(s).`);
