import dotenv from 'dotenv';
const { test, expect } = require('@playwright/test');
// const { projects, timeout } = require('../playwright.config');
// import { defineConfig } from '@playwright/test';



dotenv.config({
  path: '.env'
})


// Deletes
test('Login', async ({ page }) => {
  await page.goto(process.env.BASE_URL + '/signin/')
  await page.getByTestId('inputCorreo').fill(process.env.EMAIL_ORGANIZADOR)
  await page.getByTestId('inputPassword').fill(process.env.LOGIN_PWD)
  await page.getByTestId('iniciarSesion').click()
  await page.waitForLoadState('networkidle')
  await expect(page).toHaveURL(/.*\/success/)
  await page.context().storageState({ path: "auth.json" })
  // await browser.close();
})

test('eliminar Canchas', async ({ browser }) => {
  const context = await browser.newContext({ storageState: "auth.json" })
  const page = await context.newPage()
  await page.goto(process.env.BASE_URL + '/success/myCompetitions')
  await page.getByTestId('bodyCard0').click()
  await page.goto(process.env.BASE_URL + '/success/registerFormCourt')
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`)
    dialog.accept().catch(() => {})
  })
  await page.getByTestId('deleteCourt').first().click()
  await expect(page.getByTestId('deleteCourt').first()).not.toBeVisible()
})
test('eliminar equipo(s)', async ({ browser }) => {
  const context = await browser.newContext({ storageState: "auth.json" })
  const page = await context.newPage()
  await page.goto(process.env.BASE_URL + '/success/inicio')
  await page.getByTestId('bodyCard0').click()
  await page.getByRole('link', { name: 'Equipos' }).click()
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`)
    dialog.accept().catch(() => {})
  })
  await page.getByTestId('EliminarEquipo').first().click()
  await page.waitForTimeout(2000)

  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`)
    dialog.accept().catch(() => {})
  })
  await page.getByTestId('EliminarEquipo').last().click()
  await page.waitForTimeout(2000)

  await expect(page.getByText('No tiene equipos registrados')).toBeVisible()
})

test('delete fixture', async ({ browser }) => {
  const context = await browser.newContext({ storageState: "auth.json" })
  const page = await context.newPage()
  await page.goto(process.env.BASE_URL + '/success/inicio')
  await page.getByTestId('bodyCard0').click()
  await page.goto(process.env.BASE_URL + '/success/generarFixture')
  await expect(page.getByText('Aún no ha generado una liga')).toBeVisible()
})
