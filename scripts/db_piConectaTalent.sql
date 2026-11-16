/* Projeto Integrador Conecta Talent */
create type public.tipo_usuario as enum (
  'Candidato', 
  'Recrutador', 
  'Administrador',  
  'Empresa'
);

create table if not exists public.usuario (
  id_usuario uuid primary key
  references auth.users(id)
  on delete cascade,
  perfil_usuario public.tipo_usuario not null,
  data_registro timestamptz default now(),
  ativo boolean default true
);

create type public.porte_empresa as enum (
  'MEI', 
  'ME', 
  'EPP',
  'Médio Porte',
  'Grande Porte'
);

create table if not exists public.empresa (
  id_empresa int generated always as identity primary key,
  id_usuario uuid references public.usuario(id_usuario)
  on delete cascade,
  razao_social varchar(255) not null,
  tipo_empresa varchar(100) not null,
  porte public.porte_empresa not null
);

create table if not exists public.recrutador (
  id_recrutador int generated always as identity primary key,
  /*nome varchar(150) not null,*/ /*será reutilizado o displa_name presente em user_metadata*/
  cargo varchar(100) not null,
  id_usuario uuid not null unique references
  public.usuario(id_usuario),
  id_empresa int not null references public.empresa(id_empresa)
);