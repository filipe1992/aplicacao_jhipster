package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Carro;
import com.mycompany.myapp.repository.CarroRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Carro}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class CarroResource {

    private final Logger log = LoggerFactory.getLogger(CarroResource.class);

    private static final String ENTITY_NAME = "carro";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CarroRepository carroRepository;

    public CarroResource(CarroRepository carroRepository) {
        this.carroRepository = carroRepository;
    }

    /**
     * {@code POST  /carros} : Create a new carro.
     *
     * @param carro the carro to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new carro, or with status {@code 400 (Bad Request)} if the carro has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/carros")
    public ResponseEntity<Carro> createCarro(@RequestBody Carro carro) throws URISyntaxException {
        log.debug("REST request to save Carro : {}", carro);
        if (carro.getId() != null) {
            throw new BadRequestAlertException("A new carro cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Carro result = carroRepository.save(carro);
        return ResponseEntity.created(new URI("/api/carros/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /carros} : Updates an existing carro.
     *
     * @param carro the carro to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated carro,
     * or with status {@code 400 (Bad Request)} if the carro is not valid,
     * or with status {@code 500 (Internal Server Error)} if the carro couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/carros")
    public ResponseEntity<Carro> updateCarro(@RequestBody Carro carro) throws URISyntaxException {
        log.debug("REST request to update Carro : {}", carro);
        if (carro.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Carro result = carroRepository.save(carro);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, carro.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /carros} : get all the carros.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of carros in body.
     */
    @GetMapping("/carros")
    public List<Carro> getAllCarros(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Carros");
        return carroRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /carros/:id} : get the "id" carro.
     *
     * @param id the id of the carro to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the carro, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/carros/{id}")
    public ResponseEntity<Carro> getCarro(@PathVariable Long id) {
        log.debug("REST request to get Carro : {}", id);
        Optional<Carro> carro = carroRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(carro);
    }

    /**
     * {@code DELETE  /carros/:id} : delete the "id" carro.
     *
     * @param id the id of the carro to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/carros/{id}")
    public ResponseEntity<Void> deleteCarro(@PathVariable Long id) {
        log.debug("REST request to delete Carro : {}", id);

        carroRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
