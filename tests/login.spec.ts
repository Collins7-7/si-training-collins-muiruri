import { test, expect } from '@playwright/test';
import { customer } from '../test-data/users';

const wrongPassword = 'not-the-password';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practicesoftwaretesting.com/auth/login');
  });

  test('customer can log in', async ({ page }) => {
    await page.getByLabel('Email address').fill(customer.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(customer.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'My account' })).toBeVisible();
  });

  test('wrong password shows an error', async ({ page }) => {
    await page.getByLabel('Email address').fill(customer.email);
    await page.getByRole('textbox', { name: 'Password' }).fill(wrongPassword);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Invalid email or password', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });

  test('empty email shows a validation message', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Password' }).fill(customer.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByText('Email is required', { exact: true })).toBeVisible();
    await expect(page.getByLabel('Email address')).toHaveAttribute('aria-invalid', 'true');
  });
});