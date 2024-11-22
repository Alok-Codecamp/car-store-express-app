
//create union type for car category 

type CarCategory = 'Sedan' | 'SUV' | 'Truck' | 'Coupe' | 'Convertible';

export interface ICars {
    brand: string;
    model: string;
    year: number;
    price: number;
    category: CarCategory;
    description: string;
    quantity: number;
    inStock: boolean
}