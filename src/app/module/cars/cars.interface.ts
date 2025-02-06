
//create union type for car category 

type CarCategory = 'Sedan' | 'Hatchback' | 'SUV' | 'Crossover' | 'Coupe' | 'Convertible';

export interface ICars {
    brand: string;
    model: string;
    year: number;
    price: string;
    category: CarCategory;
    description: string;
    quantity: number;
    inStock: boolean,
    photoUrl: string;
}