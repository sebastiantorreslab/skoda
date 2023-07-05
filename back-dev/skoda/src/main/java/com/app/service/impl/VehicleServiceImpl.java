package com.app.service.impl;
import com.app.dto.VehicleDTO;
import com.app.model.Customer;
import com.app.model.Engine;
import com.app.model.Product;
import com.app.model.Vehicle;
import com.app.repository.CustomerRepository;
import com.app.repository.EngineRepository;
import com.app.repository.ProductRepository;
import com.app.repository.VehicleRepository;
import com.app.service.IVehicleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class VehicleServiceImpl implements IVehicleService {


    private final ModelMapper mapper = new ModelMapper();

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private EngineRepository engineRepository;

    @Autowired
    private ProductRepository productRepository;


    @Override
    public Set<VehicleDTO> findAllVehicles() {
        VehicleDTO vehicleDTO = null;
        Set<VehicleDTO> vehicleDTOSet = new HashSet<>();
        List<Vehicle> vehiclesList = vehicleRepository.findAll();
        if(vehiclesList.size() > 0) {
            for(Vehicle vehicle: vehiclesList){
                vehicleDTO = mapper.map(vehicle,VehicleDTO.class);
                vehicleDTOSet.add(vehicleDTO);
            }
        }else{

        }

        return vehicleDTOSet;
    }

    @Override
    public void saveVehicle(VehicleDTO vehicleDTO) {
        if(vehicleDTO != null){
            Vehicle vehicle = mapper.map(vehicleDTO,Vehicle.class);
            vehicleRepository.save(vehicle);
        }else {
            // todo: manejo global de excepciones
        }

    }

    @Override
    public void setCustomerVehicle(Long customer_id, Long vehicle_id){
        Customer customer = customerRepository.findById(customer_id).orElse(null);
        Vehicle vehicle = vehicleRepository.findById(vehicle_id).orElse(null);

        Set<Vehicle> vehicles_set = new HashSet<>();
        vehicles_set.add(vehicle);
        customer.setVehicleSet(vehicles_set);
        customerRepository.save(customer);

        vehicle.setCustomer(customer);
        vehicleRepository.save(vehicle);

    }

    @Override
    public void setEngineVehicle(Long engine_id, Long vehicle_id){
        Engine engine = engineRepository.findById(engine_id).orElse(null);
        Vehicle vehicle = vehicleRepository.findById(vehicle_id).orElse(null);

        vehicle.setEngine(engine);
        vehicleRepository.save(vehicle);

        Set<Vehicle> vehicleSet = new HashSet<>();
        vehicleSet.add(vehicle);
        engine.setVehicleSet(vehicleSet);
        engineRepository.save(engine);

    }

    @Override
    public void setProductVehicle(Long product_id, Long vehicle_id){
        Product product = productRepository.findById(product_id).orElse(null);
        Vehicle vehicle = vehicleRepository.findById(vehicle_id).orElse(null);


        Set<Product> productSet = new HashSet<>();
        productSet.add(product);
        vehicle.setProductSet(productSet);
        vehicleRepository.save(vehicle);

        Set<Vehicle> vehicleSet = new HashSet<>();
        vehicleSet.add(vehicle);
        product.setVehicleSet(vehicleSet);
        productRepository.save(product);
    }

    @Override
    public Optional<VehicleDTO> findById(Long id) {
        VehicleDTO vehicleDTO = null;
        Optional<Vehicle> vehicle = vehicleRepository.findById(id);
        if(vehicle != null){
            vehicleDTO = mapper.map(vehicle,VehicleDTO.class);
        }else {
            // todo: manejo global de excepciones
        }
        return Optional.ofNullable(vehicleDTO);
    }

    @Override
    public void updateVehicle(VehicleDTO vehicleDTO) {
        if(vehicleDTO != null){
            Vehicle vehicle = vehicleRepository.findById(vehicleDTO.getId()).orElse(null);
            vehicleRepository.save(vehicle);
        }else {
            // todo: manejo global de excepciones
        }

    }

    @Override
    public void deleteVehicle(Long id) {
        Vehicle vehicle = vehicleRepository.findById(id).orElse(null);
        if(vehicle != null){
            vehicleRepository.deleteById(id);
        }else {
            // todo: manejo global de excepciones
        }

    }
}
