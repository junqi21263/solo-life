const assert = require('node:assert/strict');
const test = require('node:test');
const { z } = require('zod');

test('bounded arrays and sets reject oversized input without parsing children', async () => {
  for (const kind of ['array', 'set']) {
    for (const asyncMode of [false, true]) {
      let visited = 0;
      const element = z.number().superRefine(() => { visited++; });
      const schema = kind === 'array' ? z.array(element).max(1) : z.set(element).max(1);
      const value = kind === 'array' ? [1, 2, 3] : new Set([1, 2, 3]);
      const result = asyncMode ? await schema.safeParseAsync(value) : schema.safeParse(value);
      assert.equal(result.success, false);
      assert.equal(visited, 0);
      assert.equal(result.error.issues[0].code, 'too_big');
    }
  }
});

test('Expo plugin schemas cap untrusted collections before validating their entries', () => {
  const path = require('node:path');
  const cliRoot = path.dirname(require.resolve('@expo/cli/package.json', { paths: [path.dirname(require.resolve('expo/package.json'))] }));
  const { PluginSchema, DevToolsPluginOutputSchema } = require(path.join(cliRoot, 'build/src/start/server/DevToolsPlugin.schema.js'));
  const tooMany = Array.from({ length: 1001 }, () => ({}));
  const output = DevToolsPluginOutputSchema.safeParse(tooMany);
  assert.equal(output.success, false);
  assert.equal(output.error.issues.length, 1);
  assert.equal(output.error.issues[0].code, 'too_big');
  const plugin = PluginSchema.safeParse({ packageName: 'test', packageRoot: '/tmp', cliExtensions: { description: 'test', entryPoint: 'test', commands: tooMany } });
  assert.equal(plugin.success, false);
  assert.equal(plugin.error.issues[0].code, 'too_big');
  const command = { name: 'test', title: 'test', environments: ['cli'], parameters: tooMany };
  for (const oversized of [command, { ...command, environments: Array(1001).fill('cli'), parameters: [] }]) {
    const result = PluginSchema.safeParse({ packageName: 'test', packageRoot: '/tmp', cliExtensions: { description: 'test', entryPoint: 'test', commands: [oversized] } });
    assert.equal(result.success, false);
    assert.equal(result.error.issues[0].code, 'too_big');
  }
});

test('normal Expo plugin inputs remain valid', () => {
  const path = require('node:path');
  const cli = path.dirname(require.resolve('@expo/cli/package.json', { paths: [path.dirname(require.resolve('expo/package.json'))] }));
  const { PluginSchema, DevToolsPluginOutputSchema } = require(path.join(cli, 'build/src/start/server/DevToolsPlugin.schema.js'));
  assert.equal(DevToolsPluginOutputSchema.safeParse([{ type: 'text', text: 'hello', level: 'info' }]).success, true);
  assert.equal(PluginSchema.safeParse({ packageName: 'test', packageRoot: '/tmp', cliExtensions: { description: 'test', entryPoint: 'test', commands: [{ name: 'hello', title: 'Hello', environments: ['cli'], parameters: [] }] } }).success, true);
});

test('ES modules reject oversized bounded arrays and exact lengths', async () => {
  const { z: esm } = await import('zod');
  let visits = 0;
  const schema = esm.array(esm.number().superRefine(() => { visits++; })).length(1);
  assert.equal((await schema.safeParseAsync([1, 2])).success, false);
  assert.equal(visits, 0);
  assert.equal(schema.safeParse([1]).success, true);
});
