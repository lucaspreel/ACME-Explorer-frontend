import { browser,by,element } from "protractor";

export class TripPage{

    navigateTo(){
        return browser.get('/trips');
    }

    getPressFirstApply(){
        let buttonSelector = 'body > div > div > div > app-trip-list > main > div.card-deck > div:nth-child(1) > div.card-footer > div > a.btn.btn-primary.pull-left.col-5.ml-1';
        return element(by.css(buttonSelector)).click();
    }


    getTitleText(){
        let titleSelector = 'body > div > div > div > app-trip-list > main > div.breadcrumb > legend > h1';
        return element(by.css(titleSelector)).getText();
    }

}