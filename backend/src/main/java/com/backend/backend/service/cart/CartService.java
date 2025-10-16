package com.backend.backend.service.cart;

import com.backend.backend.model.cart.CartDTO;

public interface CartService {
    CartDTO getCart(Integer userId);
    CartDTO addItem(Integer userId, Integer productId, int qty);
    CartDTO changeQty(Integer userId, Integer itemId, int delta);

    void removeItem(Integer userId);
}
