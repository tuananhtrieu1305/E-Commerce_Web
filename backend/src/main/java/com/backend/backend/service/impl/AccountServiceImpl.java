package com.backend.backend.service.impl;

import com.backend.backend.builder.AccountSearchBuilder;
import com.backend.backend.converter.AccountDTOConverter;
import com.backend.backend.converter.AccountSearchBuilderConverter;
import com.backend.backend.model.AccountDTO;
import com.backend.backend.repository.AccountRepository;
import com.backend.backend.repository.AdminRepository;
import com.backend.backend.repository.UserRepository;
import com.backend.backend.repository.entity.AccountEntity;
import com.backend.backend.repository.entity.AdminEntity;
import com.backend.backend.repository.entity.UserEntity;
import com.backend.backend.service.AccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AccountSearchBuilderConverter accountSearchBuilderConverter;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountDTOConverter accountDTOConverter;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<AccountDTO> getAccount(Map<String, Object> params) {
        AccountSearchBuilder accountSearchBuilder = accountSearchBuilderConverter.toBuilder(params);
        return accountRepository.getAccount(accountSearchBuilder);
    }

    @Transactional
    @Override
    public AccountDTO createAccount(Map<String, Object> body) {
        AccountEntity entity = new AccountEntity();

        entity.setUsername((String) body.get("username"));

        String rawPassword = (String) body.get("password");
        entity.setPassword(passwordEncoder.encode(rawPassword));

        entity.setEmail((String) body.get("email"));
        entity.setRole((String) body.get("role"));
        entity.setCreated_at(LocalDateTime.now());
        entity.setUpdated_at(LocalDateTime.now());

        AccountEntity saved = accountRepository.save(entity);

        if ("USER".equals(saved.getRole())) {
            UserEntity user = new UserEntity();
            user.setAccount(saved);
            userRepository.save(user);
        } else if ("ADMIN".equals(saved.getRole())) {
            AdminEntity admin = new AdminEntity();
            admin.setAccount(saved);
            adminRepository.save(admin);
        }

        return accountDTOConverter.toAccountDTO(saved);
    }

    @Transactional
    @Override
    public void updateAccount(Integer id, Map<String, Object> body) {
        AccountEntity account = accountRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        if (body.containsKey("username")) {
            account.setUsername((String) body.get("username"));
        }
        if (body.containsKey("email")) {
            account.setEmail((String) body.get("email"));
        }
        if (body.containsKey("role")) {
            account.setRole((String) body.get("role"));
        }
        account.setUpdated_at(LocalDateTime.now());

        if ("USER".equals(account.getRole())) {
            UserEntity user = account.getUser();
            if (user == null) {
                user = new UserEntity();
                user.setAccount(account);
            }
            if (body.containsKey("fullname")) {
                user.setFullname((String) body.get("fullname"));
            }
            if (body.containsKey("address")) {
                user.setAddress((String) body.get("address"));
            }
            userRepository.save(user);

        } else if ("ADMIN".equals(account.getRole())) {
            AdminEntity admin = account.getAdmin();
            if (admin == null) {
                admin = new AdminEntity();
                admin.setAccount(account);
            }
            if (body.containsKey("fullname")) {
                admin.setFullname((String) body.get("fullname"));
            }
            if (body.containsKey("address")) {
                admin.setAddress((String) body.get("address"));
            }
            adminRepository.save(admin);
        }

        accountRepository.save(account);
    }

    @Transactional
    @Override
    public void deleteAccount(Integer id) {
        accountRepository.deleteById(id);
    }
}