import axiosinstance from "../helper/helper"; // Default import syntax mapping

export async function GetCategories() {
    try {
        const response = await axiosinstance.get("/category");
        return response.data; // Server response data data packet pass ho gaya
    } catch (error) {
        console.error("API Fetch Error:", error);
        return { success: false, msg: "Error fetching api", error };
    }
}
export async function GetCategoriesbyId(id){
    try {
        const response = axiosinstance.get(`/category/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const DeleteCategoryApi = async (id) => {
    try {
        const response = await axiosinstance.delete(`/category/delete/${id}`);
        return response.data; 
    } catch (error) {
        throw error?.response?.data || error;
    }
};