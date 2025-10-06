package com.backend.backend.api;

import com.backend.backend.model.product.ProductDTO;
import com.backend.backend.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class ProductAPI {
    @Autowired
    private ProductService productService;

    @GetMapping(value = "/api/product/")
    public List<ProductDTO> getProduct(@RequestParam Map<String, Object> params) {
        List<ProductDTO> res = productService.getProduct(params);
        return res;
    }

    @PostMapping(value = "/api/product/")
    public ProductDTO createProduct(@RequestBody Map<String, Object> body) {
        ProductDTO res = productService.createProduct(body);
        return res;
    }
}
