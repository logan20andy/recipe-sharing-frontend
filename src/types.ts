export interface Recipe {
    _id: string;
    title: string;
    description: string;
    image: string;
    ingredients: string;
    steps: string;
    isFavorite?: boolean;
}


