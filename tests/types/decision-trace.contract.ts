import type { DecisionStep, DecisionSteps } from '../../src/components/brand/cinematic-contracts';

const change: DecisionStep = { label: 'Change', title: 'Frame', signal: 'change' };
const intelligence: DecisionStep = { label: 'Intelligence', title: 'Decide', signal: 'intelligence' };
const outcome: DecisionStep = { label: 'Outcome', title: 'Deliver', signal: 'outcome' };

const valid: DecisionSteps = [change, intelligence, outcome];

// @ts-expect-error DecisionTrace requires exactly three steps.
const invalidLength: DecisionSteps = [change, intelligence];

// @ts-expect-error DecisionTrace accepts only the three cinematic signals.
const invalidSignal: DecisionStep = { label: 'Other', title: 'Other', signal: 'other' };

void valid;
void invalidLength;
void invalidSignal;
