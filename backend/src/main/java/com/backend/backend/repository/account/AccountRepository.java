package com.backend.backend.repository.account;

import com.backend.backend.repository.account.custom.AccountRepositoryCustom;
import com.backend.backend.repository.account.entity.AccountEntity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AccountRepository extends JpaRepository<AccountEntity, Integer>, AccountRepositoryCustom    {
    boolean existsByUsernameAndDeletedFalse(String username);
    boolean existsByEmailAndDeletedFalse(String email);
}