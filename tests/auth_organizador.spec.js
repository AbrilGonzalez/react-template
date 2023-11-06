// import { defineConfig } from '@playwright/test';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';
// import { max } from 'moment/moment';
const { test, expect } = require('@playwright/test');
// const { projects, timeout } = require('../playwright.config');


// import simbolo from "./images/Simbolo.png";

dotenv.config({
  path:'.env'
}) 

// Faker imports
const randomWord = faker.lorem.word(5);



const p_Equipos = [
  {
    name: 'Equipo I',
    equipo: 'Equipo I Test',
  },
  {
    name: 'Equipo II',
    equipo: 'Equipo II Test',
  },
]

const cancha = 'Cancha Test' + ' ' + randomWord
const Torneo = 'Torneo Test' + ' ' + randomWord
// const filePath0 = './tests/images/Simbolo.png'

test('Jugadores', async ({ browser }) => {
  const context = await browser.newContext({ storageState: 'auth.json'})
  const page = await context.newPage()
  await page.goto(process.env.BASE_URL + '/success/players')
  await expect(page.getByText('Recientes')).toBeVisible()
})

test.describe.serial('All',()=> {


test.describe.serial('group Jugador',()=> {

})

test.describe.serial('group Equipos', () => {
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
  test('Registrar Torneo', async ({ browser }) => {
    const context = await browser.newContext({ storageState: "auth.json" })
    const page = await context.newPage()
    await page.goto(process.env.BASE_URL + '/success/myCompetitions')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'Crear torneo' }).click()
    await page.waitForLoadState("domcontentloaded")
    // await page.goto('http://localhost:3007/success/myCompetitions/registerFormCompetition');
    await page.getByTestId('inputNombreCompetencia').fill(Torneo)
    await page.waitForTimeout(2000)
    await page.getByTestId('selectFormatoCompetencia').selectOption({ index: 1 })
    await page.getByTestId('selectRulesOptions').selectOption({ index: 1 })
    await page.getByTestId('inputFechaInicio').fill('2023-07-14')
    await page.getByTestId('inputFechaFin').fill('2023-07-15')
    await page.waitForTimeout(2000)
    await page.getByTestId('añadirCompetencia').click()
    await expect(page.getByText(Torneo).first()).toBeVisible()
  })
  p_Equipos.forEach(data => {
    // test('Sign Up ' +" " + (data.name), async ({ page}) => {
    test('Registrar equipo' + " " + (data.name), async ({ browser }) => {
      // test.slow()
      // await expect(async () => {
      const context = await browser.newContext({ storageState: "auth.json" })
      const page = await context.newPage()
      // await context.tracing.start({ screenshots: true, snapshots: true });
      await page.goto(process.env.BASE_URL + '/success/inicio')
      await page.waitForLoadState('networkidle')
      await page.waitForTimeout(2000)
      await page.getByTestId('bodyCard0').click()
      await page.getByRole('link', { name: 'Equipos' }).click()
      // await page.waitForLoadState('networkidle');
      await page.waitForLoadState('domcontentloaded')
      await page.getByRole('button', { name: 'Agregar equipo' }).click({ force: true })
      await page.waitForLoadState('networkidle')
      await page.waitForLoadState('domcontentloaded')
      await page.getByTestId('inputEquipo').fill(data.equipo)
      await page.waitForLoadState('domcontentloaded')
      await page.waitForLoadState('networkidle')
      await page.getByTestId('seleccionEstatus').click()
      await page.getByTestId('seleccionEstatus').selectOption({ index: 1 })
      await page.waitForTimeout(2000)

      // page.on("filechooser", async(filechooser) =>{
      //   const but = await page.getByTestId('inputImagen');
      //   await page.setInputFiles("input[name='team-log']", filePath0);
      // })

      // await page.getByTestId('inputImagen').click();
      await page.waitForTimeout(3000)
      await page.waitForLoadState('networkidle')
      //  await expect(async () => {
      await page.getByRole('button', {name:'Añadir' }).click()
      await page.waitForTimeout(3000)
      await expect(page.getByText(data.equipo).first()).toBeVisible()
      // }).toPass();
    })
  })

  

  test('Editar equipo', async ({ browser }) => {
    const context = await browser.newContext({ storageState: "auth.json"})
    const page = await context.newPage()
    await page.goto(process.env.BASE_URL + '/success/inicio')
    await page.getByTestId('bodyCard0').click()
    await page.getByRole('link', { name: 'Equipos' }).click()
    // await page.waitForSelector('#editEquipo');
    await page.waitForLoadState('domcontentloaded')
    await page.waitForLoadState('networkidle')
    await page.getByTestId('editarEquipo').nth(0).click()
    await page.getByTestId('inputEquipo').fill('Equipo editado')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', {name:'Editar'}).click()
    await page.waitForTimeout(3000)
    await expect(page.getByText('Equipo editado').first()).toBeVisible()
    // await context.tracing.stop({ path: 'trace.zip' });
  })

  // test.describe.serial('group Fixture',()=> {
  test('Fixture', async ({ browser }) => {
    // Generar Fixture
    const context = await browser.newContext({ storageState: "auth.json" })
    const page = await context.newPage()
    // await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto(process.env.BASE_URL + '/success/inicio')
    await page.getByTestId('bodyCard0').click()
    await page.getByRole('link', { name: 'Fixture' }).click()
    // await page.waitForLoadState('domcontentloaded');
    await page.waitForLoadState('networkidle')
    // await page.waitForTimeout(2000);
    await page.getByTestId('generarFixturLiga').click()
    await page.getByTestId('headerLiga').click()
    await expect(page.getByTestId('headerLiga')).toBeVisible()
    // await context.tracing.stop({ path: 'trace.zip' });
    await page.pause()
  })

  // Resultados
  test('Resultados', async ({ browser }) => {
    const context = await browser.newContext({ storageState: "auth.json" })
    const page = await context.newPage()
    // await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto(process.env.BASE_URL + '/success/inicio')
    await page.getByTestId('bodyCard0').click()
    await page.getByRole('link',{ name: 'Resultados' }).click()
    await page.waitForLoadState('networkidle')
    await page.getByTestId('registrarResultado').first().click()
    await page.getByTestId('inputPuntosLocal').fill('2')
    await page.waitForLoadState('networkidle')
    await page.getByTestId('inputPuntosVisitante').fill('3')
    await page.getByTestId('guardarResultados').click()
    await expect(page.getByTestId('registrarResultado').first()).toHaveText('Editar resultado')
    // await context.tracing.stop({ path: 'trace.zip' });
  })

  // Muestra Tabla de posiciones
  test('Posiciones', async ({ browser }) => {
    const context = await browser.newContext({ storageState: "auth.json" })
    const page = await context.newPage()
    // await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto(process.env.BASE_URL + '/success/inicio')
    await page.getByTestId('bodyCard0').click()
    await page.goto(process.env.BASE_URL + '/success/tablePositions')
    //  await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000)
    await expect(page.getByTestId('structureTable')).toBeVisible()
    // await context.tracing.stop({ path: 'trace_poscisiones.zip' });
  })

  // Editar Goles de Jugador y Tarjetas
  test('Editar Goles (Jugador)', async ({ browser }) => {
    const context = await browser.newContext({ storageState: "auth_j.json" })
    const page = await context.newPage()
    const dialog = page.getByText('El equipo visitante no tiene jugadores registrados')
    const element = page.getByTestId('inputGolesVisitante0')
    // await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto(process.env.BASE_URL + '/success/registerFormPlayer')
    await page.waitForLoadState('networkidle')
    await page.getByTestId('editPlayer').click()
    await page.getByTestId('seleccionarEquipo').selectOption({ label: 'Equipo II Test' })
    // browser.close()
    await page.waitForTimeout(2000)

    await page.goto(process.env.BASE_URL + '/signin/')
    await page.getByTestId('inputCorreo').fill(process.env.EMAIL_ORGANIZADOR)
    await page.getByTestId('inputPassword').fill(process.env.LOGIN_PWD)
    await page.getByTestId('iniciarSesion').click()
    await page.waitForLoadState('networkidle')
    await page.goto(process.env.BASE_URL + '/success/inicio')
    await page.getByTestId('bodyCard0').click()
    await page.waitForLoadState('networkidle')
    await page.goto(process.env.BASE_URL + '/success/registerResult')
    await page.getByTestId('registrarResultado').first().click()
    await expect(element.or(dialog)).toBeVisible()
  })
})

test.describe.serial('group Cancha', () => {
  test('Registrar Cancha', async ({ browser }) => {
    const context = await browser.newContext({ storageState: "auth.json" })
    const page = await context.newPage()
    // await context.tracing.start({ screenshots: true, snapshots: true });
    await page.goto(process.env.BASE_URL + '/success/inicio')
    await page.getByTestId('bodyCard0').click()
    await page.getByRole('link', { name: 'Canchas' }).click()
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: 'Agregar cancha' }).click({ force: true })
    // await page.getByTestId('inputCancha').fill('Nueva Cancha test');
    await page.getByTestId('inputCancha').fill(cancha)
    await page.getByTestId('inputDescripcion').fill('Cancha de Soccer')

    await page.waitForTimeout(2000)
    await page.getByTestId('añadirCancha').click()
    // await page.waitForTimeout(2000);
    await expect(page.getByText('Court added successfully')).toBeVisible()
    await page.waitForTimeout(2000)
    await page.waitForLoadState('domcontentloaded')
    // await expect(page.getByText('deleteCourt')).toBeVisible();
    await expect(page.getByText(cancha)).toBeVisible()
    await page.pause()
    // await context.tracing.stop({ path: 'trace_Rcancha.zip' });
    // await expect(page.getByTestId('editCourt')).toBeVisible();
  })
})

test.describe.serial('Eliminar', () => {
  test.afterAll(async () => {
    console.log('Done with tests Organizador')
    // ...
  })
})

//Deletes Here

})//Group All