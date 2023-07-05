package com.app.controller;

import com.app.dto.EngineDTO;
import com.app.service.IEngineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin("http://localhost:5173/")
@RequestMapping("/engine")
public class EngineController {

    @Autowired
    private IEngineService engineService;


    @PostMapping("/save")
    public ResponseEntity save(@RequestBody EngineDTO engineDTO){
        if(engineDTO != null){
            engineService.saveEngine(engineDTO);
        }else{

        }
        return ResponseEntity.ok("200");
    }

    @GetMapping("/findAll")
    public ResponseEntity<Set<EngineDTO>> findAll(){
        Set<EngineDTO> engines_set = engineService.findAllEngines();
        return new ResponseEntity<>(engines_set, HttpStatus.OK);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<EngineDTO> findById(@PathVariable("id") Long id){
        EngineDTO engineDTO = engineService.findById(id).orElse(null);
        return new ResponseEntity<>(engineDTO,HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity update(@RequestBody EngineDTO engineDTO){
        if(engineDTO != null ){
            engineService.updateEngine(engineDTO);
        }else {

        }
        return ResponseEntity.ok("200");
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity delete(@PathVariable("id") Long id){
        if(id != null){
            engineService.deleteEngine(id);
        }
        return  ResponseEntity.ok("200");
    }



}
