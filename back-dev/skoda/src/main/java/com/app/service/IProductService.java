package com.app.service;



import com.app.dto.ProductDTO;


import java.util.Optional;
import java.util.Set;

public interface IProductService {

    Set<ProductDTO> findAllProducts();
    void saveProduct(ProductDTO productDTO);
    Optional<ProductDTO> findById(Long id);
    void updateProduct(ProductDTO productDTO);
    void deleteProduct(Long id);
}
