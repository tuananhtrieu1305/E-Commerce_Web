package com.backend.backend.repository.payment;

import com.backend.backend.repository.payment.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PaymentRepository extends JpaRepository<PaymentEntity, Integer> {
    PaymentEntity findByOrder_Id(Integer orderId);
}
