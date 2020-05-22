package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Carro;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Carro entity.
 */
@Repository
public interface CarroRepository extends JpaRepository<Carro, Long> {

    @Query(value = "select distinct carro from Carro carro left join fetch carro.enderecos",
        countQuery = "select count(distinct carro) from Carro carro")
    Page<Carro> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct carro from Carro carro left join fetch carro.enderecos")
    List<Carro> findAllWithEagerRelationships();

    @Query("select carro from Carro carro left join fetch carro.enderecos where carro.id =:id")
    Optional<Carro> findOneWithEagerRelationships(@Param("id") Long id);
}
