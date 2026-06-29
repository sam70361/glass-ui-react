import { DATA_PALETTE } from 'src/theme/palette';

export interface Provider {
  id: string;
  name: string;
  letter: string;
  color: string;
  key: string;
  models: number;
  used: number;
  quota: number;
  enabled: boolean;
}

export const PROVIDERS: Provider[] = [
  { id: 'openai', name: 'OpenAI', letter: 'O', color: DATA_PALETTE.emerald, key: 'sk-proj-7Hk2...9Fb1', models: 6, used: 4820, quota: 10000, enabled: true },
  { id: 'anthropic', name: 'Anthropic', letter: 'A', color: DATA_PALETTE.amber, key: 'sk-ant-3Df8...2Kc9', models: 4, used: 2310, quota: 8000, enabled: true },
  { id: 'google', name: 'Google Gemini', letter: 'G', color: DATA_PALETTE.cyan, key: 'AIza...Xy7Q', models: 3, used: 980, quota: 5000, enabled: false },
  { id: 'local', name: '本地 / Ollama', letter: 'L', color: DATA_PALETTE.violet, key: 'http://localhost:11434', models: 5, used: 0, quota: 0, enabled: true },
];
