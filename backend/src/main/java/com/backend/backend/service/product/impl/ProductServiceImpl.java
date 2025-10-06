package com.backend.backend.service.product.impl;

import com.backend.backend.builder.product.ProductSearchBuilder;
import com.backend.backend.converter.product.ProductDTOConverter;
import com.backend.backend.converter.product.ProductSearchBuilderConverter;
import com.backend.backend.model.product.ProductDTO;
import com.backend.backend.repository.category.CategoryRepository;
import com.backend.backend.repository.category.entity.CategoryEntity;
import com.backend.backend.repository.product.ProductImageRepository;
import com.backend.backend.repository.product.ProductRepository;
import com.backend.backend.repository.product.SellerRepository;
import com.backend.backend.repository.product.entity.ProductEntity;
import com.backend.backend.repository.product.entity.ProductImageEntity;
import com.backend.backend.repository.product.entity.SellerEntity;
import com.backend.backend.service.product.ProductService;
import com.backend.backend.utils.ImageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductSearchBuilderConverter productSearchBuilderConverter;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SellerRepository sellerRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductImageRepository productImageRepository;

    @Autowired
    private ProductDTOConverter productDTOConverter;

    @Override
    public List<ProductDTO> getProduct(Map<String, Object> params) {
        ProductSearchBuilder productSearchBuilder = productSearchBuilderConverter.paramsToBuilder(params);
        return productRepository.getProduct(productSearchBuilder);
    }

    @Override
    @Transactional
    public ProductDTO createProduct(Map<String, Object> body) {
        ProductSearchBuilder productSearchBuilder = productSearchBuilderConverter.bodyToBuilder(body);
        if(productRepository.existsByTitleAndDeletedFalse(productSearchBuilder.getTitle())) {
            throw new RuntimeException("Product with title '" + productSearchBuilder.getTitle() + "' already exists");
        }

        ProductEntity productEntity = new ProductEntity();
        productEntity.setTitle(productSearchBuilder.getTitle());
        productEntity.setProduct_info(productSearchBuilder.getProductInfo());
        productEntity.setPrice(productSearchBuilder.getPrice());
        productEntity.setStock(productSearchBuilder.getStock());
        productEntity.setCreated_at(LocalDateTime.now());
        productEntity.setUpdated_at(LocalDateTime.now());
        productEntity.setDeleted(false);

        SellerEntity seller = sellerRepository.findBySellerName(productSearchBuilder.getSellerName());
        if (seller == null) {
            seller = new SellerEntity();
            seller.setSeller_name(productSearchBuilder.getSellerName());
            seller.setSeller_info("Auto-created seller");
            seller = sellerRepository.save(seller);
        }
        productEntity.setSeller(seller);

        CategoryEntity category = categoryRepository.findByCateName(productSearchBuilder.getCategoryName());
        if (category == null) {
            category = new CategoryEntity();
            category.setCate_name(productSearchBuilder.getCategoryName());
            category = categoryRepository.save(category);
        }
        productEntity.setCategory(category);

        if (productSearchBuilder.getImages() != null && !productSearchBuilder.getImages().isEmpty()) {
            List<ProductImageEntity> imageEntities = new ArrayList<>();

            for (String base64Image : productSearchBuilder.getImages()) {
                if (base64Image != null && !base64Image.isEmpty()) {
                    String imagePath = ImageUtil.saveImage(base64Image);

                    ProductImageEntity imageEntity = new ProductImageEntity();
                    imageEntity.setImage_path(imagePath);
                    imageEntity.setProduct(productEntity);
                    imageEntities.add(imageEntity);
                }
            }

            productEntity.setImages(imageEntities);
        }

        ProductEntity savedProduct = productRepository.save(productEntity);

        return productDTOConverter.toProductDTO(savedProduct);
    }
}
