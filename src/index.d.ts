import { Plugin } from 'vite';

interface PluginConfig {
  /**
   * Theme
   * - "fixed-simple": default, fixed in right, simple info
   * - "fixed": fixed in right, more info 
   * - "normal": display in a flat layout on the page, not fixed
   */
  theme?: string;
  /**
   * Custom progress info panel css inline-style, > theme config
   */
  style?: string;
}

declare function devServerWhiteScreenProgress(config?: PluginConfig): Plugin;

export default devServerWhiteScreenProgress;