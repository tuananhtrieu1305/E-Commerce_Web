package com.backend.backend.api;

import com.backend.backend.model.product.ProductDTO;
import com.backend.backend.model.response.ApiResponse;
import com.backend.backend.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/product")
public class ProductAPI {
    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductDTO>>> getProduct(@RequestParam Map<String, Object> params) {
        List<ProductDTO> products = productService.getProduct(params);
        return ResponseEntity.ok(ApiResponse.success(products, "Get Products succeeded!"));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<ProductDTO>> createProduct(@RequestBody Map<String, Object> body) {
        ProductDTO newProduct = productService.createProduct(body);
        ApiResponse<ProductDTO> response = ApiResponse.success(newProduct, "Create product succeeded!");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PostMapping("/batch")
    public ResponseEntity<ApiResponse<List<ProductDTO>>> createListProducts(@RequestBody List<Map<String, Object>> bodyList) {
        List<ProductDTO> newProducts = productService.createListProducts(bodyList);
        ApiResponse<List<ProductDTO>> response = ApiResponse.success(newProducts, "Create List Product succeeded!");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductDTO>> updateProduct(@PathVariable Integer id, @RequestBody Map<String, Object> body) {
        ProductDTO updatedProduct = productService.updateProduct(id, body);
        return ResponseEntity.ok(ApiResponse.success(updatedProduct, "Update product succeeded!"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(@PathVariable Integer id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok(ApiResponse.success("Delete product succeeded!"));
    }
}
