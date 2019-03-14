USE SENAI_SPMEDGROUP_2TT_ALINE
--Mostrar a quantidade de usuários após realizar a importação do banco de dados
SELECT COUNT(*) AS QUANTIDADE_TOTAL_USUARIOS FROM USUARIO

--Converter a data de nascimento do usuário para o formato (mm-dd-yyyy)
SELECT  CONVERT(VARCHAR(10), DATA_DE_NASCIMENTO, 103)AS DATA_DE_NASCIMENTO  FROM PRONTUARIO 

--Deletar os dados que não possuem data de consulta conforme especificado pelo cliente
DELETE FROM CONSULTA WHERE DATA_CONSULTA = NULL

--Calcular a idade do usuário a partir da data de nascimento
SELECT FLOOR(DATEDIFF(DAY, DATA_DE_NASCIMENTO, GETDATE()) /365.25) AS IDADE FROM PRONTUARIO 

--vinculo da tabela de prontuário com a de consultas
SELECT P.*,C.*

FROM
	PRONTUARIO AS P INNER JOIN CONSULTA AS C
	
ON
	C.ID_PRONTUARIO = P.ID

--vinculo da tabela de prontuários com a de consultas e médicos
SELECT *

FROM PRONTUARIO AS P INNER JOIN CONSULTA AS C

ON (P.ID=C.ID_PRONTUARIO) INNER JOIN MEDICOS

ON (MEDICOS.ID=C.ID_MEDICO)

-- vinculo da tabela de médicos com a tabela de especialidades
SELECT M.*, E.NOME AS ESPECIALIDADE

FROM
	MEDICOS AS M INNER JOIN ESPECIALIDADES AS E
	
ON
	M.ID_ESPECIALIDADE = E.ID

--vinculo da tabela de médicos com a tabela de clínicas
SELECT *

FROM
	MEDICOS AS M INNER JOIN CLINICA AS C
	
ON
	M.ID_CLINICA = C.ID

--Criação de uma função para retornar à quantidade de médicos de uma determinada especialidade
CREATE PROCEDURE spMOSTRAR_MEDICOS_ESPECIALIDADES
AS
SELECT COUNT(*) AS QUANTIDADE_TOTAL_DE_PEDIATRAS FROM 
	MEDICOS AS M INNER JOIN ESPECIALIDADES AS E
	
ON
	M.ID_ESPECIALIDADE = E.ID WHERE E.NOME = 'Pediatria' 

EXEC spMOSTRAR_MEDICOS_ESPECIALIDADES


--Criação de uma função para que retorne a idade do usuário a partir de uma determinada stored procedure
CREATE PROCEDURE spMOSTRAR_IDADE_PACIENTE
AS
SELECT FLOOR(DATEDIFF(DAY, DATA_DE_NASCIMENTO, GETDATE()) /365.25) AS IDADE FROM PRONTUARIO 

EXEC spMOSTRAR_IDADE_PACIENTE

SELECT * FROM Consulta where id_medico = 3


