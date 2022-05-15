import { browser,by,element } from "protractor";

export class ApplicationPage{

    navigateTo(){
        return browser.get('/applications');
    }

    getTableText(){
        const firstColumnSelector = '#DataTables_Table_0 > thead > tr > th.sorting.sorting_asc';
        return element(by.css(firstColumnSelector)).getText();
    }

    getElementInList(){
        return element.all(by.css('td')).getText();
    }

}