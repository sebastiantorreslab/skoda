package com.app.service;
import com.app.dto.CustomerDTO;
import java.util.Optional;
import java.util.Set;

public interface ICustomerService {
    
    Set<CustomerDTO> findAllCustomers();
    void saveCustomer(CustomerDTO customerDTO);
    Optional<CustomerDTO> findById(Long id);
    void updateCustomer(CustomerDTO customerDTO);
    void deleteCustomer(Long id);



}
