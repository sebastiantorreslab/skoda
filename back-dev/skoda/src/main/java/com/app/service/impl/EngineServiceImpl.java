package com.app.service.impl;

import com.app.dto.EngineDTO;
import com.app.model.Engine;
import com.app.repository.EngineRepository;
import com.app.service.IEngineService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


@Service
public class EngineServiceImpl implements IEngineService {


    private final ModelMapper mapper = new ModelMapper();

    @Autowired
    private EngineRepository engineRepository;

    @Override
    public Set<EngineDTO> findAllEngines() {
        List<Engine> engines_list = engineRepository.findAll();
        Set<EngineDTO> engines_set = new HashSet<>();

        for(Engine engine : engines_list){
            EngineDTO engineDTO = mapper.map(engine,EngineDTO.class);
            engines_set.add(engineDTO);
        }
        return engines_set;
    }

    @Override
    public void saveEngine(EngineDTO engineDTO) {
        if(engineDTO != null){
            Engine engine = mapper.map(engineDTO,Engine.class);
            engineRepository.save(engine);
        }else{
            //todo: manejo global de excepciones
        }
    }

    @Override
    public Optional<EngineDTO> findById(Long id) {
        EngineDTO engineDTO = null;
        Optional<Engine> engine = engineRepository.findById(id);
        if(engine != null ){
            engineDTO = mapper.map(engine,EngineDTO.class);

        }else{
            //todo: manejo global de excepciones
        }
        return Optional.ofNullable(engineDTO);
    }

    @Override
    public void updateEngine(EngineDTO engineDTO) {
        Engine engine = engineRepository.findById(engineDTO.getId()).orElse(null);
        if(engine != null){
            engine = mapper.map(engineDTO,Engine.class);
            engineRepository.save(engine);
        }else {
            //todo: manejo global de excepciones
        }
    }

    @Override
    public void deleteEngine(Long id) {
        Engine engine = engineRepository.findById(id).orElse(null);
        if(engine != null){
            engineRepository.deleteById(engine.getId());
        }else {
            //todo: manejo global de excepciones
        }
    }
}
