package com.backend.backend.service.order;

import com.backend.backend.model.order.OrderDTO;

import java.util.List;
import java.util.Map;

public interface OrderService {
    List<OrderDTO> getOrder(Map<String, Object> params);
    OrderDTO createOrder( Map<String, Object> body);
    void updateOrder(Integer id, Map<String, Object> body);
    void deleteOrder(Integer id);
}
