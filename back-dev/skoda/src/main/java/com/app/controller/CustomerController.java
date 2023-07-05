package com.app.controller;
import com.app.dto.CustomerDTO;
import com.app.service.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/customer")
public class CustomerController {
    @Autowired
     private ICustomerService customerService;

    @PostMapping("/save")
    public ResponseEntity save(@RequestBody CustomerDTO customerDTO) {
        customerService.saveCustomer(customerDTO);
        return ResponseEntity.ok("200");
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<CustomerDTO>> findAll(){
        Set<CustomerDTO> customers_set = customerService.findAllCustomers();
        return new ResponseEntity<>(customers_set, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<CustomerDTO> findById(@PathVariable("id") Long id){
        CustomerDTO customerDTO = customerService.findById(id).orElse(null);
        return new ResponseEntity<>(customerDTO,HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity update(@RequestBody CustomerDTO customerDTO){
        customerService.updateCustomer(customerDTO);
        return ResponseEntity.ok("customer updated");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteCustomer(@PathVariable("id") Long id){
        customerService.deleteCustomer(id);
        return ResponseEntity.ok("customer deleted");

    }



}
