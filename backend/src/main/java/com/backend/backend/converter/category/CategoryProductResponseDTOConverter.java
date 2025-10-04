package com.backend.backend.converter.category;

import com.backend.backend.model.category.CategoryProductResponseDTO;
import com.backend.backend.model.category.ProductSummaryDTO;
import com.backend.backend.repository.product.entity.CategoryEntity;
import com.backend.backend.repository.product.entity.ProductEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CategoryProductResponseDTOConverter {
    public CategoryProductResponseDTO toCategoryProductResponseDTO(CategoryEntity category) {
        CategoryProductResponseDTO responseDTO = new CategoryProductResponseDTO();

        responseDTO.setCategory_name(category.getCate_name());

        if (category.getProduct() != null && !category.getProduct().isEmpty()) {
            List<ProductSummaryDTO> productSummaryDTOs = category.getProduct().stream()
                    .map(this::toProductSummaryDTO)
                    .collect(Collectors.toList());
            responseDTO.setProducts(productSummaryDTOs);
        }

        return responseDTO;
    }

    public List<CategoryProductResponseDTO> toCategoryProductResponseDTOList(List<CategoryEntity> categories) {
        return categories.stream()
                .map(this::toCategoryProductResponseDTO)
                .collect(Collectors.toList());
    }

    private ProductSummaryDTO toProductSummaryDTO(ProductEntity product) {
        ProductSummaryDTO summaryDTO = new ProductSummaryDTO();

        summaryDTO.setProduct_id(product.getId());
        summaryDTO.setProduct_name(product.getTitle());
        summaryDTO.setStock(product.getStock());

        return summaryDTO;
    }
}
