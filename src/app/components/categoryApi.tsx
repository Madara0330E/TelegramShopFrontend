// src/app/components/categoryApi.ts
export interface Category {
    id: string;
    name: string;
    iconUrl: string;
    isNew: boolean;
  }
  
  export const fetchCategories = async (): Promise<Category[]> => {
    try {
      const response = await fetch(
        "https://shop.chasman.engineer/api/v1/categories",
        {
          headers: {
            accept: "*/*",
            Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjIwNDU0MTE1MDkiLCJuYmYiOjE3NDIzOTIyOTEsImV4cCI6MTc0MjM5NTg5MSwiaWF0IjoxNzQyMzkyMjkxLCJpc3MiOiJtci5yYWZhZWxsbyJ9.1axn5_yWtp_JrGzPV1rpZfZlTJgTjJA4mwKWhugAGUY",
          },
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