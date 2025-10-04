package com.backend.backend.api;

import com.backend.backend.model.product.ProductDTO;
import com.backend.backend.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
}
