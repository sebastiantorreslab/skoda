package com.app.service;

import com.app.dto.EngineDTO;

import java.util.Optional;
import java.util.Set;

public interface IEngineService {

    Set<EngineDTO> findAllEngines();
    void saveEngine(EngineDTO engineDTO);
    Optional<EngineDTO> findById(Long id);
    void updateEngine(EngineDTO engineDTO );
    void deleteEngine(Long id);
}
