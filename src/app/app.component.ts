import { Component, OnInit } from '@angular/core';

import comapnyInfo from '../data/companies.json';
import locationsInfo from '../data/locations.json';
import emailSuffixesInfo from '../data/emailSuffixes.json';
import { CompleteCompany, CompleteLocation, Logo } from "../app/models/general.model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public version: string;
    title = 'signatureGenerator';
    selectedLogo: Logo;
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
    selectedEmailSuffix = '';
    readyToSubmit = false;

    logos: [
        { id: 0, name: 'Serviceware SE', imgUrl: '../assets/images/logo_img_ServicewareSE.PNG', alt: 'Serviceware SE' },
        { id: 1, name: 'PMCS - A SERVICEWARE COMPANY', imgUrl: '../assets/images/logo_img_PMCS.PNG', alt: 'PMCS' },
        { id: 2, name: 'SSC', imgUrl: '../assets/images/logo_img_ssc.png', alt: 'Strategic Service Consulting' }
    ];

    public companies: any;
    // public locations: CompleteLocation[];
    public locations: any;
    public emailSuffixes: any;

    public constructor() {
        this.companies = comapnyInfo;
        this.locations = this.fillLocationsList(locationsInfo);
        // this.locations = locationsInfo;
        this.emailSuffixes = emailSuffixesInfo;
    }

    ngOnInit(): void {
        // this.version = environment.version; // <-- Consume the version number from environment!
        this.version = '2.0.0';
        this.selectedLogo = new Logo(-1, 'Serviceware SE', '../assets/images/logo_img_ServicewareSE.PNG', 'Serviceware SE');
        this.locations
    }

    fillLocationsList(locationsInfo: any): CompleteLocation[] {
        let locationList: CompleteLocation[] = Array.from(locationsInfo.locations);
        let finalLocationList: CompleteLocation[] = [];
        for (let location of locationList) {
            let currentLocation = new CompleteLocation(location.town, location.street, location.address1, location.address2, location.telephoneNum, location.finalTelephoneNum);
            finalLocationList.push(currentLocation);
        }

        return finalLocationList;
    }

    getCompleteCompany(): CompleteCompany {
        const completeCompany = this.completeCompany;
        for (let i = 0; i < this.companies.companies.length; i++) {
            if (this.companies.repeatSelect == i) {
                completeCompany.name = this.companies.companies[i].name;

                if (this.selectedEmailSuffix == "Select Email") {
                    completeCompany.website = "";
                } else {
                    if (this.selectedEmailSuffix != null) {
                        var websiteString = this.selectedEmailSuffix.substring(1);
                        websiteString = "www." + websiteString;
                        completeCompany.website = websiteString;
                    }
                }

                completeCompany.supportNum = this.companies.companies[i].supportNum;
                var imprintCount = this.companies.companies[i].imprints.length;
                for (var j = 0; j < imprintCount; j++) {
                    completeCompany.imprints[j] = this.companies.companies[i].imprints[j].text;
                }
                if (imprintCount == 3) {
                    completeCompany.imprints[3] = "";
                    completeCompany.imprints[4] = "";
                }
                if (imprintCount == 4) {
                    completeCompany.imprints[4] = "";
                }
            }
        }
        return completeCompany;
    }

    getCompleteLocation(value: any): CompleteLocation {
        value = value.target.selectedIndex;
        const completeLocation = this.completeLocation;

        completeLocation.street = this.locations[value].street;
        completeLocation.address1 = this.locations[value].address1;
        completeLocation.address2 = this.locations[value].address2 !== '' ? this.locations[value].address2 : '';
        completeLocation.telephoneNum = this.locations[value].telephoneNum;
        completeLocation.town = this.locations[value].town;

        (document.getElementById('telNr') as HTMLInputElement).value = completeLocation.telephoneNum;
        this.currentTelNum = completeLocation.telephoneNum;

        if (this.finalTelephoneNum !== this.currentTelNum) {
            completeLocation.finalTelephoneNum = this.finalTelephoneNum;
        }

        return completeLocation;
    }

    updateEmailSuffix(): void {
        this.getCompleteCompany();
    }

    updateLocation(value: any): void {
        this.completeLocation = this.getCompleteLocation(value);
        this.finalTelephoneNum = this.currentTelNum;
    }

    updateCompany(): void {
        this.completeCompany = this.getCompleteCompany();
        this.updateLogo(this.completeCompany.name);
    }

    updateLogo(compName: string): void {
        var selectedLogo: Logo = this.selectedLogo;
        var i = 0;
        if (compName == "Strategic Service Consulting GmbH") {
            i = 1;
        }
        else if (compName == "cubus AG - A Serviceware Company") {
            i = 2;
        }

        selectedLogo.name = this.logos[i].name;
        selectedLogo.imgUrl = this.logos[i].imgUrl;
        selectedLogo.alt = this.logos[i].alt;

        this.selectedLogo = selectedLogo;
    }

    submit(): void {

    }

    onChange(Event): void {
        console.log(this.firstName);
        if (this.firstName != ''
            && this.lastName != ''
            // && this.company != ''
            // && this.town != ''
            && this.currentTelNum != ''
            && this.selectedEmailSuffix != null
            && this.selectedEmailSuffix != "Select Email") {
            this.readyToSubmit = true;
        }
        else {
            this.readyToSubmit = false;
        }
    }
}
