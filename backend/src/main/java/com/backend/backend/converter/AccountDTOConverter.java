package com.backend.backend.converter;
import com.backend.backend.model.AccountDTO;
import com.backend.backend.model.ProfileDTO;
import com.backend.backend.repository.AccountRepository;
import com.backend.backend.repository.entity.AccountEntity;
import com.backend.backend.repository.entity.AdminEntity;
import com.backend.backend.repository.entity.UserEntity;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class AccountDTOConverter {
    @Autowired private AccountRepository accountRepository;
    @Autowired private ModelMapper modelMapper;
    public AccountDTO toAccountDTO(AccountEntity item) {
        AccountDTO accountDTO = modelMapper.map(item, AccountDTO.class);
        ProfileDTO profileDTO = null;

        if(item.getRole().equals("ADMIN")) {
            AdminEntity adminEntity = item.getAdmin();
            if (adminEntity != null) {
                profileDTO = modelMapper.map(adminEntity, ProfileDTO.class);
            }
        } else {
            UserEntity userEntity = item.getUser();
            if (userEntity != null) {
                profileDTO = modelMapper.map(userEntity, ProfileDTO.class);
            }
        }
        accountDTO.setProfile(profileDTO);
        return accountDTO;
    }
}