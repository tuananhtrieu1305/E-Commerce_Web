package com.backend.backend.converter;

import com.backend.backend.builder.AccountSearchBuilder;
import com.backend.backend.utils.MapUtil;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.Map;

@Component
public class AccountSearchBuilderConverter {
    public AccountSearchBuilder toBuilder(Map<String, Object> params) {
        return new AccountSearchBuilder.Builder()
                .setId(MapUtil.getObject(params, "id", Integer.class))
                .setUsername(MapUtil.getObject(params, "username", String.class))
                .setEmail(MapUtil.getObject(params, "email", String.class))
                .setRole(MapUtil.getObject(params, "role", String.class))
                .setCreated_at(MapUtil.getObject(params, "created_at", LocalDateTime.class))
                .setUpdated_at(MapUtil.getObject(params, "updated_at", LocalDateTime.class))
                .setFullname(MapUtil.getObject(params, "fullname", String.class))
                .setAddress(MapUtil.getObject(params, "address", String.class))
                .build();
    }
}