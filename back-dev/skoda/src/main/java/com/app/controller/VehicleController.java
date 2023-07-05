package com.app.controller;
import com.app.dto.VehicleDTO;
import com.app.service.IVehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;


@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/vehicle")
public class VehicleController {

    @Autowired
    IVehicleService vehicleService;

    @PostMapping("/save")
    public void save(@RequestBody VehicleDTO vehicleDTO){
        if(vehicleDTO != null){
            vehicleService.saveVehicle(vehicleDTO);
        }else{

        }
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<VehicleDTO>> findAll(){
        Set<VehicleDTO> vehicles_set = vehicleService.findAllVehicles();
        return new ResponseEntity<>(vehicles_set, HttpStatus.OK);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<VehicleDTO> findById(@PathVariable("id") Long id){
        VehicleDTO vehicleDTO = null;
        if(id != null){
            vehicleDTO = vehicleService.findById(id).orElse(null);
        }else{
        }
        return new ResponseEntity<>(vehicleDTO,HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity update(@RequestBody VehicleDTO vehicleDTO){
        if(vehicleDTO != null){
            vehicleService.updateVehicle(vehicleDTO);
        }else {

        }

        return ResponseEntity.ok("200");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id){
        if(id != null){
            vehicleService.deleteVehicle(id);
        }else {

        }
        return ResponseEntity.ok("200");
    }

}
