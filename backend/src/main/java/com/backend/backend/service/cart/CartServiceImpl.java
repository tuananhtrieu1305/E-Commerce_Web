package com.backend.backend.service.cart;

import com.backend.backend.converter.cart.CartDTOConverter;
import com.backend.backend.model.cart.CartDTO;
import com.backend.backend.repository.cart.CartItemRepository;
import com.backend.backend.repository.cart.CartRepository;
import com.backend.backend.repository.cart.entity.Cart;
import com.backend.backend.repository.cart.entity.CartItem;
import com.backend.backend.repository.product.ProductRepository;
import com.backend.backend.repository.product.entity.ProductEntity;
import com.backend.backend.service.order.OrderService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.*;

@Service
@Transactional
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private  final CartRepository cartRepo ;
    private final CartItemRepository itemRepo;
    private final ProductRepository productRepo;
    private final OrderService orderService;
    private final CartDTOConverter cartConv;

    private static final int MONEY_SCALE = 0; //
    private static final RoundingMode MONEY_RM = RoundingMode.HALF_UP;

    private void reprice(Cart cart) {
        if (cart == null) return;
        BigDecimal subtotal = BigDecimal.ZERO;

        if (cart.getItems() != null) {
            for (CartItem i : cart.getItems()) {
                BigDecimal unit = i.getUnitPrice() == null ? BigDecimal.ZERO : i.getUnitPrice();
                int qty = (i.getQuantity() == null || i.getQuantity() < 0) ? 0 : i.getQuantity();

                BigDecimal line = unit.multiply(BigDecimal.valueOf(qty))
                        .setScale(MONEY_SCALE, MONEY_RM);

                i.setLineTotal(line);
                subtotal = subtotal.add(line);
            }
        }

        subtotal = subtotal.setScale(MONEY_SCALE, MONEY_RM);
        cart.setSubtotal(subtotal);
        cart.setGrandTotal(subtotal);
    }

    public CartDTO getCart(Integer userId) {
        Cart cart = cartRepo.findByUserId(userId)
                .orElseGet(() -> {
                    Cart c = new Cart();
                    c.setUserId(userId);
                    return cartRepo.save(c);
                });

        reprice(cart);
        return cartConv.toDTO(cart);
    }




//    public Long checkoutSelected(Integer userId) {
//        Cart cart = cartRepo.findByUserId(userId)
//                .orElseThrow(() -> new EntityNotFoundException("Cart not found"));
//
//        List<CartItem> chosen = cart.getItems() == null ? List.of() :
//                cart.getItems().stream()
//                        .filter(i -> Boolean.TRUE.equals(i.getSelected()))
//                        .collect(Collectors.toList());
//        if (chosen.isEmpty())
//            throw new IllegalStateException("No items selected");
//
//        Cart shadow = new Cart();
//        shadow.setUserId(cart.getUserId());
//        for (CartItem i : chosen) {
//            CartItem copy = new CartItem();
//            copy.setCart(shadow);
//            copy.setProductId(i.getProductId());
//            copy.setUnitPrice(i.getUnitPrice());
//            copy.setQuantity(i.getQuantity());
//            copy.setSelected(true);
//            shadow.getItems().add(copy);
//        }
//        reprice(shadow);
//
//        Long orderId = orderService.createFromCart(shadow);
//
//
//        cart.getItems().removeIf(i -> Boolean.TRUE.equals(i.getSelected()));
//        reprice(cart);
//        cartRepo.save(cart);
//
//        return orderId;
//    }



    public CartDTO addItem(Integer userId, Integer productId, int qty) {
        if (qty <= 0) throw new IllegalArgumentException("Quantity must be > 0");

        Cart cart = cartRepo.findByUserId(userId)
                .orElseGet(() -> {
                    Cart c = new Cart();
                    c.setUserId(userId);
                    return cartRepo.save(c);
                });

        ProductEntity product = productRepo.findById(productId)
                .orElseThrow(() -> new EntityNotFoundException("Product not found"));

        BigDecimal price = BigDecimal.valueOf(product.getPrice());

        int pid = productId;

        CartItem item = cart.getItems().stream()
                .filter(i -> pid == i.getProductId())
                .findFirst()
                .orElseGet(() -> {
                    CartItem it = new CartItem();
                    it.setCart(cart);
                    it.setProductId(pid);
                    it.setUnitPrice(price);
                    it.setQuantity(0);
                    cart.getItems().add(it);
                    return it;
                });

        item.setQuantity(item.getQuantity() + qty);
        item.setLineTotal(item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())));

        reprice(cart);
        cartRepo.save(cart);
        return cartConv.toDTO(cart);
    }
    public CartDTO changeQty(Integer userId, Integer itemId, int delta) {
        CartItem it = itemRepo.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Cart item not found"));
//        if (!it.getCart().getUserId().equals(userId)) throw new SecurityException("Forbidden");

        int newQty = it.getQuantity() + delta;
        if (newQty <= 0) {
            it.getCart().getItems().remove(it);
            itemRepo.delete(it);
        } else {
            it.setQuantity(newQty);
        }
        reprice(it.getCart());
        return cartConv.toDTO(cartRepo.save(it.getCart()));
    }
    public void removeItem(Integer itemId) {
        CartItem item = itemRepo.findById(itemId)
                .orElseThrow(() -> new EntityNotFoundException("Cart item not found"));
        Cart cart = item.getCart();
        cart.getItems().remove(item);
        itemRepo.delete(item);
        reprice(cart);
        cartRepo.save(cart);
    }






}
