package com.app.controller;

import com.app.service.IVehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/relate")
public class RelationsController {

    @Autowired
    IVehicleService  vehicleService;

    @PostMapping("/customerVehicle/{customer_id}/{vehicle_id}")
    public ResponseEntity setCustomerVehicle(@PathVariable("customer_id") Long customer_id,@PathVariable("vehicle_id") Long vehicle_id){
        vehicleService.setCustomerVehicle(customer_id,vehicle_id);
        return ResponseEntity.ok("201");
    }

    @PostMapping("/engineVehicle/{engine_id}/{vehicle_id}")
    public ResponseEntity setEngineVehicle(@PathVariable("engine_id") Long engine_id,@PathVariable("vehicle_id") Long vehicle_id){
        vehicleService.setEngineVehicle(engine_id,vehicle_id);
        return ResponseEntity.ok("201");
    }

    @PostMapping("productVehicle/{product_id}/{vehicle_id}")
    public ResponseEntity setProductVehicle(@PathVariable("product_id") Long product_id, @PathVariable("vehicle_id") Long vehicle_id){
        vehicleService.setProductVehicle(product_id,vehicle_id);
        return ResponseEntity.ok("201");
    }


}
