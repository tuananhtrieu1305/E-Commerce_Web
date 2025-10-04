package com.backend.backend.repository.product;

import com.backend.backend.repository.product.custom.ProductRepositoryCustom;
import com.backend.backend.repository.product.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer>, ProductRepositoryCustom {
}
