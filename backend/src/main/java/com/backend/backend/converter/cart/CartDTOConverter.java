package com.backend.backend.converter.cart;

import com.backend.backend.model.cart.CartDTO;
import com.backend.backend.model.cart.CartItemDTO;
import com.backend.backend.repository.cart.entity.Cart;
import com.backend.backend.repository.cart.entity.CartItem;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor

public class CartDTOConverter {
    private final CartItemDTOConverter itemConv;

    public CartDTO toDTO(Cart cart) {
        if (cart == null) return null;
        CartDTO dto = new CartDTO();
        dto.setId(cart.getId());
        dto.setUserId(cart.getUserId());

        List<CartItem> items = cart.getItems() != null ? cart.getItems() : Collections.emptyList();
        dto.setItems(items.stream().map(itemConv::toDTO).collect(Collectors.toList()));

        dto.setSubtotal(nz(cart.getSubtotal()));
        dto.setGrandTotal(cart.getGrandTotal() != null ? cart.getGrandTotal() : dto.getSubtotal());
        return dto;
    }

    private BigDecimal nz(BigDecimal v){ return v==null? BigDecimal.ZERO : v; }
}



