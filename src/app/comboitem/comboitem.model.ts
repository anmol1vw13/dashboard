export class ComboItem {
    selfId:String;
    name: String;
    description:String;
    barcodeId: String;
    sku:String;
    mrp:Number;
    basePrice:Number;
    parentId: String;
    type:String;
    children:Array<Object>;
    expanded:boolean=true;
}

export class ComboOption{
    selfId:String;
    name: String;
    parentId:String;
    type:String;
    children:Array<Object>;
    expanded:boolean=true;
}