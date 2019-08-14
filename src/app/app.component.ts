import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';
import comapnyInfo from '../data/companies.json';
import locationsInfo from '../data/locations.json';
import emailSuffixesInfo from '../data/emailSuffixes.json';

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
  completeLocation = { town: '', street: '', address1: '', address2: '', telephoneNum: '' };
  completeCompany = { name: '', website: '', supportNum: '', imprints: [] };
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

  submit(): void {

  }
}
