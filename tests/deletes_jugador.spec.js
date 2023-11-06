const { test, expect } = require('@playwright/test');
const { projects, timeout } = require('../playwright.config');
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';


dotenv.config({
  path: '.env'
})


// Deletes
test('Login', async ({ page }) => {
  await page.goto(process.env.BASE_URL + '/signin/')
  await page.getByTestId('inputCorreo').fill(process.env.EMAIL_JUGADOR)
  await page.getByTestId('inputPassword').fill(process.env.LOGIN_PWD)
  await page.getByTestId('iniciarSesion').click()
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveURL(/.*\/success/)
  await page.context().storageState({ path: "auth_j.json" })
  // await browser.close();
})

test('Eliminar jugador', async ({ browser }) => {
  const context = await browser.newContext({ storageState: "auth_j.json" })
  const page = await context.newPage()
  test.slow()
  await page.goto(process.env.BASE_URL + '/success/registerFormPlayer/')
  await page.waitForLoadState('networkidle')
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`)
    dialog.accept().catch(() => {})
  })
  await page.getByTestId('deletePlayer').click()
  await page.waitForLoadState('networkidle')
  await expect(page.getByText('No tienes datos registrados')).toBeVisible()
})
// test('delete fixture', async ({ browser }) => {
//   const context = await browser.newContext({storageState: "auth.json"});
//   const page = await context.newPage();
//   await page.goto('http://localhost:3007/success/myCompetitions')
//   await page.getByTestId('butonAdmin0').click();
//   await page.getByRole('link', { name: 'Fixture' }).click()
//   page.once('dialog', dialog => {
//     console.log(`Dialog message: ${dialog.message()}`);
//     dialog.accept().catch(() => {});
//   });
//   await page.getByTestId('butonDeleteEnable').click();
// });
// })
