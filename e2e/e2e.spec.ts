import { test, expect, devices } from '@playwright/test';

const baseURL = 'http://localhost:5173'; // Change if running on a different port

const testUser = {
  email: 'testuser@example.com',
  password: 'TestPassword123!',
  firstName: 'Test',
  lastName: 'User',
  phone: '555-123-4567',
  birthday: '2000-01-01',
};

const testItem = {
  title: 'Test Party Tent',
  category: 'Tents',
  description: 'A great tent for any celebration!',
  dailyRate: '25',
  weeklyRate: '100',
};

test.describe('CelebrationSHARE E2E - Desktop', () => {
  test('Full user journey', async ({ page }) => {
    await page.goto(baseURL);
    // Sign Up
    await page.click('[data-testid="signup-link"]');
    await page.fill('[data-testid="signup-first-name"]', testUser.firstName);
    await page.fill('[data-testid="signup-last-name"]', testUser.lastName);
    await page.fill('[data-testid="signup-email"]', testUser.email);
    await page.fill('[data-testid="signup-phone"]', testUser.phone);
    await page.fill('[data-testid="signup-password"]', testUser.password);
    await page.fill('[data-testid="signup-confirm-password"]', testUser.password);
    await page.fill('[data-testid="signup-birthday"]', testUser.birthday);
    await page.click('[data-testid="signup-user-type-owner"]');
    await page.click('[data-testid="signup-submit"]');
    await expect(page.locator('[data-testid="signup-success"]')).toBeVisible();
    // Login
    await page.click('[data-testid="login-link"]');
    await page.fill('[data-testid="login-email"]', testUser.email);
    await page.fill('[data-testid="login-password"]', testUser.password);
    await page.click('[data-testid="login-submit"]');
    await expect(page.locator('[data-testid="login-success"]')).toBeVisible();
    // List Item
    await page.click('[data-testid="list-item-link"]');
    await page.fill('[data-testid="list-item-title"]', testItem.title);
    await page.selectOption('[data-testid="list-item-category"]', testItem.category);
    await page.fill('[data-testid="list-item-description"]', testItem.description);
    await page.fill('[data-testid="list-item-daily-rate"]', testItem.dailyRate);
    await page.fill('[data-testid="list-item-weekly-rate"]', testItem.weeklyRate);
    // Skipping photo upload for automation
    await page.click('[data-testid="list-item-submit"]');
    await expect(page.locator('[data-testid="list-item-success"]')).toBeVisible();
    // Search & Find Item
    await page.click('[data-testid="browse-link"]');
    await page.fill('[data-testid="search-input"]', testItem.title);
    await page.click('[data-testid="search-button"]');
    await expect(page.locator('[data-testid="item-title"]', { hasText: testItem.title })).toBeVisible();
    // View Item & Book
    await page.click('[data-testid="item-title"]', { hasText: testItem.title });
    await page.click('[data-testid="booking-date-picker"]');
    // Select a date (assume today + 1)
    // This may need adjustment based on your date picker implementation
    await page.click('[data-testid="book-now-button"]');
    await page.click('[data-testid="booking-submit"]');
    await expect(page.locator('[data-testid="booking-success"]')).toBeVisible();
    // Payment
    await page.fill('[data-testid="card-number"]', '4242424242424242');
    await page.fill('[data-testid="card-expiry"]', '12/34');
    await page.fill('[data-testid="card-cvc"]', '123');
    await page.click('[data-testid="pay-button"]');
    await expect(page.locator('[data-testid="payment-success"]')).toBeVisible();
    // Confirmation
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();
    // Chat (if available)
    // await page.click('[data-testid="chat-open"]');
    // await page.fill('[data-testid="chat-input"]', 'Hello, I need help!');
    // await page.click('[data-testid="chat-send"]');
    // await expect(page.locator('[data-testid="chat-message"]', { hasText: 'Hello, I need help!' })).toBeVisible();
  });
});

test.describe('CelebrationSHARE E2E - Mobile', () => {
  test.use({ ...devices['iPhone 12'] });
  test('Full user journey (mobile)', async ({ page }) => {
    await page.goto(baseURL);
    // Mobile Home
    await page.click('[data-testid="mobile-home-signup"]');
    await page.fill('[data-testid="signup-first-name"]', testUser.firstName);
    await page.fill('[data-testid="signup-last-name"]', testUser.lastName);
    await page.fill('[data-testid="signup-email"]', testUser.email);
    await page.fill('[data-testid="signup-phone"]', testUser.phone);
    await page.fill('[data-testid="signup-password"]', testUser.password);
    await page.fill('[data-testid="signup-confirm-password"]', testUser.password);
    await page.fill('[data-testid="signup-birthday"]', testUser.birthday);
    await page.click('[data-testid="signup-user-type-owner"]');
    await page.click('[data-testid="signup-submit"]');
    await expect(page.locator('[data-testid="signup-success"]')).toBeVisible();
    // Login
    await page.click('[data-testid="mobile-home-login"]');
    await page.fill('[data-testid="login-email"]', testUser.email);
    await page.fill('[data-testid="login-password"]', testUser.password);
    await page.click('[data-testid="login-submit"]');
    await expect(page.locator('[data-testid="login-success"]')).toBeVisible();
    // List Item
    await page.click('[data-testid="mobile-header-menu"]');
    await page.click('[data-testid="list-item-link"]');
    await page.fill('[data-testid="list-item-title"]', testItem.title);
    await page.selectOption('[data-testid="list-item-category"]', testItem.category);
    await page.fill('[data-testid="list-item-description"]', testItem.description);
    await page.fill('[data-testid="list-item-daily-rate"]', testItem.dailyRate);
    await page.fill('[data-testid="list-item-weekly-rate"]', testItem.weeklyRate);
    await page.click('[data-testid="list-item-submit"]');
    await expect(page.locator('[data-testid="list-item-success"]')).toBeVisible();
    // Search & Find Item
    await page.click('[data-testid="mobile-home-browse"]');
    await page.fill('[data-testid="mobile-search-input"]', testItem.title);
    await page.click('[data-testid="mobile-search-button"]');
    await expect(page.locator('[data-testid="mobile-item-title"]', { hasText: testItem.title })).toBeVisible();
    // View Item & Book
    await page.click('[data-testid="mobile-item-title"]', { hasText: testItem.title });
    await page.click('[data-testid="booking-date-picker"]');
    await page.click('[data-testid="book-now-button"]');
    await page.click('[data-testid="booking-submit"]');
    await expect(page.locator('[data-testid="booking-success"]')).toBeVisible();
    // Payment
    await page.fill('[data-testid="card-number"]', '4242424242424242');
    await page.fill('[data-testid="card-expiry"]', '12/34');
    await page.fill('[data-testid="card-cvc"]', '123');
    await page.click('[data-testid="pay-button"]');
    await expect(page.locator('[data-testid="payment-success"]')).toBeVisible();
    // Confirmation
    await expect(page.locator('[data-testid="confirmation-message"]')).toBeVisible();
    // Mobile Chat
    // await page.click('[data-testid="mobile-header-menu"]');
    // await page.click('[data-testid="mobile-chat-link"]');
    // await page.fill('[data-testid="mobile-chat-input"]', 'Hello from mobile!');
    // await page.click('[data-testid="mobile-chat-send"]');
    // await expect(page.locator('[data-testid="mobile-chat-message-text"]', { hasText: 'Hello from mobile!' })).toBeVisible();
  });
});
