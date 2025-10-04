package com.backend.backend.api;

import com.backend.backend.model.account.AccountDTO;
import com.backend.backend.model.account.UserListDTO;
import com.backend.backend.service.account.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class AccountAPI {

    @Autowired
    private AccountService accountService;

    @GetMapping(value = "/api/account/")
    public List<AccountDTO> getAccount(@RequestParam Map<String, Object> params) {
        List<AccountDTO> res = accountService.getAccount(params);
        return res;
    }

    @PostMapping(value = "/api/account/")
    public AccountDTO createAccount(@RequestBody Map<String, Object> body) {
        return accountService.createAccount(body);
    }

    @PostMapping("/api/accounts/batch")
    public List<AccountDTO> createListAccounts(@RequestBody List<Map<String, Object>> bodyList) {
        return accountService.createListAccounts(bodyList);
    }


    @PutMapping(value = "/api/account/{id}")
    public void updateAccount(@PathVariable Integer id, @RequestBody Map<String, Object> body) {
        accountService.updateAccount(id, body);
    }

    @DeleteMapping(value = "/api/account/{id}")
    public void deleteAccount(@PathVariable Integer id) {
        accountService.deleteAccount(id);
    }

    @GetMapping(value = "/api/account/user_list")
    public List<UserListDTO> getUserList() {
        return accountService.getUserList();
    }
}