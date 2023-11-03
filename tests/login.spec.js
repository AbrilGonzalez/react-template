import { faker } from '@faker-js/faker';
const { test, expect } = require('@playwright/test');
// const { projects, timeout } = require('../playwright.config');
// const { Link } = require('react-router-dom');
import dotenv from 'dotenv'
dotenv.config({
  path:'.env'
})


// const randomEmail = faker.internet.email(); // jugador.test@emerald.dev


// Parametros para
// Sign Up/
const p_SignUp= [
  {
    name: 'Jugador',
    mail:faker.internet.email({
      firstName: 'testJ', 
      lastName: 'test', 
      provider:'emerald.dev',
      allowSpecialCharacters: false}),
    pwd: '12345678',
    organizador: "page.getByRole('heading',{name:'Organizador'})",
    dialog: "page.getByText('El correo ya ha sido registrado')"
   
  },
  {
    name: 'Organizador',
    mail:faker.internet.email({
      firstName:'testO', 
      lastName: 'test', 
      provider:'emerald.dev',
      allowSpecialCharacters:false}), 
    pwd: '12345678',
  
    organizador: "page.getByRole('heading',{name:'Organizador'})",
    dialog: "page.getByText('El correo ya ha sido registrado')"
  },
]
  // Entradas No Validas
  const p_SignUpNoValido= [
  {
    name: 'No-mail',
    mail: '', 
    pwd: '12345678',
    organizador: "page.getByRole('div',{name:/Crea una cuenta/i})",
    dialog:"page.getByText('Email invalido')"
  },
  {
    name: 'ya Existe',
    mail: 'jugador.cuenta@emerald.com', 
    pwd: '12345678',
  },
]

const p_SignIn=[
  {
    name: 'Jugador',
    mail: 'jugador.cuenta@emerald.com', 
    pwd: '12345678',
    expect_:/.*\/inicio/
   
  },
  {
    name: 'Organizador',
    mail: 'organizador.cuenta@emerald.com', 
    pwd: '12345678',
    expect_:/.*\/inicio/
  },
  // Entradas no Válidas
  {
    name: 'No-email',
    mail: '', 
    pwd: '12345678',
    expect_:/.*\/signin/
  },

]
  // Sign Up 
p_SignUp.forEach(data => {
test('Sign Up ' +" " + (data.name), async ({ page}) => {
  await page.goto(process.env.BASE_URL + '/signup');
  await page
    .getByTestId('inputCorreo').fill(data.mail);
  await page
    .getByTestId('inputPassword').fill(data.pwd);
  // await page.getByTestId('Crear cuenta').click();
  await page.getByRole('button', {name:'Crear cuenta'}).click();

  const content = page.getByRole('heading',{name:'Organizador'});
  const dialog = page.getByText('El correo ya ha sido registrado');
  await expect(content.or(dialog)).toBeVisible();
});
});

p_SignUpNoValido.forEach(data => {
test('Sign Up - ' +" " + (data.name), async ({ page}) => {
  await page.goto(process.env.BASE_URL + '/signup');
  await page
    .getByTestId('inputCorreo').fill(data.mail);
  await page
    .getByTestId('inputPassword').fill(data.pwd);
  // await page.getByTestId('Crear cuenta').click();
  await page.getByRole('button', {name:'Crear cuenta'}).click()

  const alert = page.getByText('El correo ya ha sido registrado');
  const dialog = page.getByText('Email invalido');
  await expect(alert.or(dialog)).toBeVisible();
  // await expect(((data.organizador).or(data.dialog))).toBeVisible();
});
});

  // Sign In
  p_SignIn.forEach(data =>{
test('Sign In' +" " + (data.name), async ({ page }) => {
  await page.goto(process.env.BASE_URL + '/signin',{timeout:40000}); 
  await page
    .getByTestId('inputCorreo').fill(data.mail);
  await page
    .getByTestId('inputPassword').fill(data.pwd);
  await page
  await page.getByTestId('iniciarSesion').click();
  await expect(page).toHaveURL(data.expect_);
});
});

test('Sign In Facebook', async ({ page }) => {
  await page.goto(process.env.BASE_URL + '/signin');
  await page.getByTestId('signinFacebook').click();
  const facebookI = page.getByText('Log Into Facebook');
  const facebookII = page.getByText('Iniciar sesión en Facebook');
  await expect(facebookI.or(facebookII)).toBeVisible();
});
test('Sign In Google', async ({ page }) => {
  await page.goto(process.env.BASE_URL + '/signin');
  await page.getByTestId('signinGoogle').click();
  const googleI = page.getByText('Sign In with Google');
  const googleII = page.getByText('Iniciar sesión con Google');
  await expect(googleI.or(googleII)).toBeVisible();
});


