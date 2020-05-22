package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Endereco.
 */
@Entity
@Table(name = "endereco")
public class Endereco implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "pais")
    private String pais;

    @Column(name = "estado")
    private Instant estado;

    @Column(name = "bairro")
    private Long bairro;

    @Column(name = "rua")
    private Long rua;

    @OneToOne(mappedBy = "endereco")
    @JsonIgnore
    private Pessoa pessoa;

    @ManyToMany(mappedBy = "enderecos")
    @JsonIgnore
    private Set<Carro> carros = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPais() {
        return pais;
    }

    public Endereco pais(String pais) {
        this.pais = pais;
        return this;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public Instant getEstado() {
        return estado;
    }

    public Endereco estado(Instant estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(Instant estado) {
        this.estado = estado;
    }

    public Long getBairro() {
        return bairro;
    }

    public Endereco bairro(Long bairro) {
        this.bairro = bairro;
        return this;
    }

    public void setBairro(Long bairro) {
        this.bairro = bairro;
    }

    public Long getRua() {
        return rua;
    }

    public Endereco rua(Long rua) {
        this.rua = rua;
        return this;
    }

    public void setRua(Long rua) {
        this.rua = rua;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public Endereco pessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
        return this;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public Set<Carro> getCarros() {
        return carros;
    }

    public Endereco carros(Set<Carro> carros) {
        this.carros = carros;
        return this;
    }

    public Endereco addCarro(Carro carro) {
        this.carros.add(carro);
        carro.getEnderecos().add(this);
        return this;
    }

    public Endereco removeCarro(Carro carro) {
        this.carros.remove(carro);
        carro.getEnderecos().remove(this);
        return this;
    }

    public void setCarros(Set<Carro> carros) {
        this.carros = carros;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Endereco)) {
            return false;
        }
        return id != null && id.equals(((Endereco) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Endereco{" +
            "id=" + getId() +
            ", pais='" + getPais() + "'" +
            ", estado='" + getEstado() + "'" +
            ", bairro=" + getBairro() +
            ", rua=" + getRua() +
            "}";
    }
}
