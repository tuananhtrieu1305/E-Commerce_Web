package com.backend.backend.repository.order;

import com.backend.backend.repository.order.custom.OrderRepositoryCustom;
import com.backend.backend.repository.order.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<OrderEntity, Integer>, OrderRepositoryCustom {
}
