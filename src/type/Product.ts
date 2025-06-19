export interface PayloadProduct {
  name_product: string
  price: string
  description: string
  category_id: string
  stock: string
}

export interface ListProduct {
  id:           string;
  name_product: string;
  category_id:  string;
  stock:        string;
  description:  string;
  price:        string;
  softDeleted:  boolean;
  created_at:   Date;
  updated_at:   Date;
  category:     {
    id: string;
    name_category: string;
  };
}
