/* Projeto Integrador Conecta Talent - PostgreSQL / Supabase */

create type conecta_talent.tipo_usuario as enum (
  'Candidato',
  'Recrutador',
  'Administrador',
  'Empresa'
);

create table if not exists conecta_talent.usuario (
  id_usuario uuid primary key
    references auth.users(id)
    on delete cascade,
  perfil_usuario conecta_talent.tipo_usuario not null,
  data_registro timestamptz default now(),
  ativo boolean default true
);

create type conecta_talent.porte_empresa as enum (
  'MEI',
  'ME',
  'EPP',
  'Médio Porte',
  'Grande Porte'
);

create table if not exists conecta_talent.empresa (
  id_empresa int generated always as identity primary key,
  id_usuario uuid not null
    references conecta_talent.usuario(id_usuario)
    on delete cascade,
  razao_social varchar(255) not null,
  tipo_empresa varchar(100) not null,
  porte conecta_talent.porte_empresa not null
);

create table if not exists conecta_talent.recrutador (
  id_recrutador int generated always as identity primary key,
  /* nome será reutilizado de display_name em auth.users.user_metadata */
  cargo varchar(100) not null,
  id_usuario uuid not null unique
    references conecta_talent.usuario(id_usuario)
    on delete cascade,
  id_empresa int not null
    references conecta_talent.empresa(id_empresa)
);

/* Criar uma nova tipagem (tipo_estabelecimento) identificada como enum com os valores pré-definidos */
create type conecta_talent.tipo_estabelecimento as enum (
  'Matriz',
  'Filial'
);
                           /* Para vocês é public.unidade */ 
create table if not exists conecta_talent.unidade (
  id_unidade int generated always as identity primary key,
  nome_fantasia varchar(150) not null,
  cnpj varchar(18) not null unique,
  tipo_unidade conecta_talent.tipo_estabelecimento not null, 
  id_empresa int not null
    references conecta_talent.empresa(id_empresa)
);
                          /* Para vocês public.vaga */ 
create table if not exists conecta_talent.vaga (
  id_vaga int generated always as identity primary key,
  titulo_vaga varchar(150) not null,
  descricao text,
  tipo_contrato varchar(50) not null,
  modalidade varchar(30) not null,
  carga_horaria char(2) not null,
  requisito text,
  data_abertura date not null,
  data_encerramento date not null,
  quantidade_vagas int not null,
  renumeracao decimal (10,2),
  status_vaga varchar(20),
  data_atualizacao timestamptz default now(),
  data_registro timestamptz default now(),
  id_recrutador int not null
    references conecta_talent.recrutador(id_recrutador),
  id_unidade int not null
    references conecta_talent.unidade(id_unidade)
);