import axiosinstance from "../helper/helper"; // Default import syntax mapping

export async function GetCategories(query = {}) {
    try {
        const filter = new URLSearchParams()
        if (query.id) filter.id = filter.append("id", query.id)
        if (query.status) filter.append("status", query.status)
        if (query.is_top) filter.append("is_top", query.is_top)
        if (query.limit) filter.append("limit", query.limit)
        const response = await axiosinstance.get(`/category?${filter.toString()}`);
        return response.data; // Server response data data packet pass ho gaya
    } catch (error) {
        console.error("API Fetch Error:", error);
        return { success: false, msg: "Error fetching api", error };
    }
}
export async function GetCategoriesbyId(id) {
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

export async function GetBrands() {
    try {
        const response = await axiosinstance.get("/brand");
        return response.data; // Server response data data packet pass ho gaya
    } catch (error) {
        console.error("API Fetch Error:", error);
        return { success: false, msg: "Error fetching api", error };
    }
}
export async function GetbrandbyId(id) {
    try {
        const response = axiosinstance.get(`/brand/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}
export const DeletebrandApi = async (id) => {
    try {
        const response = await axiosinstance.delete(`/brand/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error?.response?.data || error;
    }
};

export async function GetProducts(query = {}) {
    try {
        const filter = new URLSearchParams()
        if (query.id) filter.append("id", query.id)
        if (query.status) filter.append("status", query.status)
        if (query.limit) filter.append("limit", query.limit)
        if (query.is_popular) filter.append("is_popular", query.is_popular)
        if (query.category_slug) filter.append("category_slug", query.category_slug)
        if (query.brand_slug) filter.append("brand_slug", query.brand_slug)
        if (query.page) filter.append("page", query.page)
        if (query.min_price) filter.append("min_price", query.min_price);
        if (query.max_price) filter.append("max_price", query.max_price);
        const response = await axiosinstance.get(`/product?${filter.toString()}`)
        return response.data
    } catch (error) {
        console.error("API Fetch Error:", error);
        return { success: false, msg: "Error fetching api", error };
    }
}
export async function GetproductbyId(id) {
    try {
        const response = await axiosinstance.get(`/product/${id}`)
        return response.data
    } catch (error) {
        console.log(error)
    }
}