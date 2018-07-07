export class ComboItem {
    selfId:String;
    name: String;
    description:String;
    barcodeId: String;
    sku:String;
    mrp:Number;
    basePrice:Number;
    parentId: String;
    sellingType:String;
    type:String;
    children:Array<Object>;
    options:Array<Object>=[];
    expanded:boolean=true;
    parameters:Array<Parameter>=[];
    hsncode:String;
    cgst:Number;
    sgst:Number;
    defaultItem : boolean = false;
    active : boolean;
}

export class ComboOption{
    selfId:String;
    name: String;
    parentId:String;
    type:String;
    children:Array<Object>;
    items:Array<Object>=[];
    expanded:boolean=true;
    selectionCriteria:number;
    active:boolean;
}

export class Parameter{
    name:String;
    type:String="TAG";
}