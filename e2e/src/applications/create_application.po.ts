import { browser,by,element } from "protractor";

export class CreateApplicationPage{

    getTitleText(){
        const titleSelector = 'body > div > div > div > app-application-create > div > h3';
        return element(by.css(titleSelector)).getText();
    }


    createApplication(comment: string){
        let buttonSelector = 'body > div > div > div > app-application-create > div > form > fieldset > div.buttons > button:nth-child(2)';

        let commentSelector = '#comments';

        element(by.css(commentSelector)).sendKeys(comment);

        return element(by.css(buttonSelector)).click();
    }


}