package com.backend.backend.repository.custom.impl;

import com.backend.backend.builder.AccountSearchBuilder;
import com.backend.backend.model.AccountDTO;
import com.backend.backend.model.ProfileDTO;
import com.backend.backend.repository.custom.AccountRepositoryCustom;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Field;
import java.sql.*;
import java.util.*;

@Repository
public class AccountRepositoryImpl implements AccountRepositoryCustom
{
    @PersistenceContext
    private EntityManager entityManager;

    public static void joinTable(AccountSearchBuilder accountSearchBuilder, StringBuilder sql) {
        String role = accountSearchBuilder.getRole();
        if(role.equals("USER")) {
            sql.append("SELECT a.id, a.username, a.password, a.email, a.role, a.created_at, a.updated_at, u.id, u.fullname," +
                    " " +
                    "u.address, u.image FROM accounts a ");
            sql.append("JOIN users u ON a.id = u.account_id ");
        } else if(role.equals("ADMIN")) {
            sql.append("SELECT a.id, a.username, a.password, a.email, a.role, a.created_at, a.updated_at, ad.id, ad" +
                    ".fullname," +
                    " ad" +
                    ".address, ad.image FROM accounts a ");
            sql.append("JOIN admins ad ON a.id = ad.account_id ");
        }
    }

    public static void query(AccountSearchBuilder accountSearchBuilder, StringBuilder where) {
        try {
            Field[] fields = accountSearchBuilder.getClass().getDeclaredFields();
            for(Field item : fields) {
                item.setAccessible(true);
                String FieldName = item.getName();

                if(FieldName.equals("created_at") || FieldName.equals("updated_at") || FieldName.equals("role")) {
                    continue;
                }

                Object fieldValue = item.get(accountSearchBuilder);
                if (fieldValue == null) {
                    continue;
                }
                String value = item.get(accountSearchBuilder).toString();

                if(FieldName.equals("fullname") || FieldName.equals("address")) {
                    if("USER".equals(accountSearchBuilder.getRole())) {
                        where.append("AND u.").append(FieldName).append(" LIKE '%").append(value).append("%' ");
                    } else if("ADMIN".equals(accountSearchBuilder.getRole())) {
                        where.append("AND ad.").append(FieldName).append(" LIKE '%").append(value).append("%' ");
                    }
                    continue;
                }

                if(FieldName.equals("id")) {
                    where.append("AND a.").append(FieldName).append(" = ").append(value).append(" ");
                } else {
                    where.append("AND a.").append(FieldName).append(" LIKE '%").append(value).append("%' ");
                }
            }
        } catch(Exception ex) {
            ex.printStackTrace();
        }
    }

    @Override
    public List<AccountDTO> getAccount(AccountSearchBuilder accountSearchBuilder) {
        StringBuilder sql = new StringBuilder();
        joinTable(accountSearchBuilder,sql);
        StringBuilder where = new StringBuilder("WHERE 1 = 1 ");
        query(accountSearchBuilder, where);
        sql.append(where);
        Query query = entityManager.createNativeQuery(sql.toString());
        List<Object[]> results = query.getResultList();
        List<AccountDTO> accounts = new ArrayList<>();

        for (Object[] row : results) {
            AccountDTO dto = new AccountDTO();
            dto.setId((Integer) row[0]);
            dto.setUsername((String) row[1]);
            dto.setEmail((String) row[3]);
            dto.setRole((String) row[4]);
            dto.setCreated_at(row[5] != null ? ((Timestamp) row[5]).toLocalDateTime() : null);
            dto.setUpdated_at(row[6] != null ? ((Timestamp) row[6]).toLocalDateTime() : null);

            ProfileDTO profile = new ProfileDTO();
            profile.setId((Integer) row[7]);
            profile.setFullname((String) row[8]);
            profile.setAddress((String) row[9]);
            if (row[10] != null) {
                profile.setImage(Base64.getEncoder().encodeToString((byte[]) row[9]));
            }

            dto.setProfile(profile);
            accounts.add(dto);
        }
        return accounts;
    }

//    @Override
//    public void updateAccount(AccountDTO accountDTO) {
//        String updateAccountSql = "UPDATE accounts SET username = ?, email = ?, role = ?, updated_at = NOW() WHERE id = ?";
//        entityManager.createNativeQuery(updateAccountSql)
//                .setParameter(1, accountDTO.getUsername())
//                .setParameter(2, accountDTO.getEmail())
//                .setParameter(3, accountDTO.getRole())
//                .setParameter(4, accountDTO.getId())
//                .executeUpdate();
//
//        if ("USER".equals(accountDTO.getRole())) {
//            String updateUserSql = "UPDATE users SET fullname = ?, address = ? WHERE account_id = ?";
//            entityManager.createNativeQuery(updateUserSql)
//                    .setParameter(1, accountDTO.getProfile().getFullname())
//                    .setParameter(2, accountDTO.getProfile().getAddress())
//                    .setParameter(3, accountDTO.getId())
//                    .executeUpdate();
//        } else if ("ADMIN".equals(accountDTO.getRole())) {
//            String updateAdminSql = "UPDATE admins SET fullname = ?, address = ? WHERE account_id = ?";
//            entityManager.createNativeQuery(updateAdminSql)
//                    .setParameter(1, accountDTO.getProfile().getFullname())
//                    .setParameter(2, accountDTO.getProfile().getAddress())
//                    .setParameter(3, accountDTO.getId())
//                    .executeUpdate();
//        }
//    }
}