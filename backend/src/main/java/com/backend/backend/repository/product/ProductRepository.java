package com.backend.backend.repository.product;

import com.backend.backend.repository.product.entity.ProductEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<ProductEntity, Integer>, JpaSpecificationExecutor<ProductEntity> {
    boolean existsByTitleAndDeletedFalse(String title);

    @Query(value = "SELECT * FROM products p WHERE p.title = :title LIMIT 1", nativeQuery = true)
    Optional<ProductEntity> findByTitleIncludeDeleted(@Param("title") String title);
}
