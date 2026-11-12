/* Projeto Integrador do Senac Gastronomia em comentário com o que deve alterar/acrescentar*/
create type public.tipo_usuario as enum (
  'Candidato', /* Apoio */
  'Recrutador', /* Auxiliar */
  'Administrador',  /* Docente */
  'Empresa'
);

create table public.usuario (
  id_usuario uuid primary key,
  references auth.users(id)
  on delete cascade,
  perfil_usuario public.tipo_usuario not null,
  data_registro timestampz default now(),
  ativo boolean default true,
  /*num_registro int not null*/
);

create table public.empresa (
  id_empresa int generated always identity primary key,
  id_usuario uuid references public.usuario(id_usuario)
  on delete cascade,
  razao_social varchar(255) not null,
  tipo_empresa varchar(100) not null,
  porte_empresa enum('MEI','ME','EPP', 'Médio Porte', 'Grande Porte') not null
);