package com.backend.backend.service.category.impl;

import com.backend.backend.converter.category.CategoryProductResponseDTOConverter;
import com.backend.backend.model.category.CategoryProductResponseDTO;
import com.backend.backend.repository.category.CategoryRepository;
import com.backend.backend.repository.product.entity.CategoryEntity;
import com.backend.backend.service.category.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryProductResponseDTOConverter categoryProductResponseDTOConverter;

    @Override
    public List<CategoryProductResponseDTO> getCategoriesWithProducts() {
        return categoryRepository.getCategoriesWithProducts();
    }
}
