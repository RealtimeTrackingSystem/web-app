export interface IReporter {
    _id: string;
    username: string;
    email: string;
    fname: string;
    lname: string;
    alias: string;
    street: string;
    barangay: string;
    city: string;
    region: string;
    country: string;
    zip: string;
    reporterID: string;
    birthday: string;
    age: number;
    hosts?: any[]
}
