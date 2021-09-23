import axios from 'axios';

const CATEGORY_API_BASE_URL = "http://128.199.121.92:8080/category";

class CategoryService {

    getCategory(){
        return axios.get(CATEGORY_API_BASE_URL);
    }

    saveCategory(Category){
        return axios.post(CATEGORY_API_BASE_URL, Category);
    }

    getCategoryById(CategoryId){
        return axios.get(CATEGORY_API_BASE_URL + '/' + CategoryId);
    }

    updateCategory(Category, CategoryId){
        return axios.put(CATEGORY_API_BASE_URL + '/' + CategoryId, Category);
    }

    deleteCategory(CategoryId){
        return axios.delete(CATEGORY_API_BASE_URL + '/' + CategoryId);
    }
}

export default new CategoryService()