import { Component, OnInit } from '@angular/core';
import comapnyInfo from '../data/companies.json';
import locationsInfo from '../data/locations.json';
import emailSuffixesInfo from '../data/emailSuffixes.json';
import { CompleteCompany, CompleteLocation } from "../app/models/general.model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public version: string;
    title = 'signatureGenerator';
    selectedLogo: { imgUrl: '../assets/images/logo_img_ServicewareSE.PNG', name: 'Serviceware SE', alt: 'Serviceware SE' };
    firstName = '';
    lastName = '';
    position = '';
    completeLocation: CompleteLocation = { town: '', street: '', address1: '', address2: '', telephoneNum: '', finalTelephoneNum: '' };
    completeCompany: CompleteCompany = { name: '', website: '', supportNum: '', imprints: [] };
    emailPrefix = '';
    finalTelephoneNum = '';
    mobileNr = '';
    showSupportNum = false;
    langGer = false;

    currentTelNum = '';

    showMobNum = true;
    showTelNum = true;

    selectedLink = { text: '', underLinedText: '', url: '' };

    logos: [
        { id: 0, name: 'Serviceware SE', imgUrl: '../assets/images/logo_img_ServicewareSE.PNG', alt: 'Serviceware SE' },
        { id: 1, name: 'PMCS - A SERVICEWARE COMPANY', imgUrl: '../assets/images/logo_img_PMCS.PNG', alt: 'PMCS' },
        { id: 2, name: 'SSC', imgUrl: '../assets/images/logo_img_ssc.png', alt: 'Strategic Service Consulting' }
    ];

    public companies: any;
    public locations: any;
    public emailSuffixes: any;

    public constructor() {
        this.companies = comapnyInfo;
        this.locations = locationsInfo;
        this.emailSuffixes = emailSuffixesInfo;
    }

    ngOnInit(): void {
        // this.version = environment.version; // <-- Consume the version number from environment!
        this.version = '2.0.0';
        this.selectedLogo = { imgUrl: '../assets/images/logo_img_ServicewareSE.PNG', name: 'Serviceware SE', alt: 'Serviceware SE' };
    }

    getCompleteLocation(): CompleteLocation {
        const completeLocation = this.completeLocation;
        for (let i = 0; i < this.locations.locations.length; i++) {
            if (this.locations.repeatSelect === i) {
                completeLocation.street = this.locations.locations[i].street;
                completeLocation.address1 = this.locations.locations[i].address1;
                completeLocation.address2 = this.locations.locations[i].address2 !== '' ? this.locations.locations[i].address2 : '';
                completeLocation.telephoneNum = this.locations.locations[i].telephoneNum;
                completeLocation.town = this.locations.locations[i].town;
            }
        }

        (document.getElementById('telNr') as HTMLInputElement).value = completeLocation.telephoneNum;
        this.currentTelNum = completeLocation.telephoneNum;

        if (this.finalTelephoneNum !== this.currentTelNum) {
            completeLocation.finalTelephoneNum = this.finalTelephoneNum;
        }

        return completeLocation;
    }

    submit(): void {

    }
}
