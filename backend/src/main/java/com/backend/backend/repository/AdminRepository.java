package com.backend.backend.repository;

import com.backend.backend.repository.entity.AdminEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<AdminEntity, Integer> {
}