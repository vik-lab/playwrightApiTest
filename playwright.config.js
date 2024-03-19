import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    // All requests we send go to this API endpoint.
    //baseURL: 'https://petstore.swagger.io/v2/',
    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      'Accept': 'application/json',
      //reporter: [['html', { open: 'never' }]],
      // Add authorization token to all requests.
      // Assuming personal access token available in the environment.
      //'Authorization': `token ${process.env.API_TOKEN}`,
    },
  }
});