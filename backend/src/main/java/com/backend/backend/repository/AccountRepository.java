package com.backend.backend.repository;

import com.backend.backend.repository.custom.AccountRepositoryCustom;
import com.backend.backend.repository.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AccountRepository extends JpaRepository<AccountEntity, Integer>, AccountRepositoryCustom    {
}