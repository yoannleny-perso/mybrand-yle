export type CinematicSignal = 'change' | 'intelligence' | 'outcome';
export type SignalShape = 'square' | 'diamond' | 'circle';

export const SIGNAL_SHAPES: Readonly<Record<CinematicSignal, SignalShape>> = {
  change: 'square',
  intelligence: 'diamond',
  outcome: 'circle',
};

export interface DecisionStep {
  label: string;
  title: string;
  signal: CinematicSignal;
}

export type DecisionSteps = [DecisionStep, DecisionStep, DecisionStep];
