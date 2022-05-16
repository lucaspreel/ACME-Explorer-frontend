import { browser } from 'protractor';
import { AppPage } from './app.po';
import { ApplicationPage } from './applications/applications.po';
import { CreateApplicationPage } from './applications/create_application.po';
import { LoginPage } from './login/login.po';
import { TripPage } from './trips/trip.po';

describe('workspace-project App', () => {
  let page: AppPage;
  let login: LoginPage;
  let trips: TripPage;
  let createApplication: CreateApplicationPage;
  let application: ApplicationPage;

  beforeEach(() => {
    page = new AppPage();
    login = new LoginPage();
    trips = new TripPage();
    createApplication = new CreateApplicationPage;
    application = new ApplicationPage;
  });

  it('apply for a trip', () => {
    //Realizar login
    login.navigateTo();
    login.fillCredentials();
    browser.sleep(1000);

    //navegar a pagina de trips
    trips.navigateTo();
    browser.sleep(1000);

    //comrpobar que esta en la pagina trips
    expect(trips.getTitleText()).toEqual('Trips');

    //Presionar primer boton apply
    trips.getPressFirstApply();
    browser.sleep(1000);

    //comrpobar que esta en la pagina crear aplicacion
    expect(createApplication.getTitleText()).toEqual('Create application');

    const comment =  'Comentario de prueba';
    // Crear aplicacion
    createApplication.createApplication(comment);
    browser.sleep(1000);

    //comrpobar que esta en la pagina aplicaiones
    expect(application.getTableText()).toEqual('Application date');

    // comrpobar que se creo correctamente la aplicación
    expect(application.getElementInList()).toContain(comment);
  });

});
