import assert from 'node:assert/strict';
import { compareFinancialVersions } from '@x12i/financial-diff';
const accountKey = { entityId: 'demo', ledgerId: 'general', chartId: 'demo-chart', accountId: 'cash' };
const row = { accountKey, bookCurrency: 'USD', netActivity: '10.00', adjustedClosing: '110.00' };
const comparison = { schemaVersion: '1.0', before: { label: 'before', basis: 'source_as_reported', rows: [row] },
  after: { label: 'after', basis: 'source_as_reported', rows: [{ ...row, netActivity: '15.00', adjustedClosing: '115.00' }] } };
const result = compareFinancialVersions(comparison);
assert.equal(Number(result.data.totalDelta), 5);
assert(result.data.differences.some(item => item.field === 'netActivity'));
console.log(result.data);
