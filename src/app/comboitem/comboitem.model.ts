export class ComboItem {
    selfId:String;
    name: String;
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