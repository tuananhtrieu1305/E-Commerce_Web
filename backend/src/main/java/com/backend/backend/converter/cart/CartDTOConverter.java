package com.backend.backend.converter.cart;

import com.backend.backend.model.cart.CartDTO;
import com.backend.backend.model.cart.CartItemDTO;
import com.backend.backend.repository.cart.entity.Cart;
import com.backend.backend.repository.cart.entity.CartItem;
import com.backend.backend.repository.product.ProductRepository;
import com.backend.backend.repository.product.entity.ProductEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor

public class CartDTOConverter {

    private final CartItemDTOConverter itemConv;
    private final ProductRepository productRepo; // <- thêm repo

    public CartDTO toDTO(Cart cart) {
        if (cart == null) return null;

        CartDTO dto = new CartDTO();
        dto.setId(cart.getId());
        dto.setUserId(cart.getUserId());

        List<CartItemDTO> itemDTOs = new ArrayList<>();
        dto.setItems(itemDTOs);

        List<CartItem> items = (cart.getItems() != null) ? cart.getItems() : Collections.emptyList();

        // 1) Gom productId
        Set<Integer> pids = new HashSet<>();
        for (CartItem it : items) {
            if (it != null && it.getProductId() != null) pids.add(it.getProductId());
        }

        // 2) Tải products một lần
        List<ProductEntity> products = pids.isEmpty() ? Collections.emptyList() : productRepo.findAllById(pids);

        // 3) Map id -> title
        Map<Integer, String> idToTitle = new HashMap<>();
        for (ProductEntity p : products) {
            if (p != null) idToTitle.put(p.getId(), p.getTitle()); // hoặc p.getName()
        }

        // 4) Convert từng item và gán productTitle
        for (CartItem it : items) {
            if (it == null) continue;
            CartItemDTO ci = itemConv.toDTO(it);

            Integer pid = it.getProductId();
            String title = (pid != null) ? idToTitle.get(pid) : null;
            if (title == null && pid != null) title = "Sản phẩm ID: " + pid; // fallback đơn giản

            ci.setProductTitle(title);
            itemDTOs.add(ci);
        }

        dto.setSubtotal(nz(cart.getSubtotal()));
        dto.setGrandTotal(cart.getGrandTotal() != null ? cart.getGrandTotal() : dto.getSubtotal());
        return dto;
    }

    private BigDecimal nz(BigDecimal v){ return v==null? BigDecimal.ZERO : v; }
}



