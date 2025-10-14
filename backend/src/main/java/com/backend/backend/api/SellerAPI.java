package com.backend.backend.api;

import com.backend.backend.model.product.SellerDTO;
import com.backend.backend.service.seller.SellerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/seller")
public class SellerAPI {
    @Autowired
    private SellerService sellerService;

    @GetMapping
    public List<SellerDTO> getSeller() {
        List<SellerDTO> res = sellerService.getSeller();
        return res;
    }
}
