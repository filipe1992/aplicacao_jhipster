package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Carro.
 */
@Entity
@Table(name = "carro")
public class Carro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "placa")
    private String placa;

    @ManyToMany
    @JoinTable(name = "carro_endereco",
               joinColumns = @JoinColumn(name = "carro_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "endereco_id", referencedColumnName = "id"))
    private Set<Endereco> enderecos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "carros", allowSetters = true)
    private Pessoa pessoa;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Carro nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getPlaca() {
        return placa;
    }

    public Carro placa(String placa) {
        this.placa = placa;
        return this;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public Set<Endereco> getEnderecos() {
        return enderecos;
    }

    public Carro enderecos(Set<Endereco> enderecos) {
        this.enderecos = enderecos;
        return this;
    }

    public Carro addEndereco(Endereco endereco) {
        this.enderecos.add(endereco);
        endereco.getCarros().add(this);
        return this;
    }

    public Carro removeEndereco(Endereco endereco) {
        this.enderecos.remove(endereco);
        endereco.getCarros().remove(this);
        return this;
    }

    public void setEnderecos(Set<Endereco> enderecos) {
        this.enderecos = enderecos;
    }

    public Pessoa getPessoa() {
        return pessoa;
    }

    public Carro pessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
        return this;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Carro)) {
            return false;
        }
        return id != null && id.equals(((Carro) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Carro{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", placa='" + getPlaca() + "'" +
            "}";
    }
}
