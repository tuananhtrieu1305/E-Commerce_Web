package com.backend.backend.repository.category;

import com.backend.backend.repository.category.custom.CategoryRepositoryCustom;
import com.backend.backend.repository.category.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Integer>, CategoryRepositoryCustom {
    @Query("SELECT COUNT(c) > 0 FROM CategoryEntity c WHERE c.cate_name = :cateName")
    boolean existsByCateName(@Param("cateName") String cateName);

    @Query("SELECT c FROM CategoryEntity c WHERE c.cate_name = :cateName")
    CategoryEntity findByCateName(@Param("cateName") String cateName);
}
