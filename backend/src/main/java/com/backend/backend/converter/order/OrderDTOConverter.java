package com.backend.backend.converter.order;

import com.backend.backend.model.order.OrderDTO;
import com.backend.backend.model.order.OrderItemDTO;
import com.backend.backend.repository.order.entity.OrderEntity;
import com.backend.backend.repository.order.entity.OrderItemEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class OrderDTOConverter {

    @Autowired
    private ModelMapper modelMapper;

    public OrderDTO toOrderDTO(OrderEntity order) {
        OrderDTO orderDTO = modelMapper.map(order, OrderDTO.class);

        if (order.getUser() != null) {
            orderDTO.setCustomer_id(order.getUser().getId());
            if (order.getUser().getAccount() != null) {
                orderDTO.setCustomer_name(order.getUser().getFullname());
            }
        }

        if (order.getOrderItems() != null && !order.getOrderItems().isEmpty()) {
            List<OrderItemDTO> orderItemDTOs = order.getOrderItems().stream()
                    .map(this::convertToOrderItemDTO)
                    .collect(Collectors.toList());
            orderDTO.setOrder_items(orderItemDTOs);
        }

        if (order.getPayment() != null) {
            orderDTO.setPayment_status(order.getPayment().getStatus());
        } else {
            orderDTO.setPayment_status("PENDING");
        }

        return orderDTO;
    }

    private OrderItemDTO convertToOrderItemDTO(OrderItemEntity orderItem) {
        OrderItemDTO orderItemDTO = modelMapper.map(orderItem, OrderItemDTO.class);

        // Set product info
        if (orderItem.getProduct() != null) {
            orderItemDTO.setProd_id(orderItem.getProduct().getId());
            orderItemDTO.setProduct_name(orderItem.getProduct().getTitle());
            orderItemDTO.setTotal_price(orderItem.getItem_price() * orderItem.getItem_quantity());
        }

        return orderItemDTO;
    }
}