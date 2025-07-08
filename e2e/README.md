# CelebrationSHARE E2E Testing with Playwright

## Prerequisites
- Node.js (v16+ recommended)
- Your app running locally (e.g., `npm run dev`)

## 1. Install Playwright

```
npm install --save-dev @playwright/test
npx playwright install
```

## 2. Folder Structure
Place the test file (`e2e.spec.ts`) in a folder named `e2e` or `tests` at your project root.

## 3. Run the Tests

### Desktop and Mobile (all in one go):
```
npx playwright test e2e/e2e.spec.ts
```

### Only Mobile:
```
npx playwright test e2e/e2e.spec.ts --project="Mobile"
```

### Only Desktop:
```
npx playwright test e2e/e2e.spec.ts --project="Desktop"
```

## 4. What to Expect
- The script will open browsers, click through your app, and check for success messages.
- If a step fails, Playwright will show an error and a screenshot.
- You can view detailed reports with:
  ```
  npx playwright show-report
  ```

## 5. Troubleshooting
- Make sure your app is running at the correct URL (default: http://localhost:5173).
- If ports differ, update `baseURL` in the test script.
- If selectors change, update the test script to match your new `data-testid` values.

## 6. Customizing
- You can add more tests or adjust test data as needed.
- For advanced usage, see the [Playwright docs](https://playwright.dev/). 
   npx playwright test
   