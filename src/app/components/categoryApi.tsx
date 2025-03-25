// src/app/components/categoryApi.ts
export interface Category {
    id: string;
    name: string;
    iconUrl: string;
    isNew: boolean;
}
  
export const fetchCategories = async (authToken: string): Promise<Category[]> => {
    try {
        const response = await fetch(
            "https://shop.chasman.engineer/api/v1/categories",
            {
                method: "GET",
                headers: {
                    "accept": "*/*",
                    "Authorization": authToken
                }
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.categories;
    } catch (err) {
        throw err instanceof Error ? err : new Error("An unknown error occurred");
    }
};