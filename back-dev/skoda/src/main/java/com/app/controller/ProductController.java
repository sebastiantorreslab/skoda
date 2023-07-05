package com.app.controller;

import com.app.dto.EngineDTO;
import com.app.dto.ProductDTO;
import com.app.service.IProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/product")
public class ProductController {

    @Autowired
    IProductService productService;



    @PostMapping("/save")
    public ResponseEntity save(@RequestBody ProductDTO productDTO){
        if(productDTO != null){
            productService.saveProduct(productDTO);
        }else{

        }
        return ResponseEntity.ok("200");
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<ProductDTO>> findAll(){
        Set<ProductDTO> engines_set = productService.findAllProducts();
        return new ResponseEntity<>(engines_set, HttpStatus.OK);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<ProductDTO> findById(@PathVariable("id") Long id){
    ProductDTO productDTO = productService.findById(id).orElse(null);
        return new ResponseEntity<>(productDTO,HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity update(@RequestBody ProductDTO productDTO){
        if(productDTO!= null ){
            productService.updateProduct(productDTO);
        }else {

        }
        return ResponseEntity.ok("200");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id){
        if(id != null){
            productService.deleteProduct(id);
        }
        return  ResponseEntity.ok("200");
    }


}
