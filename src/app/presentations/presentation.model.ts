export class Item {
    name : string
    description : string
    barcodeId: string
    sku:string
    basePrice:number
    sellingType:string
    type:string="ITEM"
    optionIds?:number[]
}


export class CatalogueSearchRequest {
    name : string
    shopId : string
}