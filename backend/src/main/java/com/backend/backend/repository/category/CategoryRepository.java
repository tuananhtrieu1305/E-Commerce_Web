package com.backend.backend.repository.category;

import com.backend.backend.repository.category.custom.CategoryRepositoryCustom;
import com.backend.backend.repository.product.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer>, CategoryRepositoryCustom {
}
