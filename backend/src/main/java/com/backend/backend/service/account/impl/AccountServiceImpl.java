package com.backend.backend.service.account.impl;

import com.backend.backend.builder.account.AccountSearchBuilder;
import com.backend.backend.converter.account.AccountDTOConverter;
import com.backend.backend.converter.account.AccountSearchBuilderConverter;
import com.backend.backend.model.account.UserListDTO;
import com.backend.backend.model.account.AccountDTO;
import com.backend.backend.repository.account.AccountRepository;
import com.backend.backend.repository.account.AdminRepository;
import com.backend.backend.repository.account.UserRepository;
import com.backend.backend.repository.account.entity.AccountEntity;
import com.backend.backend.repository.account.entity.AdminEntity;
import com.backend.backend.repository.account.entity.UserEntity;
import com.backend.backend.service.account.AccountService;

import com.backend.backend.utils.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.ArrayList;
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
    public List<AccountDTO> createListAccounts(List<Map<String, Object>> bodyList) {
        List<AccountEntity> entities = new ArrayList<>();

        for (Map<String, Object> body : bodyList) {
            String username = (String) body.get("username");
            String email = (String) body.get("email");

            if (accountRepository.existsByUsernameAndDeletedFalse(username)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, username + " already existed!");
            }
            if (accountRepository.existsByEmailAndDeletedFalse(email)) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, email + " already existed!");
            }

            AccountEntity account = new AccountEntity();
            account.setUsername(username);
            account.setEmail(email);
            account.setRole((String) body.get("role"));
            account.setCreated_at(LocalDateTime.now());
            account.setUpdated_at(LocalDateTime.now());
            account.setPassword(passwordEncoder.encode((String) body.get("password")));

            if ("USER".equalsIgnoreCase(account.getRole())) {
                UserEntity user = new UserEntity();
                user.setAccount(account);
                account.setUser(user);
            } else if ("ADMIN".equalsIgnoreCase(account.getRole())) {
                AdminEntity admin = new AdminEntity();
                admin.setAccount(account);
                account.setAdmin(admin);
            }

            entities.add(account);
        }

        List<AccountEntity> savedEntities = accountRepository.saveAllAndFlush(entities);

        return savedEntities.stream()
                .map(accountDTOConverter::toAccountDTO)
                .toList();
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
            if (body.containsKey("image")) {
                String base64Image = (String) body.get("image");
                if (base64Image != null && !base64Image.isEmpty()) {
                    String imagePath = ImageUtil.saveImage(base64Image);
                    user.setImage(imagePath);
                }
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
            if (body.containsKey("image")) {
                String base64Image = (String) body.get("image");
                if (base64Image != null && !base64Image.isEmpty()) {
                    String imagePath = ImageUtil.saveImage(base64Image);
                    admin.setImage(imagePath);
                }
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

    @Transactional
    @Override
    public List<UserListDTO> getUserList() {
        List<UserEntity> users = userRepository.findAll();
        List<UserListDTO> res = new ArrayList<>();
        for(UserEntity user : users) {
            UserListDTO userListDTO = new UserListDTO();
            userListDTO.setId(user.getId());
            userListDTO.setName(user.getFullname());
            userListDTO.setAddress(user.getAddress());
            res.add(userListDTO);
        }
        return res;
    }
}