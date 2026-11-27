package br.edu.atitus.geopoint.services;

import br.edu.atitus.geopoint.dtos.PointRequest;
import br.edu.atitus.geopoint.entities.PointEntetity;
import br.edu.atitus.geopoint.repositories.PointRepositoy;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;


public class PointService {
    private final PointRepositoy repository;

    public PointService(PointRepositoy repository) {
        this.repository = repository;
    }

    public PointEntetity insert(PointRequest pointRequest) {
        if (pointRequest == null)
            throw new RuntimeException("Objeto Nulo");
        if (pointRequest.name() == null || pointRequest.name().isBlank())
            throw new RuntimeException("Nome inválido");
        if (pointRequest.latitude() == null
                || pointRequest.latitude().compareTo(BigDecimal.valueOf(-90)) < 0
                || pointRequest.latitude().compareTo(BigDecimal.valueOf(90)) > 0)
            throw new RuntimeException("Latitude inválida - Intervalo aceito: -90 a 90");
        //TODO fazer o restante das validações

        //TODO formatar campos necessários (trim())

        PointEntetity point = new PointEntetity();

        point.setId(UUID.randomUUID());
        point.setName(pointRequest.name().trim());
        point.setDescription(pointRequest.description().trim());
        point.setLatitude(pointRequest.latitude());
        point.setLongitude(pointRequest.longitude());

        return repository.insert(point);
    }

    public List<PointEntetity> findAll() {

        return repository.findAll();
    }

    public PointEntetity findById(UUID id) {
        PointEntetity point = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Ponto não localizado com o ID: " + id));

        return point;
    }

    public PointEntetity update(UUID id, PointRequest pointRequest) {

        PointEntetity point = findById(id);

        if (pointRequest == null)
            throw new RuntimeException("Objeto Nulo");

        if (pointRequest.name() == null || pointRequest.name().isBlank())
            throw new RuntimeException("Nome inválido");

        if (pointRequest.latitude() == null
                || pointRequest.latitude().compareTo(BigDecimal.valueOf(-90)) < 0
                || pointRequest.latitude().compareTo(BigDecimal.valueOf(90)) > 0)
            throw new RuntimeException("Latitude inválida - Intervalo aceito: -90 a 90");

        point.setName(pointRequest.name().trim());
        point.setDescription(pointRequest.description() == null ? null : pointRequest.description().trim());
        point.setLatitude(pointRequest.latitude());
        point.setLongitude(pointRequest.longitude());

        return repository.update(point);
    }

    public void delete(UUID id) {

        PointEntetity point = findById(id);

        repository.delete(point.getId());
    }

}