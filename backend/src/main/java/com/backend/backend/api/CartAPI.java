package com.backend.backend.api;

import com.backend.backend.model.cart.CartDTO;
import com.backend.backend.service.cart.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class CartAPI {
    @Autowired
    private CartService cartService;
    @GetMapping("api/cart/")
    public CartDTO getCart(@RequestBody)
    @PostMapping("/api/cart/items/")
    public CartDTO addItem(@RequestBody Map<String, Object> body) {
        int userId    = ((Number) body.get("userId")).intValue();
        int productId = ((Number) body.get("productId")).intValue();
        int qty       = ((Number) body.get("qty")).intValue();
        return cartService.addItem(userId, productId, qty);
    }

    @PatchMapping("/api/cart/items/{itemId}")
    public CartDTO changeQty(@PathVariable int itemId, @RequestBody Map<String, Object> body) {
        int userId = ((Number) body.get("userId")).intValue();
        int delta   = ((Number) body.get("delta")).intValue();
        return cartService.changeQty(userId, itemId, delta);
    }

    @DeleteMapping("/api/cart/items/{itemId}")
    public ResponseEntity<Void> removeItem(@PathVariable Integer itemId) {
        cartService.removeItem(itemId);
        return ResponseEntity.noContent().build(); // 204
    }
}
