package com.backend.backend.service.order.impl;

import com.backend.backend.builder.order.OrderItemSearchBuilder;
import com.backend.backend.builder.order.OrderSearchBuilder;
import com.backend.backend.converter.order.OrderDTOConverter;
import com.backend.backend.converter.order.OrderSearchBuilderConverter;
import com.backend.backend.model.order.OrderDTO;
import com.backend.backend.repository.account.UserRepository;
import com.backend.backend.repository.account.entity.UserEntity;
import com.backend.backend.repository.cart.CartRepository;
import com.backend.backend.repository.order.OrderItemRepository;
import com.backend.backend.repository.order.OrderRepository;
import com.backend.backend.repository.order.entity.OrderEntity;
import com.backend.backend.repository.order.entity.OrderItemEntity;
import com.backend.backend.repository.payment.PaymentRepository;
import com.backend.backend.repository.payment.entity.PaymentEntity;
import com.backend.backend.repository.product.ProductRepository;
import com.backend.backend.repository.product.entity.ProductEntity;
import com.backend.backend.service.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderSearchBuilderConverter orderSearchBuilderConverter;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderDTOConverter orderDTOConverter;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private CartRepository cartRepository;


    @Override
    public List<OrderDTO> getOrder(Map<String, Object> params) {
        OrderSearchBuilder orderSearchBuilder = orderSearchBuilderConverter.paramsToBuilder(params);
        return orderRepository.getOrder(orderSearchBuilder);
    }

    @Transactional
    @Override
    public OrderDTO createOrder(Map<String, Object> body) {

        OrderSearchBuilder orderSearchBuilder = orderSearchBuilderConverter.bodyToBuilder(body);
        OrderEntity savedOrder = orderRepository.createOrder(orderSearchBuilder);

        PaymentEntity payment = new PaymentEntity();
        payment.setOrder(savedOrder);
        String method = orderSearchBuilder.getPaymentMethod();
        if (method == null) method = "COD";

        if (method.equalsIgnoreCase("BANK")) {
            payment.setMethod("BANK");
            payment.setStatus("PENDING_PAYMENT");
        } else {
            payment.setMethod("COD");
            payment.setStatus("PENDING");
        }
        payment.setPaid_at(null);

        savedOrder.setPayment(payment);

        orderRepository.save(savedOrder);

        return orderDTOConverter.toOrderDTO(savedOrder);
    }




    @Transactional
    @Override
    public void updateOrder(Integer id, Map<String, Object> body) {
        OrderSearchBuilder orderSearchBuilder = orderSearchBuilderConverter.bodyToBuilder(body);
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found!"));

        if (order.getOrderItems() != null) {
            for (OrderItemEntity existingItem : order.getOrderItems()) {
                ProductEntity existingProduct = existingItem.getProduct();
                existingProduct.setStock(existingProduct.getStock() + existingItem.getItem_quantity());
                productRepository.save(existingProduct);
            }

            order.getOrderItems().clear();
        }

        order.setAddress(orderSearchBuilder.getAddress());
        order.setPhone(orderSearchBuilder.getPhone());
        order.setNote(orderSearchBuilder.getNote());
        order.setUpdated_at(LocalDateTime.now());

        int totalCost = 0;
        if (orderSearchBuilder.getOrder_items() != null) {
            for (OrderItemSearchBuilder item : orderSearchBuilder.getOrder_items()) {
                ProductEntity product = productRepository.findById(item.getProd_id())
                        .orElseThrow(() -> new RuntimeException("Product not found!"));

                if (product.getStock() < item.getQuantity()) {
                    throw new ResponseStatusException(
                            HttpStatus.BAD_REQUEST,
                            "Sản phẩm \"" + product.getTitle() + "\" không đủ tồn kho"
                    );
                }

                product.setStock(product.getStock() - item.getQuantity());
                productRepository.save(product);

                OrderItemEntity orderItem = new OrderItemEntity();
                orderItem.setProduct(product);
                orderItem.setItem_quantity(item.getQuantity());
                orderItem.setItem_price(product.getPrice());
                orderItem.setOrder(order);

                totalCost += product.getPrice() * item.getQuantity();

                order.getOrderItems().add(orderItem);
            }
        }

        order.setTotal_cost(totalCost);
        orderRepository.save(order);
    }

    @Transactional
    @Override
    public void deleteOrder(Integer id) {
        OrderEntity order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        if (order.getOrderItems() != null) {
            for (OrderItemEntity orderItem : order.getOrderItems()) {
                ProductEntity product = orderItem.getProduct();
                product.setStock(product.getStock() + orderItem.getItem_quantity());
                productRepository.save(product);
            }
        }

        orderRepository.deleteById(id);
    }
}
