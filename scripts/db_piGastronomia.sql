/* Projeto Integrador do Senac Gastronomia - PostgreSQL / Supabase */

create type senac_gastronomia.tipo_usuario as enum (
  'Apoio',
  'Auxiliar',
  'Docente'
);

/*
No Gastronomia não existem tabelas apoio, auxiliar ou docente nesta etapa.
O perfil do usuário é identificado diretamente por perfil_usuario.
*/
create table if not exists senac_gastronomia.usuario (
  id_usuario uuid primary key
    references auth.users(id)
    on delete cascade,
  perfil_usuario senac_gastronomia.tipo_usuario not null,
  data_registro timestamptz default now(),
  ativo boolean default true,
  num_registro int not null
);

/*
Curso e Turma recebem id_usuario para registrar qual usuário de Apoio
realizou o cadastro.
*/
create table if not exists senac_gastronomia.curso (
  id_curso int generated always as identity primary key,
  id_usuario uuid not null
    references senac_gastronomia.usuario(id_usuario),
  titulo varchar(50) unique not null,
  "cargaHoraria" int not null,
  modalidade varchar(70) not null,
  formato varchar(50) not null
);

create type senac_gastronomia.tipo_periodo as enum (
  'Manhã',
  'Tarde',
  'Noite',
  'Integral'
);

create table if not exists senac_gastronomia.turma (
  id_turma int generated always as identity primary key,
  id_usuario uuid not null
    references senac_gastronomia.usuario(id_usuario),
  cod_oferta int unique not null,
  "dataInicio" date not null,
  periodo senac_gastronomia.tipo_periodo not null,
  fk_curso int not null
    references senac_gastronomia.curso(id_curso),
  ativo boolean default true
);
create table if not exists senac_gastronomia.turma_docente (
  fk_turma int not null
    references senac_gastronomia.turma(id_turma),
  fk_docente uuid not null
    references senac_gastronomia.usuario(id_usuario)
);

                          /*Para vocês SEMPRE É public.turma_docente*/
create table if not exists senac_gastronomia.turma_docente (
  fk_turma int not null
    references senac_gastronomia.turma(id_turma),
  fk_docente uuid not null
    references senac_gastronomia.usuario(id_usuario)
);

create table if not exists senac_gastronomia.agenda (
  id_agenda int generated always as identity primary key,
  num_agenda char(1) check(num_agenda in ('0', '1', '2', '3', '4', '5', '6'))
);

create table if not exists senac_gastronomia.turma_agenda (
  fk_turma int not null
    references senac_gastronomia.turma(id_turma),
  fk_agenda int not null
    references senac_gastronomia.agenda(id_agenda)
);