package br.edu.atitus.geopoint.repositories;

import br.edu.atitus.geopoint.entities.PointEntetity;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.util.Optional;
import java.util.UUID;
import java.util.List;

public class PointRepositoy {
    //Declarando uma dependência via classe
    private final JdbcTemplate jdbcTemplate;

    private final RowMapper<PointEntetity> rowMapper = (rs, rowNum) -> {
        PointEntetity point = new PointEntetity();

        point.setId(rs.getObject("id", UUID.class));
        point.setName(rs.getString("name"));
        point.setDescription(rs.getString("description"));
        point.setLatitude(rs.getBigDecimal("latitude"));
        point.setLongitude(rs.getBigDecimal("longitude"));

        return point;
    };

        //Injeção de dependência via Construtor
    public PointRepositoy(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
        public PointEntetity insert(PointEntetity point) {

            String sql = """
        INSERT INTO points (
            id, name, description, latitude, longitude
        )
        VALUES (?, ?, ?, ?, ?)
        """;

            jdbcTemplate.update(
                    sql,
                    point.getId(),
                    point.getName(),
                    point.getDescription(),
                    point.getLatitude(),
                    point.getLongitude()
            );

            return point;
        }

    public List<PointEntetity> findAll() {

        String sql = """
        SELECT id, name, description, latitude, longitude
        FROM points
        ORDER BY name
        """;

        return jdbcTemplate.query(sql, rowMapper);
    }

    public Optional<PointEntetity> findById(UUID id) {

        String sql = """
        SELECT id, name, description, latitude, longitude
        FROM points
        WHERE id = ?
        """;

        try {
            PointEntetity point = jdbcTemplate.queryForObject(sql, rowMapper, id);
            return Optional.ofNullable(point);

        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    public PointEntetity update(PointEntetity point) {

        String sql = """
        UPDATE points
        SET name = ?,
            description = ?,
            latitude = ?,
            longitude = ?
        WHERE id = ?
        """;

        jdbcTemplate.update(
                sql,
                point.getName(),
                point.getDescription(),
                point.getLatitude(),
                point.getLongitude(),
                point.getId()
        );

        return point;
    }

    public void delete(UUID id) {

        String sql = """
        DELETE FROM points
        WHERE id = ?
        """;

        jdbcTemplate.update(sql, id);
    }

}
