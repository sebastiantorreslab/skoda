package com.app.service.impl;

import com.app.dto.ProductDTO;
import com.app.model.Product;
import com.app.repository.ProductRepository;
import com.app.service.IProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class ProductServiceImpl implements IProductService {



    private final ModelMapper mapper = new ModelMapper();

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Set<ProductDTO> findAllProducts() {
        ProductDTO productDTO = null;
        Set<ProductDTO> products_set= new HashSet<>();
        List<Product> products_list = productRepository.findAll();
        for(Product product:products_list){
            productDTO  = mapper.map(product, ProductDTO.class);
            products_set.add(productDTO);
        }
        return products_set;
    }



    @Override
    public void saveProduct(ProductDTO productDTO) {
            if(productDTO != null){
                Product product = mapper.map(productDTO,Product.class);
                productRepository.save(product);
            }else{
                //todo: manejo global de excepciones
            }

    }

    @Override
    public Optional<ProductDTO> findById(Long id) {
        ProductDTO productDTO = null;
        Optional<Product> product = productRepository.findById(id);
        if(product != null){
            productDTO = mapper.map(product, ProductDTO.class);
        }else{
            //todo: manejo global de excepciones
        }
        return Optional.ofNullable(productDTO);
    }


    @Override
    public void updateProduct(ProductDTO productDTO) {
        if (productDTO != null) {
            Product product = productRepository.findById(productDTO.getId()).orElse(null);
            productRepository.save(product);
        }else {
            //todo: manejo global de excepciones
        }

    }

    @Override
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id).orElse(null);
        if(product != null){
            productRepository.deleteById(id);
        }else {
            //todo: manejo global de excepciones
        }

    }
}
