package com.backend.backend.repository.custom;

import com.backend.backend.builder.AccountSearchBuilder;
import com.backend.backend.model.AccountDTO;

import java.util.List;

public interface AccountRepositoryCustom {
    List<AccountDTO> getAccount(AccountSearchBuilder accountSearchBuilder);
}