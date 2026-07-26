// Local UI test runner.
//
// Lets a tester paste JSON test data into a web form, click "Run Test",
// and see a pass/fail result — instead of editing users.json or code.
//
// Usage:
//   npm run ui-runner
//   then open http://localhost:4000
//
// How it works:
//   1. The browser posts { email, password, fullName? } to /api/run-login-test
//   2. This server spawns `npx playwright test tests/web/login.spec.ts`
//      with that JSON injected via the RUNTIME_TEST_USER env var.
//   3. data/runtimeUser.ts picks it up and the spec runs exactly as it
//      would from the CLI — no code path is UI-specific.
//   4. The JSON reporter output is parsed and summarized back to the UI.

const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const os = require('os');

const app = express();
const PORT = process.env.UI_RUNNER_PORT || 4000;
const PROJECT_ROOT = path.resolve(__dirname, '..');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/run-login-test', (req, res) => {
  const { email, password, fullName } = req.body || {};

  if (typeof email !== 'string' || !email) {
    return res.status(400).json({ error: 'Missing or invalid "email" field.' });
  }
  if (typeof password !== 'string' || !password) {
    return res.status(400).json({ error: 'Missing or invalid "password" field.' });
  }

  const payload = JSON.stringify({ email, password, fullName });

  // Unique report file per run so concurrent runs don't clobber each other.
  const reportFile = path.join(
    os.tmpdir(),
    `ui-runner-report-${Date.now()}-${Math.round(Math.random() * 1e6)}.json`
  );

  const child = spawn(
    'npx',
    [
      'playwright',
      'test',
      'tests/web/login.spec.ts',
      '--project=web',
      '--reporter=json',
    ],
    {
      cwd: PROJECT_ROOT,
      env: {
        ...process.env,
        RUNTIME_TEST_USER: payload,
        PLAYWRIGHT_JSON_OUTPUT_NAME: reportFile,
      },
      shell: true,
    }
  );

  let stderr = '';
  child.stderr.on('data', (chunk) => { stderr += chunk.toString(); });

  child.on('close', () => {
    try {
      if (!fs.existsSync(reportFile)) {
        return res.status(500).json({
          error: 'Playwright did not produce a report. Raw stderr below.',
          stderr,
        });
      }

      const report = JSON.parse(fs.readFileSync(reportFile, 'utf-8'));
      fs.unlinkSync(reportFile);

      const results = [];
      for (const suite of report.suites ?? []) {
        collectResults(suite, results);
      }

      const summary = {
        total: results.length,
        passed: results.filter((r) => r.status === 'passed').length,
        failed: results.filter((r) => r.status !== 'passed').length,
        tests: results,
      };

      res.json(summary);
    } catch (err) {
      res.status(500).json({ error: `Failed to parse test results: ${err.message}`, stderr });
    }
  });
});

function collectResults(suite, out) {
  for (const spec of suite.specs ?? []) {
    for (const test of spec.tests ?? []) {
      const outcome = test.results?.[0];
      out.push({
        title: spec.title,
        status: outcome?.status ?? test.status ?? 'unknown',
        error: outcome?.error?.message ?? null,
        durationMs: outcome?.duration ?? null,
      });
    }
  }
  for (const nested of suite.suites ?? []) {
    collectResults(nested, out);
  }
}

app.listen(PORT, () => {
  console.log(`UI test runner ready: http://localhost:${PORT}`);
});
