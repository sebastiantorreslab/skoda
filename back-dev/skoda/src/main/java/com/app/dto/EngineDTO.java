package com.app.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EngineDTO implements Serializable {

    private Long id;
    private String engineNumber;
    private String engineCategory;

    public EngineDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEngineNumber() {
        return engineNumber;
    }

    public void setEngineNumber(String engineNumber) {
        this.engineNumber = engineNumber;
    }

    public String getEngineCategory() {
        return engineCategory;
    }

    public void setEngineCategory(String engineCategory) {
        this.engineCategory = engineCategory;
    }
}
