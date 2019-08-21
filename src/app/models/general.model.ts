export class CompleteLocation {
    id: number;
    town: string;
    street: string;
    address1: string;
    address2: string;
    telephoneNum: string;
    finalTelephoneNum: string;
    country: string;

    constructor(id: number, town: string, street: string, address1: string, address2: string, telephoneNum: string, finalTelephoneNum: string, country: string) {
        this.id = id;
        this.town = town;
        this.street = street;
        this.address1 = address1;
        this.address2 = address2;
        this.telephoneNum = telephoneNum;
        this.finalTelephoneNum = finalTelephoneNum;
        this.country = country;
    }
}

export class CompleteCompany {
    name: string;
    website: string;
    supportNum: string;
    imprints: Array<string>;

    constructor(name: string, website: string, supportNum: string, imprints: Array<string>) {
        this.name = name;
        this.website = website;
        this.supportNum = supportNum;
        this.imprints = imprints;
    }
}


export class Logo {
    id: number;
    name: string;
    imgUrl: string;
    alt: string;

    constructor(id: number, name: string, imgUrl: string, alt: string) {
        this.id = id;
        this.name = name;
        this.imgUrl = imgUrl;
        this.alt = alt;
    }
}