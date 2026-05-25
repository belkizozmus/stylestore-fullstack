const API_BASE_URL = "https://stylestore-fullstack.onrender.com/api";

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) throw new Error("Veri çekme hatası");
        return await response.json();
    } catch (error) {
        console.error("Ürünler getirilemedi:", error);
        return [];
    }
};


export const addProduct = async (productData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData)
        });
        return await response.json();
    } catch (error) {
        console.error("Ürün eklenemedi:", error);
    }
};

export const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.error("Ürün silinemedi:", error);
    }
};


export const updateProduct = async (productId, updatedData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        return await response.json();
    } catch (error) {
        console.error("Ürün güncellenemedi:", error);
    }
};