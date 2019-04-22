USE SENAI_SPMEDGROUP_2TT_ALINE

--Inserção dos dados na tabela de usuários de acordo com as colunas criadas no item 9 e especificadas na situação problema
INSERT INTO CLINICA (NOME_FANTASIA,CNPJ,RAZAO_SOCIAL,ENDERECO,HORARIO_FUNCIONAMENTO)
VALUES ('Clinica Possarle','86400902000130','SP Medical Group','Av. Barão Limeira, 532, São Paulo, SP','07:00 - 19:00')

INSERT INTO TIPO_DE_USUARIO(TIPO_DE_USUARIO)
VALUES ('Administrador'),('Médico'),('Paciente')

INSERT INTO USUARIO(EMAIL,SENHA,ID_TIPO_DE_USUARIO)
VALUES ('ricardo.lemos@spmedicalgroup.com.br','123456',2),
	('roberto.possarle@spmedicalgroup.com.br','123456',2),
	('helena.souza@spmedicalgroup.com.br','123456',2)

INSERT INTO USUARIO(EMAIL,SENHA,ID_TIPO_DE_USUARIO)
VALUES('admin@admin.com','admin',1)

INSERT INTO USUARIO(EMAIL,SENHA,ID_TIPO_DE_USUARIO)
VALUES('ligia@gmail.com','123456',3),
	('alexandre@gmail.com','123456',3),
	('fernando@gmail.com','123456',3),
	('henrique@gmail.com','123456',3),
	('joao@gmail.com','123456',3),
	('bruno@gmail.com','123456',3),
	('mariana@gmail.com','123456',3)

INSERT INTO MEDICOS(CRM,NOME,ID_ESPECIALIDADE,ID_CLINICA,ID_USUARIO)
VALUES('54353','Ricardo Lemos',2,1,1),
		('53452','Roberto Possarle',17,1,2),
		('65463','Helena Strada',16,1,3)

INSERT INTO PRONTUARIO(NOME,DATA_DE_NASCIMENTO,TELEFONE,RG,CPF,ENDERECO,ID_USUARIO)
VALUES('Ligia','13/10/1983','11 3456-7654','435225435','94839859000','Rua Estado de Israel 240, São Paulo, Estado de São Paulo, 04022-000',4),
		('Alexandre','23/07/2001','11 98765-6543','326543457','73556944057','Av. Paulista, 1578 - Bela Vista, São Paulo - SP, 01310-200',5),
		('Fernando','10/10/1978','11 97208-4453','546365253','16839338002','Av. Ibirapuera - Indianópolis, 2927,  São Paulo - SP, 04029-200',6),
		('Henrique','13/10/1985','11 3456-6543','54366362-5','14332654765','R. Vitória, 120 - Vila Sao Jorge, Barueri - SP, 06402-030',7),
		('João','27/08/1975','11 7656-6377','325444441','91305348010','R. Ver. Geraldo de Camargo, 66 - Santa Luzia, Ribeirão Pires - SP, 09405-380',8),
		('Bruno','21/03/1972','11 95436-8769','545662667','79799299004','Alameda dos Arapanés, 945 - Indianópolis, São Paulo - SP, 04524-001',9),
		('Mariana','05/03/2018','11 98438-6754','545662668','13771913039','R Sao Antonio, 232 - Vila Universal, Barueri - SP, 06407-140',10)

INSERT INTO SITUACAO(SITUACAO)
VALUES('Realizada'),('Cancelada'),('Agendada')

INSERT INTO CONSULTA(ID_PRONTUARIO,ID_MEDICO,DATA_CONSULTA,ID_SITUACAO)
VALUES('7','3','20/01/2019 15:00',1)

INSERT INTO CONSULTA(ID_PRONTUARIO,ID_MEDICO,DATA_CONSULTA,ID_SITUACAO)
VALUES('2','2','06/01/2018 10:00',2),
		('3','2','07/02/2019 11:00',1),
		('2','2','06/02/2018 10:00',1),
		('4','1','07/02/2019 11:00',2),
		('7','3','08/02/2019 15:00',3),
		('4','1','09/02/2019 11:00',3);


