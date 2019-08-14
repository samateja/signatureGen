import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import comapnyInfo from '../data/companies.json';
import locationsInfo from '../data/locations.json';
import emailSuffixesInfo from '../data/emailSuffixes.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public version: string;
  title = 'signatureGenerator';
  selectedLogo: { imgUrl: 'logo_img_ServicewareSE.PNG', name: 'Serviceware SE', alt: 'Serviceware SE' };
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
    { id: 0, name: 'Serviceware SE', imgUrl: 'logo_img_ServicewareSE.PNG', alt: 'Serviceware SE' },
    { id: 1, name: 'PMCS - A SERVICEWARE COMPANY', imgUrl: 'logo_img_PMCS.PNG', alt: 'PMCS' },
    { id: 2, name: 'SSC', imgUrl: 'logo_img_ssc.png', alt: 'Strategic Service Consulting' }
  ];

  // emailSuffixes: [
  //   { id: 0, emailSuffix: 'Select Email' },
  //   { id: 1, emailSuffix: '@anafee.com' },
  //   { id: 2, emailSuffix: '@pmcs.de' },
  //   { id: 3, emailSuffix: '@sabio.de' },
  //   { id: 4, emailSuffix: '@serviceware.se' },
  //   { id: 5, emailSuffix: '@strategic-sc.de' }
  // ];

  public companies: any;
  public locations: any;
  public emailSuffixes: any;

  public constructor() {
    this.companies = comapnyInfo;
    this.locations = locationsInfo;
    this.emailSuffixes = emailSuffixesInfo;
    console.log('companies data::', this.locations);
  };

  ngOnInit(): void {
    this.version = environment.version; // <-- Consume the version number from environment!
  }
}