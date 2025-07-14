
export type User = {
  id_user: string;
  email: string;
  name: string;
  firstname: string;
  adress: string;
  phone: string;
  role: 'BUYER' | 'SELLER' | 'ADMIN';
};


export type Category = {
  id_category: string;
  name_category: string;
};


export type Product = {
  id_product: string;
  name: string;
  description: string;
  price: string;
  condition: 'NEW' | 'GOOD' | 'USED';
  verification_status: 'READY_TO_SELL' | 'RECONDITIONED';
  images: string[];
  ategory_id: string;
  category?: Category;
};
export type ProductWithCategory = Product & {
  category: {
    name_category: string;
  };
};

export type Listing = {
  id_listing: string;
  publication_date: string;
  status: 'PENDING' | 'ONLINE' | 'DELETED';
  seller_id: string;
  product_id: string;
  product: Product;
  seller: User;
};

export type Order = {
    id_order:string;
    order_date:Date;
    total_amount:number;
    status:'PENDING'|'VALIDATED'| 'DELIVERED';
    listings:Listing[];
    buyer_id:User;
}
export type Transaction ={
    id_transaction:string;
    amount:number;
    transaction_date:Date;
    status :'PENDING'| 'COMPLETED'| 'FAILED';
    order_id:string;
    buyer_id:string;
}