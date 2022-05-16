import { browser,by,element } from "protractor";

export class LoginPage{
    private credentials = {
        username: 'explorer2@gmail.com',
        password: 'explorer'
    };

    navigateTo(){
        return browser.get('/login');
    }

    fillCredentials(){
        const buttonSelector = 'body > div > div > div > app-login > form > div:nth-child(3) > div > button';
        
        element(by.css('#email')).sendKeys(this.credentials.username);
        element(by.css('#pwd')).sendKeys(this.credentials.password);

        element(by.css(buttonSelector)).click();
    }
}