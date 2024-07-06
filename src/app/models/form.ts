export interface Form {
    name: String,
    companyDescription: String,
    questions:string[]
}
export interface Question{
    name:String,
    answer:String,
    allowedValues:string[],
    answers:string[],
    isMandatory:boolean,
    type:string

}