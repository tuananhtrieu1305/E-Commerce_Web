package com.backend.backend.service;

import com.backend.backend.model.AccountDTO;

import java.util.List;
import java.util.Map;

public interface AccountService {
    List<AccountDTO> getAccount(Map<String, Object> params);
    void updateAccount(Integer id, Map<String, Object> body);
    AccountDTO createAccount(Map<String, Object> body);
    void deleteAccount(Integer id);
}