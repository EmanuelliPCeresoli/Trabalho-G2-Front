package br.edu.atitus.geopoint.controllers;

import br.edu.atitus.geopoint.dtos.PointRequest;
import br.edu.atitus.geopoint.entities.PointEntetity;
import br.edu.atitus.geopoint.services.PointService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/points")
@CrossOrigin(origins = "*")
public class PointController {
    private final PointService service;

    public PointController(PointService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<PointEntetity> insertPoint(
            @RequestBody PointRequest PointRequest) {
        PointEntetity point = service.insert(PointRequest);
        return ResponseEntity.status(201).body(point);
    }

    @GetMapping
    public ResponseEntity<List<PointEntetity>> findAll() {
        List<PointEntetity> response = service.findAll();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PointEntetity> findById(@PathVariable UUID id) {

        PointEntetity response = service.findById(id);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PointEntetity> updatePoint(
            @PathVariable UUID id,
            @RequestBody PointRequest pointRequest) {

        PointEntetity point = service.update(id, pointRequest);

        return ResponseEntity.ok(point);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoint(@PathVariable UUID id) {

        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}
