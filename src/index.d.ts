import { Plugin } from 'vite';

interface PluginConfig {
  /**
   * Theme
   * - "fix-right": default, progress info panel fix in right
   * - "middle": display in a flat layout on the page, not fixed
   */
  theme?: string;
  /**
   * Custom progress info panel css inline-style, > theme config
   */
  style?: string;
}

declare function devServerWhiteScreenProgress(config?: PluginConfig): Plugin;

export default devServerWhiteScreenProgress;