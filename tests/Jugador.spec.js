import dotenv from 'dotenv'
dotenv.config({
  path: '.env'
})
const { test, expect } = require('@playwright/test');

// test('Login', async ({ page }) => {
//   await page.goto(process.env.BASE_URL + '/signin/')
//   await page.getByTestId('inputCorreo').fill(process.env.EMAIL_JUGADOR)
//   await page.getByTestId('inputPassword').fill(process.env.LOGIN_PWD)
//   await page.getByTestId('iniciarSesion').click()
//   await expect(page).toHaveURL(/.*success/)
//   await page.context().storageState({ path: './auth_j.json' })
// })

//test.use({ storageState: 'auth_j.json' });

test('Inicio - Editar Perfil', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'auth_j.json' })
  const page = await context.newPage()
  await page.goto(process.env.BASE_URL + '/success/inicio')
  // await page.waitForTimeout(2000);
  await page.waitForLoadState('networkidle')
  await page.getByTestId('editarDatos').click()
  await page.getByTestId('cancelar').click()
})
test.describe.serial('group', () => {
  test('Mis Datos', async ({ browser }) => {
    test.slow()
    const context = await browser.newContext({ storageState: 'auth_j.json' })
    const page = await context.newPage()
    await page.goto(process.env.BASE_URL + '/success/registerFormPlayer')
    // if No tienes datos registrados.
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'Añadir información' }).click()
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
    await page.getByTestId('seleccionarEquipo').click()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.waitForTimeout(2000)
    await page.getByTestId('seleccionarPosicion').click()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.getByPlaceholder('Selecciona alguna').click()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await page.getByTestId('inputNumero').fill('5')
    await page.getByTestId('seleccionarRol').click()
    await page.getByTestId('seleccionarRol').selectOption({ index: 1 })
    await page.waitForLoadState('networkidle')
    await page.getByTestId('guardarJugador').click()
    // await page.waitUntil('commit')
    await page.waitForTimeout(2000)
    await expect(page.getByText('Eliminar Datos')).toBeVisible()
  })
})

test('Resultados competencias', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'auth_j.json' })
  const page = await context.newPage()
  const tableResultados = page.getByText('Fecha 1')
  const dialog = page.getByText('Selecciona una competencia para mostrar los resultados')
  await page.goto(process.env.BASE_URL + '/success/resultsCompetitions')
  await page.waitForTimeout(2000)
  await page.getByPlaceholder('Seleccione una competencia').click()
  await page.keyboard.press('ArrowDown')
  await page.keyboard.press('Enter')
  await expect(tableResultados.or(dialog)).toBeVisible()
})

test('Tabla de Posiciones', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'auth_j.json' })
  const page = await context.newPage()
  await page.goto(process.env.BASE_URL + '/success/tablePositions')
  await page.waitForTimeout(2000)
  await page.getByTestId('labelSelectCompetition').selectOption({ index: 1 })
  const tablePositions = page.getByTestId('groupTableRows')
  const dialog = page.getByText('Aún no tiene tabla de posiciones')
  await expect(tablePositions.or(dialog)).toBeVisible()
})
