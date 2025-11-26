package com.backend.backend.service.product;

import com.backend.backend.model.product.ProductDTO;

import java.util.List;
import java.util.Map;

public interface ProductService {
    List<ProductDTO> getProduct(Map<String, Object> params);
    ProductDTO createProduct(Map<String, Object> body);
    ProductDTO updateProduct(Integer id, Map<String, Object> body);
    void deleteProduct(Integer id);
    List<ProductDTO> createListProducts(List<Map<String, Object>> bodyList);
    List<ProductDTO> searchProductsForChatbot(Map<String, Object> aiParams);
}
