package com.backend.backend.service.product;

import com.backend.backend.model.product.ProductDTO;

import java.util.List;
import java.util.Map;

public interface ProductService {
    List<ProductDTO> getProduct(Map<String, Object> params);
}
