const { test, expect } = require('@playwright/test');
const { projects, timeout } = require('../playwright.config');
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({
  path: '.env'
})

test('Login_jugador', async ({ page }) => {
  await page.goto(process.env.BASE_URL + '/signin/')
  await page.getByTestId('inputCorreo').fill(process.env.EMAIL_JUGADOR)
  await page.getByTestId('inputPassword').fill(process.env.LOGIN_PWD)
  await page.getByTestId('iniciarSesion').click()
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveURL(/.*\/success/)
  await page.context().storageState({ path: "auth_j.json" })
  // await browser.close();
})

test('Login_organizador', async ({ page }) => {
  await page.goto(process.env.BASE_URL + '/signin/')
  await page.getByTestId('inputCorreo').fill(process.env.EMAIL_ORGANIZADOR)
  await page.getByTestId('inputPassword').fill(process.env.LOGIN_PWD)
  await page.getByTestId('iniciarSesion').click()
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveURL(/.*\/success/)
  await page.context().storageState({ path: "auth.json" })
  // await browser.close();
})
