export type MainStackParamList = {
    Home: undefined;
    Search: { query?: string };
    Categories: undefined;
    CategoryRepairs: { 
        categoryId: string;
        categoryName: string;
    };
    RepairDetails: { 
        repairId: string;
        repairName: string;
    };
    Favorites: undefined;
    Profile: undefined;
    Settings: undefined;
    Tools: { repairId: string };
};