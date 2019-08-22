import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import companyInfo from '../data/companies.json';
import locationsInfo from '../data/locations.json';
import emailSuffixesInfo from '../data/emailSuffixes.json';
import { CompleteCompany, CompleteLocation, Logo } from '../app/models/general.model';

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
    completeLocation: CompleteLocation = { id: 0, town: '', street: '', address1: '', address2: '', telephoneNum: '', finalTelephoneNum: '', country: '' };
    completeCompany: CompleteCompany = { name: '', website: '', supportNum: '', imprints: [] };
    emailPrefix = '';
    finalTelephoneNum = '';
    mobileNr = '';
    showSupportNum = false;

    currentTelNum = '';

    showMobNum = true;
    showTelNum = true;

    selectedLink = { text: '', underLinedText: '', url: '' };
    selectedEmailSuffix = '';
    readyToSubmit = false;

    logos = [
        { id: 0, name: 'Serviceware SE', imgUrl: 'assets/images/logo_img_ServicewareSE.PNG', alt: 'Serviceware SE' },
        { id: 1, name: 'SSC', imgUrl: 'assets/images/logo_img_ssc.png', alt: 'Strategic Service Consulting' },
        { id: 2, name: "cubus AG", imgUrl: "assets/images/logo_img_cubus.png", alt: "cubus AG" }
    ];

    public companies: any;
    public locations: any;
    public emailSuffixes: any;
    public showCopyMessage: boolean = false;

    public constructor(private sanitizer: DomSanitizer) {
        this.companies = this.fillCompaniesList(companyInfo);
        this.locations = this.fillLocationsList(locationsInfo);
        this.emailSuffixes = emailSuffixesInfo;
    }

    ngOnInit(): void {
        this.version = '2.0.0';
        this.selectedLogo = new Logo(-1, 'Serviceware SE', 'assets/images/logo_img_ServicewareSE.PNG', 'Serviceware SE');

        // this.fillDemoData();
    }

    fillDemoData(): void {
        this.firstName = 'Colin';
        this.lastName = 'Finger';
        this.position = 'Developer';
        this.emailPrefix = 'colin.finger';
        this.onChange();
    }

    fillLocationsList(locationsJson: any): CompleteLocation[] {
        const locationList: CompleteLocation[] = Array.from(locationsJson.locations);
        const finalLocationList: CompleteLocation[] = [];
        for (const location of locationList) {
            const currentLocation = new CompleteLocation(
                location.id,
                location.town,
                location.street,
                location.address1,
                location.address2,
                location.telephoneNum,
                location.finalTelephoneNum,
                location.country
            );
            finalLocationList.push(currentLocation);
        }

        finalLocationList.sort(function (a, b) {
            let locationA = a.town.toLowerCase();
            let locationB = b.town.toLowerCase();
            if (locationA < locationB) { return -1; }
            if (locationA > locationB) { return 1; }
            return 0;
        })

        return finalLocationList;
    }

    fillCompaniesList(companiesJson: any): CompleteCompany[] {
        const companyList: CompleteCompany[] = Array.from(companiesJson.companies);
        const finalCompanyList: CompleteCompany[] = [];
        for (const company of companyList) {
            const currentCompany = new CompleteCompany(company.name, company.website, company.supportNum, company.imprints);
            finalCompanyList.push(currentCompany);
        }

        finalCompanyList.sort(function (a, b) {
            let compA = a.name.toLowerCase();
            let compB = b.name.toLowerCase();
            if (compA < compB) { return -1; }
            if (compA > compB) { return 1; }
            return 0;
        })

        return finalCompanyList;
    }

    getCompleteCompany(value: any): CompleteCompany {
        value = value.target.selectedIndex - 1;
        const completeCompany = this.completeCompany;

        completeCompany.name = this.companies[value].name;

        completeCompany.supportNum = this.companies[value].supportNum;
        const imprintCount = this.companies[value].imprints.length;

        for (var j = 0; j < imprintCount; j++) {
            completeCompany.imprints[j] = this.companies[value].imprints[j].text;
        }
        if (imprintCount === 3) {
            completeCompany.imprints[3] = '';
            completeCompany.imprints[4] = '';
        }
        if (imprintCount === 4) {
            completeCompany.imprints[4] = '';
        }

        return completeCompany;
    }

    getCompleteLocation(value: any): CompleteLocation {
        value = value.target.selectedIndex - 1;
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

    updateEmailSuffix(value: any): void {
        let town = value.target.selectedOptions[0].innerText.trim();
        let country: string = this.locations.find(function (element) {
            return element.town === town;
        }).country;
        if (country === "Germany") {
            this.selectedEmailSuffix = '@serviceware.de';
            this.completeCompany.website = 'www.serviceware.de';
        }
        else {
            this.selectedEmailSuffix = '@serviceware-se.com';
            this.completeCompany.website = 'www.serviceware-se.com';
        }
        this.onChange();
    }

    updatePhoneNumber(): void {
        this.onChange();
    }

    updateLocation(value: any): void {
        this.updateEmailSuffix(value);
        this.completeLocation = this.getCompleteLocation(value);
        this.finalTelephoneNum = this.currentTelNum;
        this.onChange();
    }

    updateCompany(value: any): void {
        this.completeCompany = this.getCompleteCompany(value);
        this.updateLogo(this.completeCompany.name);
        this.onChange();
    }

    updateLogo(compName: string): void {
        const selectedLogo: Logo = this.selectedLogo;
        let i = 0;
        if (compName === 'Strategic Service Consulting GmbH - A Serviceware Company') {
            i = 1;
        } else if (compName === 'cubus AG - A Serviceware Company') {
            i = 2;
        }

        selectedLogo.name = this.logos[i].name;
        selectedLogo.imgUrl = this.logos[i].imgUrl;
        selectedLogo.alt = this.logos[i].alt;

        this.selectedLogo = selectedLogo;
    }

    submit(): void {
        let text = this.generateText();

        function listener(e) {
            e.clipboardData.setData('text/html', text);
            e.clipboardData.setData('text/plain', text);
            e.clipboardData.setData('image/png', text);
            e.preventDefault();
        }

        document.addEventListener('copy', listener);
        document.execCommand('copy');
        document.removeEventListener('copy', listener);

        console.log("true");

        $("#copyMessage").removeClass('showCopyMessage');
        $("#copyMessage").addClass('showCopyMessage');

        this.showCopyMessage = true;
        this.delay(1750);
    }

    delay(ms: number) {
        return new Promise(resolve => setTimeout(function () {
            console.log("false");
            $("#copyMessage").removeClass('showCopyMessage');
            this.showCopyMessage = false;
        }, ms));
    }

    generateText(): string {
        let rootURL = window.location.href;
        let text: string =
            '<html>' +
            '<head>' +
            '<meta http-equiv="content-type" content="text/html" charset="utf-8"/>' +
            '</head>' +

            '<body style="font-family:Source Sans Pro;" link="#2b487a" vlink="#2b487a" alink="#2b487a">' +
            '<div style="display:inline-block;">' +
            '<div id="name" style="font-size:12.0pt;font-family:&quot;Source Sans Pro&quot;,sans-serif;color:#2F3E48;">' + this.firstName + ' ' + this.lastName + '</div>' +
            '<div id="position" style="font-family:&quot;Source Sans Pro&quot;,sans-serif;font-size:10.0pt;color:#2F3E48;">' + this.position + '</div>' +
            '<span style="font-size:5pt;font-family:&quot;Source Sans Pro&quot;,sans-serif;color:#FFFFFF;mso-fareast-language:EN-GB">-<br /></span>' +
            '<img src="' + rootURL + this.selectedLogo.imgUrl + '" alt="' + this.selectedLogo.alt + '" style="padding: 0px 0px 10px 0px;">' +
            '<span style="font-size:1pt;font-family:&quot;Source Sans Pro&quot;,sans-serif;color:#FFFFFF;mso-fareast-language:EN-GB">-<br /></span>' +
            '<table border="0" cellpadding="0" cellspacing="0">' +
            '<tr>' +
            '<td style="border-right: 2px solid #0082BB; padding: 0px 20px 0px 0px;">' +
            '<p style="font-size:10.0pt;color:#3A3A3A;white-space:nowrap;font-family: Source Sans Pro;">';
        if (this.completeCompany.name !== '') text += this.completeCompany.name + '<br />';

        text += this.completeLocation.street + '<br />' +
            this.completeLocation.address1 + '<br />';

        if (this.completeLocation.address2 != undefined) text += this.completeLocation.address2 + '<br />';

        text += this.completeCompany.website + '</p></td>' +
            '<td style="padding-left:20px;">' +
            '<p style="font-size:10.0pt;color:#3A3A3A;white-space:nowrap;font-family: Source Sans Pro;">' +
            '<a href="mailto:' + this.emailPrefix + this.selectedEmailSuffix + '">' + this.emailPrefix + this.selectedEmailSuffix + '</a><br />' +
            'Tel.: &#43;' + this.finalTelephoneNum + '<br />';

        if (this.mobileNr != '') text += 'Mob.: &#43;' + this.mobileNr + '<br />';
        if (this.showSupportNum && this.completeCompany.supportNum != '') text += 'Support: &#43;' + this.completeCompany.supportNum;

        text += '</p></td>' +
            '</tr><tr>' + //padding-top: 10px; margin-bottom: 10px
            '<td colspan="1">';

        var imprints = "";
        for (var i = 0; i < this.completeCompany.imprints.length; i++) {
            var imprintText = this.completeCompany.imprints[i];
            if (i === 0) {
                imprints += '<span lang="EN-GB" style="font-size:8.5pt;font-family:&quot;Source Sans Pro&quot;,sans-serif;color:#A0A0A0;mso-fareast-language:EN-GB">' + imprintText + '<br /></span>';
            }
            else {
                imprints += '<span lang="EN-GB" style="font-size:8.5pt;font-family:&quot;Source Sans Pro&quot;,sans-serif;color:#A0A0A0;mso-fareast-language:EN-GB">' + imprintText + '<br /></span>';
            }
        }

        text +=
            '</td>' +
            '<td style="color: #2b487a; font-size: 1.35em; text-align:right; colspan="1">' +
            '<span style="font-size:1pt;font-family:&quot;Source Sans Pro&quot;,sans-serif;color:#FFFFFF;mso-fareast-language:EN-GB">-<br /></span>' +
            '</td>' +
            '</tr>' +
            '</table>' +
            '</div>' +
            '<div style="line-height: 105%; margin-top:8px;">' +
            imprints +
            '</div>' +
            '</body>' +
            '</html>';

        return text;
    }

    onChange(): void {
        if (this.firstName !== ''
            && this.lastName !== ''
            && this.currentTelNum !== ''
            && this.selectedEmailSuffix !== null
            && this.selectedEmailSuffix !== 'Select Email') {
            this.readyToSubmit = true;
        } else {
            this.readyToSubmit = false;
        }
    }
}
