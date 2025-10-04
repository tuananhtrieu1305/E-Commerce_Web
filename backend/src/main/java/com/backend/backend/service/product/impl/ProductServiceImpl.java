package com.backend.backend.service.product.impl;

import com.backend.backend.builder.product.ProductSearchBuilder;
import com.backend.backend.converter.product.ProductSearchBuilderConverter;
import com.backend.backend.model.product.ProductDTO;
import com.backend.backend.repository.product.ProductRepository;
import com.backend.backend.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductSearchBuilderConverter productSearchBuilderConverter;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<ProductDTO> getProduct(Map<String, Object> params) {
        ProductSearchBuilder productSearchBuilder = productSearchBuilderConverter.toBuilder(params);
        return productRepository.getProduct(productSearchBuilder);
    }
}
