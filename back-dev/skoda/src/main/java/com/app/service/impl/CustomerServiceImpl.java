package com.app.service.impl;
import com.app.dto.CustomerDTO;
import com.app.model.Customer;
import com.app.repository.CustomerRepository;
import com.app.service.ICustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class CustomerServiceImpl implements ICustomerService {


    private final ModelMapper mapper = new ModelMapper();

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public Set<CustomerDTO> findAllCustomers() {
        List<Customer> customerList = customerRepository.findAll();
        Set<CustomerDTO> customerDTOSet = new HashSet<>();

        for(Customer customer: customerList){
            CustomerDTO customerDTO = mapper.map(customer,CustomerDTO.class);
            customerDTOSet.add(customerDTO);
        }
        return customerDTOSet;
    }

    @Override
    public void saveCustomer(CustomerDTO customerDTO) {
        if(customerDTO != null){
            Customer customer = mapper.map(customerDTO,Customer.class);
            customerRepository.save(customer);
        }else{
            //todo: manejo global de excepciones
        }
    }

    @Override
    public Optional<CustomerDTO> findById(Long id) {
        CustomerDTO customerDTO = null;
        Optional<Customer> customer = customerRepository.findById(id);

        if(customer != null){
           customerDTO = mapper.map(customer,CustomerDTO.class);
        }else{
            //todo: manejo global de excepciones
        }
        return Optional.ofNullable(customerDTO);
    }

    @Override
    public void updateCustomer(CustomerDTO customerDTO) {
       Customer customer = customerRepository.findById(customerDTO.getId()).orElse(null);
        if(customer.getId() != null){
             customer = mapper.map(customerDTO,Customer.class);
            customerRepository.save(customer);
        }else{
            //todo: manejo global de excepciones
        }

    }

    @Override
    public void deleteCustomer(Long id) {
        Customer customer = customerRepository.findById(id).orElse(null);
        if(customer.getId() != null){
            customerRepository.deleteById(id);
        }else{
            //todo: manejo global de excepciones
        }

    }
}
