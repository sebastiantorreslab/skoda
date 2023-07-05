package com.app.service;

import com.app.dto.VehicleDTO;

import java.util.Optional;
import java.util.Set;

public interface IVehicleService {

    Set<VehicleDTO> findAllVehicles();
    void saveVehicle(VehicleDTO vehicleDTO);

    void setCustomerVehicle(Long customer_id, Long vehicle_id);

    void setEngineVehicle(Long engine_id, Long vehicle_id);

    void setProductVehicle(Long product_id, Long vehicle_id);

    Optional<VehicleDTO> findById(Long id);
    void updateVehicle(VehicleDTO vehicleDTO );
    void deleteVehicle(Long id);
}
