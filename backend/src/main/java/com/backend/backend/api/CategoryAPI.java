package com.backend.backend.api;

import com.backend.backend.model.category.CategoryProductResponseDTO;
import com.backend.backend.service.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CategoryAPI {
    @Autowired
    private CategoryService categoryService;

    @GetMapping(value = "/api/category/")
    public List<CategoryProductResponseDTO> getCategoriesWithProducts() {
        return categoryService.getCategoriesWithProducts();
    }
}
