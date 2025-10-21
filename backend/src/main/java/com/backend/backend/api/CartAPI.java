package com.backend.backend.api;

import com.backend.backend.model.cart.CartDTO;
import com.backend.backend.model.cart.CartItemDTO;
import com.backend.backend.service.cart.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class CartAPI {
    @Autowired
    private CartService cartService;
    @GetMapping(value = "/api/cart/")
    public List<CartItemDTO> getCart(@RequestParam Map<String, Object> params) {
        int userId = toInt(params.get("userId"));
        return cartService.getCart(userId);
    }


    @PostMapping(value = "/api/cart/items/")
    public CartDTO addItem(@RequestBody Map<String, Object> body) {
        int userId    = toInt(body.get("userId"));
        int productId = toInt(body.get("productId"));
        int qty       = toInt(body.get("qty"));
        return cartService.addItem(userId, productId, qty);
    }

    @PatchMapping(value = "/api/cart/items/{itemId}")
    public CartDTO changeQty(@PathVariable Integer itemId,
                             @RequestBody Map<String, Object> body) {
        int userId = toInt(body.get("userId"));
        int delta  = toInt(body.get("delta"));
        return cartService.changeQty(userId, itemId, delta);
    }
    @PutMapping("/api/cart/items/{itemId}/qty")
    public CartDTO setQty(@PathVariable Integer itemId, @RequestBody Map<String,Object> body){
        int userId = toInt(body.get("userId"));
        int qty    = toInt(body.get("qty"));
        return cartService.addItem(userId, itemId, qty);
    }

    @DeleteMapping(value = "/api/cart/items/{itemId}")
    public void removeItem(@PathVariable Integer itemId) {
        cartService.removeItem(itemId);
    }
    private int toInt(Object v) {
        return Integer.parseInt(String.valueOf(v));
    }
}
