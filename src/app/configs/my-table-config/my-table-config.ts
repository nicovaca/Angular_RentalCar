import { MyHeaders } from "../configClass/my-headers";
import { MyOrder } from "../configClass/my-order";
import { MySearch } from "../configClass/my-search";




export class MyTableConfig {
  headers! : MyHeaders[] ;
  order! : MyOrder ;
  search! : MySearch ;
}
