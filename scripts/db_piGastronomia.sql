/* Projeto Integrador do Senac Gastronomia */
create type public.tipo_usuario as enum (
  'Apoio',
  'Auxiliar',
  'Docente'
);

create table if not exists public.usuario (
  id_usuario uuid primary key
  references auth.users(id)
  on delete cascade,
  perfil_usuario public.tipo_usuario not null,
  data_registro timestamptz default now(),
  ativo boolean default true
  num_registro int not null
);

create table if not exists public.curso (
  id_curso int generated always as identity primary key,
  titulo varchar(50) unique not null,
  cargaHoraria int not null,
  modalidade varchar(70) not null,
  formato varchar(50) not null
);

create type public.tipo_periodo as enum (
  'Manhã',
  'Tarde',
  'Noite',
  'Integral'
);

create table if not exists public.turma (
  id_turma int generated always as identity primary key,
  cod_oferta int unique not null,
  dataInicio date not null,
  periodo public.tipo_periodo not null,
  fk_curso int not null references public.curso(id_curso),
  ativo boolean default true
);
