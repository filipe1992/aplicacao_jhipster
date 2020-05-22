package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.AplicacaojhipsterApp;
import com.mycompany.myapp.domain.Carro;
import com.mycompany.myapp.repository.CarroRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link CarroResource} REST controller.
 */
@SpringBootTest(classes = AplicacaojhipsterApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class CarroResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_PLACA = "AAAAAAAAAA";
    private static final String UPDATED_PLACA = "BBBBBBBBBB";

    @Autowired
    private CarroRepository carroRepository;

    @Mock
    private CarroRepository carroRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCarroMockMvc;

    private Carro carro;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Carro createEntity(EntityManager em) {
        Carro carro = new Carro()
            .nome(DEFAULT_NOME)
            .placa(DEFAULT_PLACA);
        return carro;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Carro createUpdatedEntity(EntityManager em) {
        Carro carro = new Carro()
            .nome(UPDATED_NOME)
            .placa(UPDATED_PLACA);
        return carro;
    }

    @BeforeEach
    public void initTest() {
        carro = createEntity(em);
    }

    @Test
    @Transactional
    public void createCarro() throws Exception {
        int databaseSizeBeforeCreate = carroRepository.findAll().size();
        // Create the Carro
        restCarroMockMvc.perform(post("/api/carros")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carro)))
            .andExpect(status().isCreated());

        // Validate the Carro in the database
        List<Carro> carroList = carroRepository.findAll();
        assertThat(carroList).hasSize(databaseSizeBeforeCreate + 1);
        Carro testCarro = carroList.get(carroList.size() - 1);
        assertThat(testCarro.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testCarro.getPlaca()).isEqualTo(DEFAULT_PLACA);
    }

    @Test
    @Transactional
    public void createCarroWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = carroRepository.findAll().size();

        // Create the Carro with an existing ID
        carro.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCarroMockMvc.perform(post("/api/carros")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carro)))
            .andExpect(status().isBadRequest());

        // Validate the Carro in the database
        List<Carro> carroList = carroRepository.findAll();
        assertThat(carroList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCarros() throws Exception {
        // Initialize the database
        carroRepository.saveAndFlush(carro);

        // Get all the carroList
        restCarroMockMvc.perform(get("/api/carros?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(carro.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME)))
            .andExpect(jsonPath("$.[*].placa").value(hasItem(DEFAULT_PLACA)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllCarrosWithEagerRelationshipsIsEnabled() throws Exception {
        when(carroRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCarroMockMvc.perform(get("/api/carros?eagerload=true"))
            .andExpect(status().isOk());

        verify(carroRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllCarrosWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(carroRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCarroMockMvc.perform(get("/api/carros?eagerload=true"))
            .andExpect(status().isOk());

        verify(carroRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getCarro() throws Exception {
        // Initialize the database
        carroRepository.saveAndFlush(carro);

        // Get the carro
        restCarroMockMvc.perform(get("/api/carros/{id}", carro.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(carro.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME))
            .andExpect(jsonPath("$.placa").value(DEFAULT_PLACA));
    }
    @Test
    @Transactional
    public void getNonExistingCarro() throws Exception {
        // Get the carro
        restCarroMockMvc.perform(get("/api/carros/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCarro() throws Exception {
        // Initialize the database
        carroRepository.saveAndFlush(carro);

        int databaseSizeBeforeUpdate = carroRepository.findAll().size();

        // Update the carro
        Carro updatedCarro = carroRepository.findById(carro.getId()).get();
        // Disconnect from session so that the updates on updatedCarro are not directly saved in db
        em.detach(updatedCarro);
        updatedCarro
            .nome(UPDATED_NOME)
            .placa(UPDATED_PLACA);

        restCarroMockMvc.perform(put("/api/carros")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedCarro)))
            .andExpect(status().isOk());

        // Validate the Carro in the database
        List<Carro> carroList = carroRepository.findAll();
        assertThat(carroList).hasSize(databaseSizeBeforeUpdate);
        Carro testCarro = carroList.get(carroList.size() - 1);
        assertThat(testCarro.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testCarro.getPlaca()).isEqualTo(UPDATED_PLACA);
    }

    @Test
    @Transactional
    public void updateNonExistingCarro() throws Exception {
        int databaseSizeBeforeUpdate = carroRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCarroMockMvc.perform(put("/api/carros")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(carro)))
            .andExpect(status().isBadRequest());

        // Validate the Carro in the database
        List<Carro> carroList = carroRepository.findAll();
        assertThat(carroList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCarro() throws Exception {
        // Initialize the database
        carroRepository.saveAndFlush(carro);

        int databaseSizeBeforeDelete = carroRepository.findAll().size();

        // Delete the carro
        restCarroMockMvc.perform(delete("/api/carros/{id}", carro.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Carro> carroList = carroRepository.findAll();
        assertThat(carroList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
