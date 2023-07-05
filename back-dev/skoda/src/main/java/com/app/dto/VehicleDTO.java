package com.app.dto;


import com.app.model.Product;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@JsonIgnoreProperties(ignoreUnknown = true)
public class VehicleDTO implements Serializable {

    private Long id;
    private String brand;
    private String carLine;

    private int iniYear;

    private int finYear;

    private String displacement;
    private String fuelType;
    private String category;
    private String transmission;
    private Long customerId;

    private EngineDTO engineDTO;


    private Set<Product> productSet = new HashSet<>();


    public VehicleDTO() {
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getCarLine() {
        return carLine;
    }

    public void setCarLine(String carLine) {
        this.carLine = carLine;
    }


    public String getFuelType() {
        return fuelType;
    }

    public void setFuelType(String fuelType) {
        this.fuelType = fuelType;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTransmission() {
        return transmission;
    }

    public void setTransmission(String transmission) {
        this.transmission = transmission;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Set<Product> getProductSet() {
        return productSet;
    }

    public void setProductSet(Set<Product> productSet) {
        this.productSet = productSet;
    }

    public EngineDTO getEngineDTO() {
        return engineDTO;
    }

    public void setEngineDTO(EngineDTO engineDTO) {
        this.engineDTO = engineDTO;
    }

    public int getIniYear() {
        return iniYear;
    }

    public void setIniYear(int iniYear) {
        this.iniYear = iniYear;
    }

    public int getFinYear() {
        return finYear;
    }

    public void setFinYear(int finYear) {
        this.finYear = finYear;
    }

    public String getDisplacement() {
        return displacement;
    }

    public void setDisplacement(String displacement) {
        this.displacement = displacement;
    }
}
