package com.backend.backend.api;

import com.backend.backend.model.order.OrderDTO;
import com.backend.backend.service.order.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class OrderAPI {
    @Autowired
    private OrderService orderService;

    @GetMapping(value = "/api/order/")
    public List<OrderDTO> getOrder(@RequestParam Map<String, Object> params) {
        List<OrderDTO> res = orderService.getOrder(params);
        return res;
    }
    @GetMapping(value = "/api/order/history/{userId}")
    public List<OrderDTO> getOrderHistory(@PathVariable Integer userId,
                                          @RequestParam(required = false) Map<String, Object> params) {
        params.put("customer_id", userId);
        List<OrderDTO> res = orderService.getOrder(params);
        return res;
    }



    @PostMapping(value = "/api/order/")
    public OrderDTO createOrder(@RequestBody Map<String, Object> body) {
        OrderDTO res = orderService.createOrder(body);
        return res;
    }

    @PutMapping(value = "/api/order/{id}")
    public void updateOrder(@PathVariable Integer id, @RequestBody Map<String, Object> body) {
        orderService.updateOrder(id, body);
    }

    @DeleteMapping(value = "/api/order/{id}")
    public void deleteOrder(@PathVariable Integer id) {
        orderService.deleteOrder(id);
    }

}
