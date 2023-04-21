// cypress.config.js
import { defineConfig } from 'cypress';
import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import createEsbuildPlugin from '@badeball/cypress-cucumber-preprocessor/esbuild';

const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');

export default defineConfig({
  experimentalFetchPolyfill: false,
  chromeWebSecurity: false,
  viewportWidth: 1200,
  viewportHeight: 800,
  videoUploadOnPasses: false,
  e2e: {
    specPattern: 'cypress/e2e/**/*.feature',
    async setupNodeEvents(
      on: Cypress.PluginEvents,
      config: Cypress.PluginConfigOptions
    ): Promise<Cypress.PluginConfigOptions> {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      await addCucumberPreprocessorPlugin(on, config);

      on(
        'file:preprocessor',
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Make sure to return the config object as it might have been modified by the plugin.
      return config;
    },
  },
});
