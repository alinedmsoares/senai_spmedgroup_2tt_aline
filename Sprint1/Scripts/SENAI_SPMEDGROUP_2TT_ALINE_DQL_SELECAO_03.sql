USE SENAI_SPMEDGROUP_2TT_ALINE
--Mostrar a quantidade de usu�rios ap�s realizar a importa��o do banco de dados
SELECT COUNT(*) AS QUANTIDADE_TOTAL_USUARIOS FROM USUARIO

--Converter a data de nascimento do usu�rio para o formato (mm-dd-yyyy)
SELECT  CONVERT(VARCHAR(10), DATA_DE_NASCIMENTO, 103)AS DATA_DE_NASCIMENTO  FROM PRONTUARIO 

--Deletar os dados que n�o possuem data de consulta conforme especificado pelo cliente
DELETE FROM CONSULTA WHERE DATA_CONSULTA = NULL

--Calcular a idade do usu�rio a partir da data de nascimento
SELECT FLOOR(DATEDIFF(DAY, DATA_DE_NASCIMENTO, GETDATE()) /365.25) AS IDADE FROM PRONTUARIO 

--vinculo da tabela de prontu�rio com a de consultas
SELECT P.*,C.*

FROM
	PRONTUARIO AS P INNER JOIN CONSULTA AS C
	
ON
	C.ID_PRONTUARIO = P.ID

--vinculo da tabela de prontu�rios com a de consultas e m�dicos
SELECT *

FROM PRONTUARIO AS P INNER JOIN CONSULTA AS C

ON (P.ID=C.ID_PRONTUARIO) INNER JOIN MEDICOS

ON (MEDICOS.ID=C.ID_MEDICO)

-- vinculo da tabela de m�dicos com a tabela de especialidades
SELECT M.*, E.NOME AS ESPECIALIDADE

FROM
	MEDICOS AS M INNER JOIN ESPECIALIDADES AS E
	
ON
	M.ID_ESPECIALIDADE = E.ID

--vinculo da tabela de m�dicos com a tabela de cl�nicas
SELECT *

FROM
	MEDICOS AS M INNER JOIN CLINICA AS C
	
ON
	M.ID_CLINICA = C.ID

--Cria��o de uma fun��o para retornar � quantidade de m�dicos de uma determinada especialidade
CREATE PROCEDURE spMOSTRAR_MEDICOS_ESPECIALIDADES
AS
SELECT COUNT(*) AS QUANTIDADE_TOTAL_DE_PEDIATRAS FROM 
	MEDICOS AS M INNER JOIN ESPECIALIDADES AS E
	
ON
	M.ID_ESPECIALIDADE = E.ID WHERE E.NOME = 'Pediatria' 

EXEC spMOSTRAR_MEDICOS_ESPECIALIDADES


--Cria��o de uma fun��o para que retorne a idade do usu�rio a partir de uma determinada stored procedure
CREATE PROCEDURE spMOSTRAR_IDADE_PACIENTE
AS
SELECT FLOOR(DATEDIFF(DAY, DATA_DE_NASCIMENTO, GETDATE()) /365.25) AS IDADE FROM PRONTUARIO 

EXEC spMOSTRAR_IDADE_PACIENTE

SELECT * FROM Consulta where id_medico = 3


