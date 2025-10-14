package com.backend.backend.service.category;

import com.backend.backend.model.category.CategoryProductResponseDTO;
import com.backend.backend.model.product.CategoryDTO;

import java.util.List;

public interface CategoryService {
    public List<CategoryProductResponseDTO> getCategoriesWithProducts();
    public List<CategoryDTO> getCategoryOnly();
}
